export type ApiErrorCode =
  | "NETWORK"
  | "TIMEOUT"
  | "ABORTED"
  | "PARSE"
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "SERVER"
  | "UNKNOWN";

export interface ApiErrorBody {
  message?: string;
  code?: string;
  details?: unknown;
}

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;
  readonly details?: unknown;
  readonly requestId?: string;

  constructor(opts: {
    message: string;
    code: ApiErrorCode;
    status?: number;
    details?: unknown;
    requestId?: string;
    cause?: unknown;
  }) {
    super(opts.message, { cause: opts.cause });
    this.name = "ApiError";
    this.code = opts.code;
    this.status = opts.status;
    this.details = opts.details;
    this.requestId = opts.requestId;
  }

  static fromStatus(
    status: number,
    body: ApiErrorBody | undefined,
    requestId?: string,
  ): ApiError {
    const code = mapStatusToCode(status);
    return new ApiError({
      message: body?.message ?? defaultMessageForCode(code),
      code,
      status,
      details: body?.details,
      requestId,
    });
  }
}

function mapStatusToCode(status: number): ApiErrorCode {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 409) return "CONFLICT";
  if (status === 429) return "RATE_LIMITED";
  if (status >= 500) return "SERVER";
  return "UNKNOWN";
}

function defaultMessageForCode(code: ApiErrorCode): string {
  switch (code) {
    case "UNAUTHORIZED":
      return "You need to sign in to continue.";
    case "FORBIDDEN":
      return "You don't have permission to do that.";
    case "NOT_FOUND":
      return "We couldn't find what you were looking for.";
    case "CONFLICT":
      return "That request conflicts with the current state.";
    case "RATE_LIMITED":
      return "Too many requests. Please slow down and try again.";
    case "SERVER":
      return "Something went wrong on our side. Please try again shortly.";
    case "TIMEOUT":
      return "The request took too long. Please try again.";
    case "NETWORK":
      return "We couldn't reach the server. Check your connection.";
    case "PARSE":
      return "We received an unexpected response from the server.";
    case "VALIDATION":
      return "The server response did not match the expected shape.";
    case "ABORTED":
      return "Request was cancelled.";
    default:
      return "An unexpected error occurred.";
  }
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError;
}
