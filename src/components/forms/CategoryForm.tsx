import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";
import { CategoryFormData } from "../../models/Category";

interface CategoryFormProps {
  initialData?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  categories: { id: string; name: string }[];
  isSubmitting?: boolean;
}

export const CategoryForm = ({
  initialData,
  onSubmit,
  onCancel,
  categories,
  isSubmitting = false,
}: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormData>(
    initialData || {
      name: "",
      description: "",
      parentCategoryId: "",
    },
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Check for circular reference in parent category
    if (initialData?.name && formData.parentCategoryId) {
      const selectedParentCategory = categories.find(
        (c) => c.id === formData.parentCategoryId,
      );
      if (
        selectedParentCategory &&
        selectedParentCategory.name === initialData.name
      ) {
        newErrors.parentCategoryId = "A category cannot be its own parent";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Filter out the current category from parent options to prevent circular references
  const parentCategoryOptions = categories
    .filter(
      (category) =>
        !initialData || category.id !== initialData.parentCategoryId,
    )
    .map((category) => ({
      value: category.id,
      label: category.name,
    }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Category Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Select
        label="Parent Category (Optional)"
        name="parentCategoryId"
        value={formData.parentCategoryId || ""}
        onChange={(value) =>
          setFormData({ ...formData, parentCategoryId: value || undefined })
        }
        error={errors.parentCategoryId}
        options={[
          { value: "", label: "None (Top Level Category)" },
          ...parentCategoryOptions,
        ]}
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        error={errors.description}
        rows={4}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Category"
              : "Add Category"}
        </Button>
      </div>
    </form>
  );
};
