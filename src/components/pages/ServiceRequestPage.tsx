import React, { useState } from 'react';
import { AlertCircleIcon, CheckCircleIcon, ClockIcon, SearchIcon, FilterIcon, PlusIcon } from 'lucide-react';
export function ServiceRequestPage() {
  const [activeTab, setActiveTab] = useState('active');
  const mockRequests = [{
    id: 'SR-001',
    equipment: 'Mass Spectrometer',
    issue: 'Calibration error',
    priority: 'high',
    status: 'pending',
    requestedBy: 'Jane Smith',
    requestDate: '2023-10-15',
    assignedTo: 'Tech Support'
  }, {
    id: 'SR-002',
    equipment: 'HPLC System',
    issue: 'Pressure fluctuation',
    priority: 'medium',
    status: 'in-progress',
    requestedBy: 'John Doe',
    requestDate: '2023-10-14',
    assignedTo: 'Service Team'
  }, {
    id: 'SR-003',
    equipment: 'Thermal Cycler',
    issue: 'Temperature control issue',
    priority: 'low',
    status: 'resolved',
    requestedBy: 'Sarah Johnson',
    requestDate: '2023-10-13',
    assignedTo: 'Maintenance'
  }];
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'pending':
        return <ClockIcon size={16} className="text-yellow-500" />;
      case 'in-progress':
        return <AlertCircleIcon size={16} className="text-blue-500" />;
      case 'resolved':
        return <CheckCircleIcon size={16} className="text-green-500" />;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Service Requests</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track equipment service requests
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <PlusIcon size={16} className="mr-2" />
          New Request
        </button>
      </div>
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 max-w-md relative">
            <input type="text" placeholder="Search requests..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>All Equipment</option>
              <option>Mass Spectrometer</option>
              <option>HPLC System</option>
              <option>Thermal Cycler</option>
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
          <button onClick={() => setActiveTab('active')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'active' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Active Requests
          </button>
          <button onClick={() => setActiveTab('resolved')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'resolved' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Resolved
          </button>
        </nav>
      </div>
      {/* Requests List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {mockRequests.filter(request => activeTab === 'active' ? request.status !== 'resolved' : request.status === 'resolved').map(request => <li key={request.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 gap-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(request.status)}
                    </div>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold text-gray-900">
                        {request.equipment}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {request.issue}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm text-gray-900">
                        {request.requestedBy}
                      </p>
                      <p className="text-sm text-gray-500">
                        {request.requestDate}
                      </p>
                    </div>
                  </div>
                </div>
              </li>)}
        </ul>
      </div>
    </div>;
}