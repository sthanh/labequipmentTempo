import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";
import { ServiceRequestFormData } from "../../models/ServiceRequest";
import { Equipment } from "../../models/Equipment";
import { Location } from "../../models/Location";

interface ServiceRequestFormProps {
  initialData?: ServiceRequestFormData;
  onSubmit: (data: ServiceRequestFormData) => void;
  onCancel: () => void;
  equipment: Equipment[];
  locations: Location[];
  technicians: { id: string; name: string }[];
  isSubmitting?: boolean;
}

export const ServiceRequestForm = ({
  initialData,
  onSubmit,
  onCancel,
  equipment,
  locations,
  technicians,
  isSubmitting = false,
}: ServiceRequestFormProps) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<ServiceRequestFormData>(
    initialData || {
      title: "",
      description: "",
      status: "open",
      priority: "medium",
      requestDate: today,
      equipmentId: "",
      locationId: "",
      requestedBy: "",
      serviceType: "",
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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? undefined : parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.equipmentId) {
      newErrors.equipmentId = "Equipment is required";
    }

    if (!formData.locationId) {
      newErrors.locationId = "Location is required";
    }

    if (!formData.requestedBy.trim()) {
      newErrors.requestedBy = "Requester name is required";
    }

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = "Service type is required";
    }

    if (formData.status === "completed" && !formData.completionDate) {
      newErrors.completionDate =
        "Completion date is required for completed requests";
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
          label="Service Request Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
          className="md:col-span-2"
        />

        <Select
          label="Equipment"
          name="equipmentId"
          value={formData.equipmentId}
          onChange={(value) => setFormData({ ...formData, equipmentId: value })}
          error={errors.equipmentId}
          options={equipment.map((item) => ({
            value: item.id,
            label: `${item.name} (${item.serialNumber})`,
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

        <Select
          label="Service Type"
          name="serviceType"
          value={formData.serviceType}
          onChange={(value) => setFormData({ ...formData, serviceType: value })}
          error={errors.serviceType}
          options={[
            { value: "preventive", label: "Preventive Maintenance" },
            { value: "corrective", label: "Corrective Maintenance" },
            { value: "installation", label: "Installation" },
            { value: "calibration", label: "Calibration" },
            { value: "inspection", label: "Inspection" },
            { value: "other", label: "Other" },
          ]}
          required
        />

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={(value) =>
            setFormData({ ...formData, priority: value as any })
          }
          error={errors.priority}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
            { value: "critical", label: "Critical" },
          ]}
          required
        />

        <Input
          label="Request Date"
          name="requestDate"
          type="date"
          value={formData.requestDate}
          onChange={handleChange}
          error={errors.requestDate}
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
            { value: "open", label: "Open" },
            { value: "in-progress", label: "In Progress" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          required
        />

        {(formData.status === "completed" ||
          formData.status === "in-progress") && (
          <Input
            label="Completion Date"
            name="completionDate"
            type="date"
            value={formData.completionDate || ""}
            onChange={handleChange}
            error={errors.completionDate}
            required={formData.status === "completed"}
          />
        )}

        <Input
          label="Requested By"
          name="requestedBy"
          value={formData.requestedBy}
          onChange={handleChange}
          error={errors.requestedBy}
          required
        />

        <Select
          label="Assigned To"
          name="assignedTo"
          value={formData.assignedTo || ""}
          onChange={(value) =>
            setFormData({ ...formData, assignedTo: value || undefined })
          }
          error={errors.assignedTo}
          options={[
            { value: "", label: "Not Assigned" },
            ...technicians.map((tech) => ({
              value: tech.id,
              label: tech.name,
            })),
          ]}
        />

        <Input
          label="Estimated Cost"
          name="estimatedCost"
          type="number"
          value={formData.estimatedCost?.toString() || ""}
          onChange={handleNumberChange}
          error={errors.estimatedCost}
        />

        <Input
          label="Actual Cost"
          name="actualCost"
          type="number"
          value={formData.actualCost?.toString() || ""}
          onChange={handleNumberChange}
          error={errors.actualCost}
        />
      </div>

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        rows={3}
        required
      />

      <TextArea
        label="Notes"
        name="notes"
        value={formData.notes || ""}
        onChange={handleChange}
        error={errors.notes}
        rows={3}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Service Request"
              : "Create Service Request"}
        </Button>
      </div>
    </form>
  );
};
