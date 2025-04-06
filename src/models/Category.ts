export interface Category {
  id: string;
  name: string;
  description?: string;
  parentCategoryId?: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  parentCategoryId?: string;
}
