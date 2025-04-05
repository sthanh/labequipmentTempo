import React, { useState, createElement } from 'react';
import { SearchIcon, FilterIcon, ChevronDownIcon, ArrowUpDownIcon, FlaskConicalIcon, MicroscopeIcon, ThermometerIcon, CpuIcon, ScissorsIcon, DropletIcon, PipetteIcon } from 'lucide-react';
const iconMap = {
  'flask-conical': FlaskConicalIcon,
  microscope: MicroscopeIcon,
  thermometer: ThermometerIcon,
  cpu: CpuIcon,
  scissors: ScissorsIcon,
  droplet: DropletIcon,
  pipette: PipetteIcon
};
export function EquipmentTable({
  equipmentData,
  onSelectEquipment
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const uniqueCategories = [...new Set(equipmentData.map(item => item.type))];
  const uniqueLocations = [...new Set(equipmentData.map(item => item.location))];
  const handleSort = field => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const filteredData = equipmentData.filter(item => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query) || item.location.toLowerCase().includes(query);
    }
    return true;
  }).filter(item => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  }).filter(item => {
    if (categoryFilter === 'all') return true;
    return item.type === categoryFilter;
  }).filter(item => {
    if (locationFilter === 'all') return true;
    return item.location === locationFilter;
  }).sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  const getStatusColor = status => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'attention':
        return 'bg-orange-100 text-orange-800';
      case 'out-of-service':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Equipment List
          </h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <input type="text" placeholder="Search equipment..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="py-2 pl-9 pr-3 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="appearance-none py-2 pl-3 pr-8 min-w-[140px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All Categories</option>
                  {uniqueCategories.map(category => <option key={category} value={category}>
                      {category}
                    </option>)}
                </select>
                <FilterIcon className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
              <div className="relative">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="appearance-none py-2 pl-3 pr-8 min-w-[140px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All Status</option>
                  <option value="operational">Operational</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="attention">Needs Attention</option>
                  <option value="out-of-service">Out of Service</option>
                </select>
                <FilterIcon className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
              <div className="relative">
                <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="appearance-none py-2 pl-3 pr-8 min-w-[140px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All Locations</option>
                  {uniqueLocations.map(location => <option key={location} value={location}>
                      {location}
                    </option>)}
                </select>
                <FilterIcon className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  Equipment Name
                  <ArrowUpDownIcon size={14} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('id')}>
                <div className="flex items-center">
                  ID
                  <ArrowUpDownIcon size={14} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center">
                  Status
                  <ArrowUpDownIcon size={14} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('location')}>
                <div className="flex items-center">
                  Location
                  <ArrowUpDownIcon size={14} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('lastRun')}>
                <div className="flex items-center">
                  Last Run
                  <ArrowUpDownIcon size={14} className="ml-1" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map(item => <tr key={item.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onSelectEquipment(item)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center">
                      {createElement(iconMap[item.icon], {
                    size: 20,
                    className: 'text-blue-500'
                  })}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">{item.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.statusText}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.lastRun}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{filteredData.length}</span> of{' '}
            <span className="font-medium">{equipmentData.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>;
}