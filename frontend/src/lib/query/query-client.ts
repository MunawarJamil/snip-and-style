import { QueryClient, isServer } from "@tanstack/react-query";
import { isApiError } from "@/lib/api/errors";

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (isApiError(error)) {
            if (
              error.code === "UNAUTHORIZED" ||
              error.code === "FORBIDDEN" ||
              error.code === "NOT_FOUND" ||
              error.code === "VALIDATION" ||
              error.code === "ABORTED"
            ) {
              return false;
            }
          }
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
