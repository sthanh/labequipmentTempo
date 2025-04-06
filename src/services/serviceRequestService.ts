import { ServiceRequest, ServiceRequestNote } from "../models/ServiceRequest";

// Mock data for service requests
let mockServiceRequests: ServiceRequest[] = [
  {
    id: "SR-001",
    equipmentId: "EQ-001",
    equipmentName: "Mass Spectrometer",
    issue: "Calibration error",
    description: "Device is showing calibration errors during startup sequence",
    priority: "high",
    status: "pending",
    requestedBy: "Jane Smith",
    requestDate: "2023-10-15",
    assignedTo: "Tech Support",
    notes: [
      "Initial assessment scheduled for tomorrow",
      "Parts may need to be ordered",
    ],
  },
  {
    id: "SR-002",
    equipmentId: "EQ-002",
    equipmentName: "HPLC System",
    issue: "Pressure fluctuation",
    description: "System showing unstable pressure readings during operation",
    priority: "medium",
    status: "in-progress",
    requestedBy: "John Doe",
    requestDate: "2023-10-14",
    assignedTo: "Service Team",
    notes: ["Technician dispatched", "Initial diagnosis points to pump issue"],
  },
  {
    id: "SR-003",
    equipmentId: "EQ-003",
    equipmentName: "Thermal Cycler",
    issue: "Temperature control issue",
    description: "Unable to maintain stable temperature during cycles",
    priority: "low",
    status: "resolved",
    requestedBy: "Sarah Johnson",
    requestDate: "2023-10-13",
    assignedTo: "Maintenance",
    resolvedDate: "2023-10-16",
    resolution: "Replaced faulty temperature sensor and recalibrated",
    notes: [
      "Initial troubleshooting performed",
      "Ordered replacement sensor",
      "Installed new sensor and verified operation",
    ],
  },
];

// Get all service requests
export const getAllServiceRequests = (): Promise<ServiceRequest[]> => {
  return Promise.resolve(mockServiceRequests);
};

// Get service requests by equipment ID
export const getServiceRequestsByEquipment = (
  equipmentId: string,
): Promise<ServiceRequest[]> => {
  const requests = mockServiceRequests.filter(
    (request) => request.equipmentId === equipmentId,
  );
  return Promise.resolve(requests);
};

// Get service request by ID
export const getServiceRequestById = (
  id: string,
): Promise<ServiceRequest | undefined> => {
  const request = mockServiceRequests.find((request) => request.id === id);
  return Promise.resolve(request);
};

// Create a new service request
export const createServiceRequest = (
  request: Omit<ServiceRequest, "id">,
): Promise<ServiceRequest> => {
  const newRequest: ServiceRequest = {
    ...request,
    id: `SR-${String(mockServiceRequests.length + 1).padStart(3, "0")}`,
    requestDate: new Date().toISOString().split("T")[0],
    status: "pending",
    notes: request.notes || [],
  };

  mockServiceRequests = [...mockServiceRequests, newRequest];
  return Promise.resolve(newRequest);
};

// Update a service request
export const updateServiceRequest = (
  id: string,
  updates: Partial<ServiceRequest>,
): Promise<ServiceRequest | undefined> => {
  const index = mockServiceRequests.findIndex((request) => request.id === id);

  if (index === -1) {
    return Promise.resolve(undefined);
  }

  const updatedRequest = {
    ...mockServiceRequests[index],
    ...updates,
  };

  mockServiceRequests = [
    ...mockServiceRequests.slice(0, index),
    updatedRequest,
    ...mockServiceRequests.slice(index + 1),
  ];

  return Promise.resolve(updatedRequest);
};

// Add a note to a service request
export const addServiceRequestNote = (
  requestId: string,
  note: string,
  createdBy: string,
): Promise<ServiceRequest | undefined> => {
  const index = mockServiceRequests.findIndex(
    (request) => request.id === requestId,
  );

  if (index === -1) {
    return Promise.resolve(undefined);
  }

  const request = mockServiceRequests[index];
  const updatedNotes = [...(request.notes || []), note];

  const updatedRequest = {
    ...request,
    notes: updatedNotes,
  };

  mockServiceRequests = [
    ...mockServiceRequests.slice(0, index),
    updatedRequest,
    ...mockServiceRequests.slice(index + 1),
  ];

  return Promise.resolve(updatedRequest);
};

// Get active service requests (pending and in-progress)
export const getActiveServiceRequests = (): Promise<ServiceRequest[]> => {
  const activeRequests = mockServiceRequests.filter(
    (request) =>
      request.status === "pending" || request.status === "in-progress",
  );
  return Promise.resolve(activeRequests);
};

// Get resolved service requests
export const getResolvedServiceRequests = (): Promise<ServiceRequest[]> => {
  const resolvedRequests = mockServiceRequests.filter(
    (request) => request.status === "resolved",
  );
  return Promise.resolve(resolvedRequests);
};
