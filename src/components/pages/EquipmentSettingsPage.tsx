import React, { useState } from "react";
import { PlusIcon, ArrowLeftIcon } from "lucide-react";
import { mockEquipmentData } from "../../utils/mockData";

interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  icon: string;
  status: string;
  statusText: string;
  location: string;
  lastRun: string;
  serialNumber?: string;
  manufacturer?: string;
  installDate?: string;
  lastCalibration?: string;
  statusNote?: string;
  locationDetail?: string;
  lastOperator?: string;
}

enum EquipmentView {
  LIST = "list",
  CREATE = "create",
  EDIT = "edit",
  DELETE = "delete",
  DETAIL = "detail",
}

export function EquipmentSettingsPage() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipmentData);
  const [currentView, setCurrentView] = useState<EquipmentView>(
    EquipmentView.LIST,
  );
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null,
  );
  const [formData, setFormData] = useState<Partial<Equipment>>({
    name: "",
    type: "",
    model: "",
    icon: "flask-conical",
    status: "operational",
    statusText: "Operational",
    location: "",
    lastRun: new Date().toISOString().split("T")[0],
  });

  const handleCreateEquipment = () => {
    const newEquipment = {
      id: `EQ-${Math.floor(Math.random() * 10000)}`,
      ...formData,
    } as Equipment;

    setEquipment([...equipment, newEquipment]);
    setFormData({
      name: "",
      type: "",
      model: "",
      icon: "flask-conical",
      status: "operational",
      statusText: "Operational",
      location: "",
      lastRun: new Date().toISOString().split("T")[0],
    });
    setCurrentView(EquipmentView.LIST);
  };

  const handleUpdateEquipment = () => {
    if (!selectedEquipment) return;

    const updatedEquipment = equipment.map((eq) =>
      eq.id === selectedEquipment.id ? { ...eq, ...formData } : eq,
    );

    setEquipment(updatedEquipment);
    setSelectedEquipment(null);
    setFormData({
      name: "",
      type: "",
      model: "",
      icon: "flask-conical",
      status: "operational",
      statusText: "Operational",
      location: "",
      lastRun: new Date().toISOString().split("T")[0],
    });
    setCurrentView(EquipmentView.LIST);
  };

  const handleDeleteEquipment = () => {
    if (!selectedEquipment) return;

    const filteredEquipment = equipment.filter(
      (eq) => eq.id !== selectedEquipment.id,
    );

    setEquipment(filteredEquipment);
    setSelectedEquipment(null);
    setCurrentView(EquipmentView.LIST);
  };

  const handleEditClick = (eq: Equipment) => {
    setSelectedEquipment(eq);
    setFormData({
      name: eq.name,
      type: eq.type,
      model: eq.model,
      icon: eq.icon,
      status: eq.status,
      statusText: eq.statusText,
      location: eq.location,
      lastRun: eq.lastRun,
      serialNumber: eq.serialNumber,
      manufacturer: eq.manufacturer,
      installDate: eq.installDate,
      lastCalibration: eq.lastCalibration,
      statusNote: eq.statusNote,
      locationDetail: eq.locationDetail,
      lastOperator: eq.lastOperator,
    });
    setCurrentView(EquipmentView.EDIT);
  };

  const handleDeleteClick = (eq: Equipment) => {
    setSelectedEquipment(eq);
    setCurrentView(EquipmentView.DELETE);
  };

  const handleViewDetailClick = (eq: Equipment) => {
    setSelectedEquipment(eq);
    setCurrentView(EquipmentView.DETAIL);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {currentView === EquipmentView.LIST && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Equipment Management
            </h1>
            <button
              onClick={() => setCurrentView(EquipmentView.CREATE)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusIcon size={16} className="mr-2" />
              Add Equipment
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    Type
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    Model
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    Location
                  </th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {equipment.map((eq) => (
                  <tr key={eq.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {eq.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {eq.type}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {eq.model}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${eq.status === "operational" ? "bg-green-100 text-green-800" : eq.status === "maintenance" ? "bg-yellow-100 text-yellow-800" : eq.status === "attention" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`}
                      >
                        {eq.statusText}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {eq.location}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleViewDetailClick(eq)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(eq)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(eq)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Create Equipment Form */}
      {currentView === EquipmentView.CREATE && (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentView(EquipmentView.LIST)}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Add New Equipment
            </h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateEquipment();
            }}
            className="space-y-4 max-w-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Equipment Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type*
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Model*
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status*
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || "operational"}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="attention">Needs Attention</option>
                  <option value="out-of-service">Out of Service</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="statusText"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status Text*
                </label>
                <input
                  type="text"
                  id="statusText"
                  name="statusText"
                  value={formData.statusText || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="manufacturer"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Manufacturer
                </label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Equipment
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: "",
                    type: "",
                    model: "",
                    icon: "flask-conical",
                    status: "operational",
                    statusText: "Operational",
                    location: "",
                    lastRun: new Date().toISOString().split("T")[0],
                  });
                  setCurrentView(EquipmentView.LIST);
                }}
                className="ml-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Equipment Form */}
      {currentView === EquipmentView.EDIT && selectedEquipment && (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => {
                setSelectedEquipment(null);
                setFormData({
                  name: "",
                  type: "",
                  model: "",
                  icon: "flask-conical",
                  status: "operational",
                  statusText: "Operational",
                  location: "",
                  lastRun: new Date().toISOString().split("T")[0],
                });
                setCurrentView(EquipmentView.LIST);
              }}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Edit Equipment</h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateEquipment();
            }}
            className="space-y-4 max-w-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Equipment Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type*
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Model*
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status*
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || "operational"}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="attention">Needs Attention</option>
                  <option value="out-of-service">Out of Service</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="statusText"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status Text*
                </label>
                <input
                  type="text"
                  id="statusText"
                  name="statusText"
                  value={formData.statusText || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="manufacturer"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Manufacturer
                </label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Update Equipment
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedEquipment(null);
                  setFormData({
                    name: "",
                    type: "",
                    model: "",
                    icon: "flask-conical",
                    status: "operational",
                    statusText: "Operational",
                    location: "",
                    lastRun: new Date().toISOString().split("T")[0],
                  });
                  setCurrentView(EquipmentView.LIST);
                }}
                className="ml-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Equipment Confirmation */}
      {currentView === EquipmentView.DELETE && selectedEquipment && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-6">
            <button
              onClick={() => {
                setSelectedEquipment(null);
                setCurrentView(EquipmentView.LIST);
              }}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Delete Equipment
            </h1>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-700">
              Are you sure you want to delete the equipment{" "}
              <strong>{selectedEquipment.name}</strong>? This action cannot be
              undone.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDeleteEquipment}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setSelectedEquipment(null);
                setCurrentView(EquipmentView.LIST);
              }}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Equipment Detail View */}
      {currentView === EquipmentView.DETAIL && selectedEquipment && (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => {
                setSelectedEquipment(null);
                setCurrentView(EquipmentView.LIST);
              }}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedEquipment.name}
            </h1>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Equipment Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Type:</span>
                    <p className="text-gray-800">{selectedEquipment.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Model:</span>
                    <p className="text-gray-800">{selectedEquipment.model}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedEquipment.status === "operational" ? "bg-green-100 text-green-800" : selectedEquipment.status === "maintenance" ? "bg-yellow-100 text-yellow-800" : selectedEquipment.status === "attention" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`}
                      >
                        {selectedEquipment.statusText}
                      </span>
                    </p>
                  </div>
                  {selectedEquipment.statusNote && (
                    <div>
                      <span className="text-sm text-gray-500">
                        Status Note:
                      </span>
                      <p className="text-gray-800">
                        {selectedEquipment.statusNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Additional Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Location:</span>
                    <p className="text-gray-800">
                      {selectedEquipment.location}
                    </p>
                  </div>
                  {selectedEquipment.locationDetail && (
                    <div>
                      <span className="text-sm text-gray-500">
                        Location Detail:
                      </span>
                      <p className="text-gray-800">
                        {selectedEquipment.locationDetail}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500">Last Run:</span>
                    <p className="text-gray-800">{selectedEquipment.lastRun}</p>
                  </div>
                  {selectedEquipment.lastOperator && (
                    <div>
                      <span className="text-sm text-gray-500">
                        Last Operator:
                      </span>
                      <p className="text-gray-800">
                        {selectedEquipment.lastOperator}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {(selectedEquipment.serialNumber ||
                selectedEquipment.manufacturer ||
                selectedEquipment.installDate ||
                selectedEquipment.lastCalibration) && (
                <div className="md:col-span-2">
                  <h2 className="text-lg font-semibold mb-4">
                    Technical Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedEquipment.serialNumber && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Serial Number:
                        </span>
                        <p className="text-gray-800">
                          {selectedEquipment.serialNumber}
                        </p>
                      </div>
                    )}
                    {selectedEquipment.manufacturer && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Manufacturer:
                        </span>
                        <p className="text-gray-800">
                          {selectedEquipment.manufacturer}
                        </p>
                      </div>
                    )}
                    {selectedEquipment.installDate && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Install Date:
                        </span>
                        <p className="text-gray-800">
                          {selectedEquipment.installDate}
                        </p>
                      </div>
                    )}
                    {selectedEquipment.lastCalibration && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Last Calibration:
                        </span>
                        <p className="text-gray-800">
                          {selectedEquipment.lastCalibration}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleEditClick(selectedEquipment)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(selectedEquipment)}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
