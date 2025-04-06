import React, { useState } from "react";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { ServiceRequestForm } from "../forms/ServiceRequestForm";
import { ServiceRequestFormData } from "../../models/ServiceRequest";

export default function ServiceRequestPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [equipmentFilter, setEquipmentFilter] = useState("all");

  // Mock data for demonstration
  const [mockRequests, setMockRequests] = useState([
    {
      id: "SR-001",
      title: "Mass Spectrometer Calibration",
      equipment: "Mass Spectrometer",
      equipmentId: "SPEC-001",
      description: "Calibration error on startup",
      priority: "high",
      status: "pending",
      requestedBy: "Jane Smith",
      requestDate: "2023-10-15",
      assignedTo: "Tech Support",
      locationId: "LAB-001",
      serviceType: "calibration",
    },
    {
      id: "SR-002",
      title: "HPLC System Pressure Issue",
      equipment: "HPLC System",
      equipmentId: "HPLC-002",
      description: "Pressure fluctuation during operation",
      priority: "medium",
      status: "in-progress",
      requestedBy: "John Doe",
      requestDate: "2023-10-14",
      assignedTo: "Service Team",
      locationId: "LAB-001",
      serviceType: "corrective",
    },
    {
      id: "SR-003",
      title: "Thermal Cycler Temperature Control",
      equipment: "Thermal Cycler",
      equipmentId: "THER-004",
      description: "Temperature control issue during PCR cycles",
      priority: "low",
      status: "resolved",
      requestedBy: "Sarah Johnson",
      requestDate: "2023-10-13",
      assignedTo: "Maintenance",
      locationId: "LAB-003",
      serviceType: "repair",
      completionDate: "2023-10-20",
    },
  ]);

  // Mock data for form dropdowns
  const mockEquipment = [
    {
      id: "SPEC-001",
      name: "Mass Spectrometer",
      serialNumber: "TF20210428-001",
    },
    { id: "HPLC-002", name: "HPLC System", serialNumber: "AG20200315-002" },
    {
      id: "MICR-003",
      name: "Confocal Microscope",
      serialNumber: "ZS20210610-003",
    },
    { id: "THER-004", name: "Thermal Cycler", serialNumber: "BR20190520-004" },
  ];

  const mockLocations = [
    { id: "LAB-001", name: "Main Laboratory" },
    { id: "LAB-002", name: "Imaging Suite" },
    { id: "LAB-003", name: "Molecular Lab" },
    { id: "LAB-004", name: "Genomics Lab" },
  ];

  const mockTechnicians = [
    { id: "TECH-001", name: "John Smith" },
    { id: "TECH-002", name: "Maria Garcia" },
    { id: "TECH-003", name: "David Chen" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <ClockIcon size={16} className="text-yellow-500" />;
      case "in-progress":
        return <AlertCircleIcon size={16} className="text-blue-500" />;
      case "resolved":
        return <CheckCircleIcon size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  const handleCreateRequest = (formData: ServiceRequestFormData) => {
    const newRequest = {
      id: `SR-${String(mockRequests.length + 1).padStart(3, "0")}`,
      title: formData.title,
      equipment:
        mockEquipment.find((e) => e.id === formData.equipmentId)?.name || "",
      equipmentId: formData.equipmentId,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      requestedBy: formData.requestedBy,
      requestDate: formData.requestDate,
      assignedTo: formData.assignedTo,
      locationId: formData.locationId,
      serviceType: formData.serviceType,
      completionDate: formData.completionDate,
      notes: formData.notes,
      estimatedCost: formData.estimatedCost,
      actualCost: formData.actualCost,
    };

    setMockRequests([...mockRequests, newRequest]);
    setIsFormOpen(false);
  };

  const handleUpdateRequest = (formData: ServiceRequestFormData) => {
    if (!editingRequest) return;

    const updatedRequests = mockRequests.map((request) =>
      request.id === editingRequest.id
        ? {
            ...request,
            title: formData.title,
            equipment:
              mockEquipment.find((e) => e.id === formData.equipmentId)?.name ||
              "",
            equipmentId: formData.equipmentId,
            description: formData.description,
            priority: formData.priority,
            status: formData.status,
            requestedBy: formData.requestedBy,
            requestDate: formData.requestDate,
            assignedTo: formData.assignedTo,
            locationId: formData.locationId,
            serviceType: formData.serviceType,
            completionDate: formData.completionDate,
            notes: formData.notes,
            estimatedCost: formData.estimatedCost,
            actualCost: formData.actualCost,
          }
        : request,
    );

    setMockRequests(updatedRequests);
    setEditingRequest(null);
    setIsFormOpen(false);
  };

  const handleEditRequest = (request) => {
    setEditingRequest(request);
    setIsFormOpen(true);
  };

  const handleDeleteRequest = (requestId) => {
    if (confirm("Are you sure you want to delete this service request?")) {
      const updatedRequests = mockRequests.filter(
        (request) => request.id !== requestId,
      );
      setMockRequests(updatedRequests);
    }
  };

  const filteredRequests = mockRequests.filter((request) => {
    const matchesTab =
      activeTab === "active"
        ? request.status !== "resolved"
        : request.status === "resolved";

    const matchesSearch = searchQuery
      ? request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesPriority =
      priorityFilter === "all" ? true : request.priority === priorityFilter;
    const matchesEquipment =
      equipmentFilter === "all"
        ? true
        : request.equipmentId === equipmentFilter;

    return matchesTab && matchesSearch && matchesPriority && matchesEquipment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Service Requests</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track equipment service requests
          </p>
        </div>
        <button
          onClick={() => {
            setEditingRequest(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon size={16} className="mr-2" />
          New Request
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <SearchIcon
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Equipment</option>
              {mockEquipment.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name}
                </option>
              ))}
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FilterIcon size={16} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("active")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "active" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Active Requests
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "resolved" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Resolved
          </button>
        </nav>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredRequests.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <li
                key={request.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 gap-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(request.status)}
                    </div>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold text-gray-900">
                        {request.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 mr-2">
                          {request.id}
                        </span>
                        <span className="text-xs text-gray-500">
                          {request.equipment}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {request.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}
                    >
                      {request.priority.charAt(0).toUpperCase() +
                        request.priority.slice(1)}
                    </span>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm text-gray-900">
                        {request.requestedBy}
                      </p>
                      <p className="text-sm text-gray-500">
                        {request.requestDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRequest(request)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(request.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No service requests found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Service Request Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingRequest
                  ? "Edit Service Request"
                  : "Create Service Request"}
              </h2>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingRequest(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon size={24} />
              </button>
            </div>
            <ServiceRequestForm
              initialData={
                editingRequest
                  ? {
                      title: editingRequest.title,
                      description: editingRequest.description,
                      status: editingRequest.status,
                      priority: editingRequest.priority,
                      requestDate: editingRequest.requestDate,
                      completionDate: editingRequest.completionDate,
                      equipmentId: editingRequest.equipmentId,
                      locationId: editingRequest.locationId,
                      requestedBy: editingRequest.requestedBy,
                      assignedTo: editingRequest.assignedTo,
                      notes: editingRequest.notes || "",
                      serviceType: editingRequest.serviceType,
                      estimatedCost: editingRequest.estimatedCost,
                      actualCost: editingRequest.actualCost,
                    }
                  : undefined
              }
              onSubmit={
                editingRequest ? handleUpdateRequest : handleCreateRequest
              }
              onCancel={() => {
                setIsFormOpen(false);
                setEditingRequest(null);
              }}
              equipment={mockEquipment}
              locations={mockLocations}
              technicians={mockTechnicians}
            />
          </div>
        </div>
      )}
    </div>
  );
}
