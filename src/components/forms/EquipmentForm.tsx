import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";
import { EquipmentFormData } from "../../models/Equipment";
import { Location } from "../../models/Location";
import { Category } from "../../models/Category";

interface EquipmentFormProps {
  initialData?: EquipmentFormData;
  onSubmit: (data: EquipmentFormData) => void;
  onCancel: () => void;
  locations: Location[];
  categories: Category[];
  isSubmitting?: boolean;
}

export const EquipmentForm = ({
  initialData,
  onSubmit,
  onCancel,
  locations,
  categories,
  isSubmitting = false,
}: EquipmentFormProps) => {
  const [formData, setFormData] = useState<EquipmentFormData>(
    initialData || {
      name: "",
      model: "",
      serialNumber: "",
      manufacturer: "",
      purchaseDate: "",
      lastServiceDate: "",
      status: "operational",
      category: "",
      locationId: "",
      notes: "",
      image: "",
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

    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }

    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = "Serial number is required";
    }

    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = "Manufacturer is required";
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "Purchase date is required";
    }

    if (!formData.locationId) {
      newErrors.locationId = "Location is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Equipment Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <Input
          label="Model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          error={errors.model}
          required
        />

        <Input
          label="Serial Number"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          error={errors.serialNumber}
          required
        />

        <Input
          label="Manufacturer"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          error={errors.manufacturer}
          required
        />

        <Input
          label="Purchase Date"
          name="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={handleChange}
          error={errors.purchaseDate}
          required
        />

        <Input
          label="Last Service Date"
          name="lastServiceDate"
          type="date"
          value={formData.lastServiceDate}
          onChange={handleChange}
          error={errors.lastServiceDate}
          required
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={(value) =>
            setFormData({ ...formData, status: value as any })
          }
          error={errors.status}
          options={[
            { value: "operational", label: "Operational" },
            { value: "maintenance", label: "Maintenance" },
            { value: "repair", label: "Repair" },
            { value: "retired", label: "Retired" },
          ]}
          required
        />

        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={(value) => setFormData({ ...formData, category: value })}
          error={errors.category}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          required
        />

        <Select
          label="Location"
          name="locationId"
          value={formData.locationId}
          onChange={(value) => setFormData({ ...formData, locationId: value })}
          error={errors.locationId}
          options={locations.map((location) => ({
            value: location.id,
            label: location.name,
          }))}
          required
        />

        <Input
          label="Image URL"
          name="image"
          value={formData.image || ""}
          onChange={handleChange}
          error={errors.image}
        />
      </div>

      <TextArea
        label="Notes"
        name="notes"
        value={formData.notes || ""}
        onChange={handleChange}
        error={errors.notes}
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
              ? "Update Equipment"
              : "Add Equipment"}
        </Button>
      </div>
    </form>
  );
};
