"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { categoryApi } from "../api/category.api";
import { categoryKeys } from "../queryKeys";
import type {
  Category,
  CategoryContent,
  CategoryId,
  CategoryList,
} from "../schemas/category.schema";
import type { ApiError } from "@/lib/api/errors";

type QueryOpts<TData> = Omit<
  UseQueryOptions<TData, ApiError, TData>,
  "queryKey" | "queryFn"
>;

export function useCategories(options?: QueryOpts<CategoryList>) {
  return useQuery<CategoryList, ApiError>({
    queryKey: categoryKeys.lists(),
    queryFn: ({ signal }) => categoryApi.list({ signal }),
    ...options,
  });
}

export function useCategory(id: CategoryId, options?: QueryOpts<Category>) {
  return useQuery<Category, ApiError>({
    queryKey: categoryKeys.detail(id),
    queryFn: ({ signal }) => categoryApi.byId(id, { signal }),
    ...options,
  });
}

export function useCategoryContent(
  id: CategoryId,
  options?: QueryOpts<CategoryContent>,
) {
  return useQuery<CategoryContent, ApiError>({
    queryKey: categoryKeys.content(id),
    queryFn: ({ signal }) => categoryApi.content(id, { signal }),
    ...options,
  });
}
