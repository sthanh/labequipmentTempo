import React, { useState } from "react";
import { useServiceRequests } from "../contexts/ServiceRequestContext";
import {
  ServiceRequest,
  ServiceRequestPriority,
} from "../models/ServiceRequest";
import { AlertCircleIcon, XIcon } from "lucide-react";

interface ServiceRequestFormProps {
  equipmentId?: string;
  equipmentName?: string;
  onClose: () => void;
  onSuccess?: (request: ServiceRequest) => void;
}

export function ServiceRequestForm({
  equipmentId,
  equipmentName,
  onClose,
  onSuccess,
}: ServiceRequestFormProps) {
  const { createRequest } = useServiceRequests();
  const [formData, setFormData] = useState({
    equipmentId: equipmentId || "",
    equipmentName: equipmentName || "",
    issue: "",
    description: "",
    priority: "medium" as ServiceRequestPriority,
    requestedBy: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.equipmentId)
      newErrors.equipmentId = "Equipment ID is required";
    if (!formData.equipmentName)
      newErrors.equipmentName = "Equipment name is required";
    if (!formData.issue.trim()) newErrors.issue = "Issue is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.requestedBy.trim())
      newErrors.requestedBy = "Requester name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const newRequest = await createRequest({
        ...formData,
        status: "pending",
        requestDate: new Date().toISOString().split("T")[0],
      });

      if (onSuccess) {
        onSuccess(newRequest);
      }
      onClose();
    } catch (error) {
      console.error("Failed to create service request:", error);
      setErrors({
        form: "Failed to create service request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Create Service Request
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <XIcon size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {errors.form && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircleIcon
                size={16}
                className="text-red-500 mt-0.5 mr-2 flex-shrink-0"
              />
              <p className="text-sm text-red-600">{errors.form}</p>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="equipmentId"
              className="block text-sm font-medium text-gray-700"
            >
              Equipment ID
            </label>
            <input
              type="text"
              id="equipmentId"
              name="equipmentId"
              value={formData.equipmentId}
              onChange={handleChange}
              disabled={!!equipmentId}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
            {errors.equipmentId && (
              <p className="text-sm text-red-600">{errors.equipmentId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="equipmentName"
              className="block text-sm font-medium text-gray-700"
            >
              Equipment Name
            </label>
            <input
              type="text"
              id="equipmentName"
              name="equipmentName"
              value={formData.equipmentName}
              onChange={handleChange}
              disabled={!!equipmentName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
            {errors.equipmentName && (
              <p className="text-sm text-red-600">{errors.equipmentName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="issue"
              className="block text-sm font-medium text-gray-700"
            >
              Issue Title
            </label>
            <input
              type="text"
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of the issue"
            />
            {errors.issue && (
              <p className="text-sm text-red-600">{errors.issue}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Detailed Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide details about the issue"
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="requestedBy"
              className="block text-sm font-medium text-gray-700"
            >
              Requested By
            </label>
            <input
              type="text"
              id="requestedBy"
              name="requestedBy"
              value={formData.requestedBy}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your name"
            />
            {errors.requestedBy && (
              <p className="text-sm text-red-600">{errors.requestedBy}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
