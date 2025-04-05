import React, { useState } from "react";
import {
  PlusIcon,
  ArrowLeftIcon,
  MapPinIcon,
  SearchIcon,
  FilterIcon,
  SlidersIcon,
  GridIcon,
  ListIcon,
} from "lucide-react";
import { mockLocationsData, Location } from "../../utils/mockLocationsData";

enum LocationView {
  LIST = "list",
  CREATE = "create",
  EDIT = "edit",
  DELETE = "delete",
  DETAIL = "detail",
}

export function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(mockLocationsData);
  const [currentView, setCurrentView] = useState<LocationView>(
    LocationView.LIST,
  );
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    building: "all",
    status: "all",
  });

  const [formData, setFormData] = useState<Partial<Location>>({
    name: "",
    type: "",
    building: "",
    floor: "",
    roomNumber: "",
    description: "",
    status: "active",
    statusText: "Active",
    capacity: 0,
    equipmentCount: 0,
    lastModified: new Date().toISOString().split("T")[0],
  });

  const handleCreateLocation = () => {
    const newLocation = {
      id: `LOC-${Math.floor(Math.random() * 10000)}`,
      ...formData,
    } as Location;

    setLocations([...locations, newLocation]);
    resetForm();
    setCurrentView(LocationView.LIST);
  };

  const handleUpdateLocation = () => {
    if (!selectedLocation) return;

    const updatedLocations = locations.map((loc) =>
      loc.id === selectedLocation.id ? { ...loc, ...formData } : loc,
    );

    setLocations(updatedLocations);
    setSelectedLocation(null);
    resetForm();
    setCurrentView(LocationView.LIST);
  };

  const handleDeleteLocation = () => {
    if (!selectedLocation) return;

    const filteredLocations = locations.filter(
      (loc) => loc.id !== selectedLocation.id,
    );

    setLocations(filteredLocations);
    setSelectedLocation(null);
    setCurrentView(LocationView.LIST);
  };

  const handleEditClick = (loc: Location) => {
    setSelectedLocation(loc);
    setFormData({
      name: loc.name,
      type: loc.type,
      building: loc.building,
      floor: loc.floor,
      roomNumber: loc.roomNumber,
      description: loc.description || "",
      status: loc.status,
      statusText: loc.statusText,
      capacity: loc.capacity || 0,
      equipmentCount: loc.equipmentCount || 0,
      lastModified: loc.lastModified || new Date().toISOString().split("T")[0],
      contactPerson: loc.contactPerson || "",
      contactEmail: loc.contactEmail || "",
      contactPhone: loc.contactPhone || "",
      accessRestrictions: loc.accessRestrictions || "",
      notes: loc.notes || "",
    });
    setCurrentView(LocationView.EDIT);
  };

  const handleDeleteClick = (loc: Location) => {
    setSelectedLocation(loc);
    setCurrentView(LocationView.DELETE);
  };

  const handleViewDetailClick = (loc: Location) => {
    setSelectedLocation(loc);
    setCurrentView(LocationView.DETAIL);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      building: "",
      floor: "",
      roomNumber: "",
      description: "",
      status: "active",
      statusText: "Active",
      capacity: 0,
      equipmentCount: 0,
      lastModified: new Date().toISOString().split("T")[0],
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "restricted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredLocations = locations.filter((item) => {
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.building.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesType =
      filters.type === "all" ? true : item.type === filters.type;
    const matchesBuilding =
      filters.building === "all" ? true : item.building === filters.building;
    const matchesStatus =
      filters.status === "all" ? true : item.status === filters.status;

    return matchesSearch && matchesType && matchesBuilding && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {currentView === LocationView.LIST && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Locations</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage laboratory and facility locations
              </p>
            </div>
            <button
              onClick={() => setCurrentView(LocationView.CREATE)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon size={16} className="mr-2" />
              Add Location
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <SearchIcon
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FilterIcon size={16} className="mr-2" />
                Filters
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <SlidersIcon size={16} className="mr-2" />
                Sort
              </button>
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}
              >
                <GridIcon size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
              >
                <ListIcon size={20} />
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => handleViewDetailClick(location)}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                          <MapPinIcon className="text-blue-600" size={24} />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {location.name}
                          </h3>
                          <p className="text-sm text-gray-500">{location.id}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}
                      >
                        {location.statusText}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="mt-1 text-sm font-medium">
                          {location.type}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Building</p>
                        <p className="mt-1 text-sm font-medium">
                          {location.building}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Room</p>
                        <p className="mt-1 text-sm font-medium">
                          {location.roomNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Equipment</p>
                        <p className="mt-1 text-sm font-medium">
                          {location.equipmentCount || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Building
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLocations.map((location) => (
                    <tr key={location.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <MapPinIcon className="text-blue-600" size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {location.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {location.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.building}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.roomNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}
                        >
                          {location.statusText}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetailClick(location);
                          }}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(location);
                          }}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(location);
                          }}
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
          )}
        </>
      )}

      {/* Create Location Form */}
      {currentView === LocationView.CREATE && (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentView(LocationView.LIST)}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Add New Location
            </h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateLocation();
            }}
            className="space-y-4 max-w-2xl bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location Name*
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
                <select
                  id="type"
                  name="type"
                  value={formData.type || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="Research Lab">Research Lab</option>
                  <option value="Imaging Lab">Imaging Lab</option>
                  <option value="PCR Lab">PCR Lab</option>
                  <option value="Sequencing Lab">Sequencing Lab</option>
                  <option value="Storage">Storage</option>
                  <option value="Meeting Room">Meeting Room</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="building"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Building*
                </label>
                <input
                  type="text"
                  id="building"
                  name="building"
                  value={formData.building || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="floor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Floor*
                </label>
                <input
                  type="text"
                  id="floor"
                  name="floor"
                  value={formData.floor || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="roomNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Room Number*
                </label>
                <input
                  type="text"
                  id="roomNumber"
                  name="roomNumber"
                  value={formData.roomNumber || ""}
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
                  value={formData.status || "active"}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="restricted">Restricted Access</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="inactive">Inactive</option>
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
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="equipmentCount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Equipment Count
                </label>
                <input
                  type="number"
                  id="equipmentCount"
                  name="equipmentCount"
                  value={formData.equipmentCount || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Location
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setCurrentView(LocationView.LIST);
                }}
                className="ml-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Location Form */}
      {currentView === LocationView.EDIT && selectedLocation && (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => {
                setSelectedLocation(null);
                resetForm();
                setCurrentView(LocationView.LIST);
              }}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Edit Location</h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateLocation();
            }}
            className="space-y-4 max-w-2xl bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location Name*
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
                <select
                  id="type"
                  name="type"
                  value={formData.type || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="Research Lab">Research Lab</option>
                  <option value="Imaging Lab">Imaging Lab</option>
                  <option value="PCR Lab">PCR Lab</option>
                  <option value="Sequencing Lab">Sequencing Lab</option>
                  <option value="Storage">Storage</option>
                  <option value="Meeting Room">Meeting Room</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="building"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Building*
                </label>
                <input
                  type="text"
                  id="building"
                  name="building"
                  value={formData.building || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="floor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Floor*
                </label>
                <input
                  type="text"
                  id="floor"
                  name="floor"
                  value={formData.floor || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="roomNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Room Number*
                </label>
                <input
                  type="text"
                  id="roomNumber"
                  name="roomNumber"
                  value={formData.roomNumber || ""}
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
                  value={formData.status || "active"}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="restricted">Restricted Access</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="inactive">Inactive</option>
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
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="equipmentCount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Equipment Count
                </label>
                <input
                  type="number"
                  id="equipmentCount"
                  name="equipmentCount"
                  value={formData.equipmentCount || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Update Location
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation(null);
                  resetForm();
                  setCurrentView(LocationView.LIST);
                }}
                className="ml-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Location Confirmation */}
      {currentView === LocationView.DELETE && selectedLocation && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-6">
            <button
              onClick={() => {
                setSelectedLocation(null);
                setCurrentView(LocationView.LIST);
              }}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Delete Location
            </h1>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-700">
              Are you sure you want to delete the location{" "}
              <strong>{selectedLocation.name}</strong>? This action cannot be
              undone.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDeleteLocation}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setSelectedLocation(null);
                setCurrentView(LocationView.LIST);
              }}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Location Detail View */}
      {currentView === LocationView.DETAIL && selectedLocation && (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => {
                setSelectedLocation(null);
                setCurrentView(LocationView.LIST);
              }}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedLocation.name}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Location Details</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Type:</span>
                    <p className="text-gray-800">{selectedLocation.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Building:</span>
                    <p className="text-gray-800">{selectedLocation.building}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Floor:</span>
                    <p className="text-gray-800">{selectedLocation.floor}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Room Number:</span>
                    <p className="text-gray-800">
                      {selectedLocation.roomNumber}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedLocation.status)}`}
                      >
                        {selectedLocation.statusText}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Additional Information
                </h2>
                <div className="space-y-3">
                  {selectedLocation.description && (
                    <div>
                      <span className="text-sm text-gray-500">
                        Description:
                      </span>
                      <p className="text-gray-800">
                        {selectedLocation.description}
                      </p>
                    </div>
                  )}
                  {selectedLocation.capacity !== undefined && (
                    <div>
                      <span className="text-sm text-gray-500">Capacity:</span>
                      <p className="text-gray-800">
                        {selectedLocation.capacity} people
                      </p>
                    </div>
                  )}
                  {selectedLocation.equipmentCount !== undefined && (
                    <div>
                      <span className="text-sm text-gray-500">
                        Equipment Count:
                      </span>
                      <p className="text-gray-800">
                        {selectedLocation.equipmentCount} items
                      </p>
                    </div>
                  )}
                  {selectedLocation.lastModified && (
                    <div>
                      <span className="text-sm text-gray-500">
                        Last Modified:
                      </span>
                      <p className="text-gray-800">
                        {selectedLocation.lastModified}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {(selectedLocation.contactPerson ||
                selectedLocation.contactEmail ||
                selectedLocation.contactPhone ||
                selectedLocation.accessRestrictions ||
                selectedLocation.notes) && (
                <div className="md:col-span-2">
                  <h2 className="text-lg font-semibold mb-4">
                    Contact & Access Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedLocation.contactPerson && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Contact Person:
                        </span>
                        <p className="text-gray-800">
                          {selectedLocation.contactPerson}
                        </p>
                      </div>
                    )}
                    {selectedLocation.contactEmail && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Contact Email:
                        </span>
                        <p className="text-gray-800">
                          {selectedLocation.contactEmail}
                        </p>
                      </div>
                    )}
                    {selectedLocation.contactPhone && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Contact Phone:
                        </span>
                        <p className="text-gray-800">
                          {selectedLocation.contactPhone}
                        </p>
                      </div>
                    )}
                    {selectedLocation.accessRestrictions && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Access Restrictions:
                        </span>
                        <p className="text-gray-800">
                          {selectedLocation.accessRestrictions}
                        </p>
                      </div>
                    )}
                    {selectedLocation.notes && (
                      <div className="md:col-span-2">
                        <span className="text-sm text-gray-500">Notes:</span>
                        <p className="text-gray-800">
                          {selectedLocation.notes}
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
              onClick={() => handleEditClick(selectedLocation)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(selectedLocation)}
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
