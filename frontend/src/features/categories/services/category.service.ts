import { categoryApi, type CategoryFetchOptions } from "../api/category.api";
import type {
  Category,
  CategoryContent,
  CategoryId,
  CategoryList,
} from "../schemas/category.schema";

/**
 * Domain service for categories. Use from Server Components or other server code.
 * Keeps business logic (sorting, filtering, fallbacks) out of api/ and hooks/.
 */
export const categoryService = {
  async getAll(opts?: CategoryFetchOptions): Promise<CategoryList> {
    const list = await categoryApi.list(opts);
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  },

  getById(id: CategoryId, opts?: CategoryFetchOptions): Promise<Category> {
    return categoryApi.byId(id, opts);
  },

  getContent(id: CategoryId, opts?: CategoryFetchOptions): Promise<CategoryContent> {
    return categoryApi.content(id, opts);
  },

  
};
