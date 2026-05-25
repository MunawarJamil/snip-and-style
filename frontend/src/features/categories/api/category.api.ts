import { apiRequest } from "@/lib/api/client";
import {
  CategoryContentSchema,
  CategoryListSchema,
  CategorySchema,
  type Category,
  type CategoryContent,
  type CategoryId,
  type CategoryList,
} from "../schemas/category.schema";

const CATEGORY_TAG = "categories";

export interface CategoryFetchOptions {
  signal?: AbortSignal;
  /** Forwards Bearer token to the backend (used by admin views). */
  token?: string;
  /** Server Components: revalidate window in seconds. */
  revalidate?: number | false;
}

export const categoryApi = {
  list({ signal, token, revalidate = 3600 }: CategoryFetchOptions = {}): Promise<CategoryList> {
    return apiRequest({
      method: "GET",
      path: "/categories",
      schema: CategoryListSchema,
      signal,
      token,
      next: { revalidate, tags: [CATEGORY_TAG] },
    });
  },

  byId(
    id: CategoryId,
    { signal, token, revalidate = 3600 }: CategoryFetchOptions = {},
  ): Promise<Category> {
    return apiRequest({
      method: "GET",
      path: `/categories/${id}`,
      schema: CategorySchema,
      signal,
      token,
      next: { revalidate, tags: [CATEGORY_TAG, `${CATEGORY_TAG}:${id}`] },
    });
  },

  content(
    id: CategoryId,
    { signal, token, revalidate = 3600 }: CategoryFetchOptions = {},
  ): Promise<CategoryContent> {
    return apiRequest({
      method: "GET",
      path: `/categories/${id}/content`,
      schema: CategoryContentSchema,
      signal,
      token,
      next: { revalidate, tags: [CATEGORY_TAG, `${CATEGORY_TAG}:${id}:content`] },
    });
  },
};
