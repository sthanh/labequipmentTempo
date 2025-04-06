export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "critical";
  requestDate: string;
  completionDate?: string;
  equipmentId: string;
  locationId: string;
  requestedBy: string;
  assignedTo?: string;
  notes?: string;
  serviceType: string;
  estimatedCost?: number;
  actualCost?: number;
}

export interface ServiceRequestFormData {
  title: string;
  description: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "critical";
  requestDate: string;
  completionDate?: string;
  equipmentId: string;
  locationId: string;
  requestedBy: string;
  assignedTo?: string;
  notes?: string;
  serviceType: string;
  estimatedCost?: number;
  actualCost?: number;
}
