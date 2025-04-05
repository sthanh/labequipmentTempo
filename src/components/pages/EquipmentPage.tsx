import React, { useState } from 'react';
import { GridIcon, ListIcon, FilterIcon, SlidersIcon, PlusIcon, DownloadIcon, SearchIcon } from 'lucide-react';
export function EquipmentPage({
  equipmentData,
  onSelectEquipment
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    location: 'all'
  });
  const statusCounts = equipmentData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  const getStatusColor = status => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'attention':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'out-of-service':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getStatusLabel = status => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'maintenance':
        return 'Under Maintenance';
      case 'attention':
        return 'Needs Attention';
      case 'out-of-service':
        return 'Out of Service';
      default:
        return status;
    }
  };
  const filteredEquipment = equipmentData.filter(item => {
    const matchesSearch = searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesStatus = filters.status === 'all' ? true : item.status === filters.status;
    const matchesType = filters.type === 'all' ? true : item.type === filters.type;
    const matchesLocation = filters.location === 'all' ? true : item.location === filters.location;
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Equipment</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your lab equipment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <DownloadIcon size={16} className="mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <PlusIcon size={16} className="mr-2" />
            Add Equipment
          </button>
        </div>
      </div>
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => <button key={status} onClick={() => setFilters({
        ...filters,
        status
      })} className={`p-4 rounded-lg border ${getStatusColor(status)} hover:opacity-90 transition-opacity`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{getStatusLabel(status)}</span>
              <span className="text-2xl font-bold">{count}</span>
            </div>
          </button>)}
      </div>
      {/* Filters and View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input type="text" placeholder="Search equipment..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
            <GridIcon size={20} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
            <ListIcon size={20} />
          </button>
        </div>
      </div>
      {/* Equipment Grid/List */}
      {viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEquipment.map(equipment => <div key={equipment.id} onClick={() => onSelectEquipment(equipment)} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      {equipment.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {equipment.name}
                      </h3>
                      <p className="text-sm text-gray-500">{equipment.id}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                    {equipment.statusText}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="mt-1 text-sm font-medium">
                      {equipment.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Run</p>
                    <p className="mt-1 text-sm font-medium">
                      {equipment.lastRun}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="mt-1 text-sm font-medium">{equipment.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Model</p>
                    <p className="mt-1 text-sm font-medium">
                      {equipment.model}
                    </p>
                  </div>
                </div>
              </div>
            </div>)}
        </div> : <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Run
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipment.map(equipment => <tr key={equipment.id} onClick={() => onSelectEquipment(equipment)} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        {equipment.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {equipment.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {equipment.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                      {equipment.statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.lastRun}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.type}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
    </div>;
}