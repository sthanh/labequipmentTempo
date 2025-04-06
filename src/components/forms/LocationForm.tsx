import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";
import { LocationFormData } from "../../models/Location";

interface LocationFormProps {
  initialData?: LocationFormData;
  onSubmit: (data: LocationFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const LocationForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: LocationFormProps) => {
  const [formData, setFormData] = useState<LocationFormData>(
    initialData || {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      type: "facility",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      notes: "",
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

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (
      formData.contactEmail &&
      !/^\S+@\S+\.\S+$/.test(formData.contactEmail)
    ) {
      newErrors.contactEmail = "Invalid email format";
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
          label="Location Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <Select
          label="Location Type"
          name="type"
          value={formData.type}
          onChange={(value) => setFormData({ ...formData, type: value })}
          error={errors.type}
          options={[
            { value: "facility", label: "Facility" },
            { value: "warehouse", label: "Warehouse" },
            { value: "laboratory", label: "Laboratory" },
            { value: "office", label: "Office" },
            { value: "production", label: "Production" },
          ]}
          required
        />

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          required
          className="md:col-span-2"
        />

        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          required
        />

        <Input
          label="State/Province"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
          required
        />

        <Input
          label="Zip/Postal Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          error={errors.zipCode}
          required
        />

        <Input
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          required
        />

        <Input
          label="Contact Name"
          name="contactName"
          value={formData.contactName || ""}
          onChange={handleChange}
          error={errors.contactName}
        />

        <Input
          label="Contact Phone"
          name="contactPhone"
          value={formData.contactPhone || ""}
          onChange={handleChange}
          error={errors.contactPhone}
        />

        <Input
          label="Contact Email"
          name="contactEmail"
          value={formData.contactEmail || ""}
          onChange={handleChange}
          error={errors.contactEmail}
          type="email"
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
              ? "Update Location"
              : "Add Location"}
        </Button>
      </div>
    </form>
  );
};
