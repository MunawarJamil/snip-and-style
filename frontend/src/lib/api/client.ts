import type { ZodType } from "zod";
import { publicEnv } from "./env";
import { ApiError, type ApiErrorBody } from "./errors";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type NextFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export interface ApiRequestOptions<TResponse> {
  method?: HttpMethod;
  path: string;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /** Per-request timeout in ms. Defaults to 10_000. Set to 0 to disable. */
  timeoutMs?: number;
  /** Auth token. The client never reads cookies/storage directly. */
  token?: string;
  /** Zod schema to validate the parsed response payload. */
  schema?: ZodType<TResponse>;
  /** Next.js fetch caching directives (Server Component / Route Handler use). */
  next?: NextFetchOptions;
  /** When true, send `cache: "no-store"`. Defaults to false. */
  noStore?: boolean;
}

const DEFAULT_TIMEOUT_MS = 10_000;

function buildUrl(path: string, query?: ApiRequestOptions<unknown>["query"]): string {
  const base = publicEnv.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${suffix}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function readBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status === 204) return undefined;
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (cause) {
      throw new ApiError({
        message: "Failed to parse JSON response.",
        code: "PARSE",
        status: response.status,
        cause,
      });
    }
  }
  return await response.text();
}

function linkAbort(
  external: AbortSignal | undefined,
  timeoutMs: number,
): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const onExternalAbort = () => controller.abort(external?.reason);
  if (external) {
    if (external.aborted) controller.abort(external.reason);
    else external.addEventListener("abort", onExternalAbort, { once: true });
  }
  const timer =
    timeoutMs > 0
      ? setTimeout(() => controller.abort(new DOMException("Timeout", "TimeoutError")), timeoutMs)
      : null;
  return {
    signal: controller.signal,
    cancel: () => {
      if (timer) clearTimeout(timer);
      external?.removeEventListener("abort", onExternalAbort);
    },
  };
}

export async function apiRequest<TResponse>(
  options: ApiRequestOptions<TResponse>,
): Promise<TResponse> {
  const {
    method = "GET",
    path,
    query,
    body,
    headers = {},
    signal: externalSignal,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    token,
    schema,
    next,
    noStore,
  } = options;

  const url = buildUrl(path, query);
  const { signal, cancel } = linkAbort(externalSignal, timeoutMs);

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };
  let payload: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    finalHeaders["Content-Type"] ??= "application/json";
    payload = typeof body === "string" ? body : JSON.stringify(body);
  }
  if (token) finalHeaders.Authorization = `Bearer ${token}`;

  const init: RequestInit & { next?: NextFetchOptions } = {
    method,
    headers: finalHeaders,
    body: payload,
    signal,
  };
  if (noStore) init.cache = "no-store";
  if (next) init.next = next;

  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (cause) {
    cancel();
    if (signal.aborted) {
      const isTimeout =
        signal.reason instanceof DOMException && signal.reason.name === "TimeoutError";
      throw new ApiError({
        message: isTimeout ? "Request timed out." : "Request was cancelled.",
        code: isTimeout ? "TIMEOUT" : "ABORTED",
        cause,
      });
    }
    throw new ApiError({
      message: "Network request failed.",
      code: "NETWORK",
      cause,
    });
  }

  const requestId = response.headers.get("x-request-id") ?? undefined;

  if (!response.ok) {
    const body = (await readBody(response).catch(() => undefined)) as
      | ApiErrorBody
      | string
      | undefined;
    cancel();
    const errorBody: ApiErrorBody | undefined =
      typeof body === "object" && body !== null ? body : undefined;
    throw ApiError.fromStatus(response.status, errorBody, requestId);
  }

  const parsed = await readBody(response);
  cancel();

  if (!schema) return parsed as TResponse;

  const result = schema.safeParse(parsed);
  if (!result.success) {
    throw new ApiError({
      message: "Server response did not match the expected shape.",
      code: "VALIDATION",
      details: result.error.issues,
      requestId,
    });
  }
  return result.data;
}
