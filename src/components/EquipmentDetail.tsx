import React, { useState } from 'react';
import { QCDataChart } from './QCDataChart';
import { RunsHistory } from './RunsHistory';
import { StatisticsChart } from './StatisticsChart';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon, HistoryIcon, LineChartIcon, FileTextIcon, EditIcon } from 'lucide-react';
export function EquipmentDetail({
  equipment,
  onBack
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [{
    id: 'overview',
    label: 'Overview',
    icon: <CheckCircleIcon size={16} />
  }, {
    id: 'qcdata',
    label: 'QC Data',
    icon: <LineChartIcon size={16} />
  }, {
    id: 'runs',
    label: 'Previous Runs',
    icon: <HistoryIcon size={16} />
  }, {
    id: 'documents',
    label: 'Documents',
    icon: <FileTextIcon size={16} />
  }];
  return <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-1 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {equipment.name}
            </h2>
            <p className="text-sm text-gray-500">ID: {equipment.id}</p>
          </div>
        </div>
        <button className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
          <EditIcon size={16} className="mr-1" />
          Edit
        </button>
      </div>
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>)}
        </nav>
      </div>
      <div className="p-6">
        {activeTab === 'overview' && <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-2 flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${equipment.status === 'operational' ? 'bg-green-500' : equipment.status === 'maintenance' ? 'bg-yellow-500' : equipment.status === 'attention' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                  <span className="text-lg font-medium">
                    {equipment.statusText}
                  </span>
                </div>
                {equipment.statusNote && <p className="mt-1 text-sm text-gray-500">
                    {equipment.statusNote}
                  </p>}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <div className="mt-2 flex items-center">
                  <MapPinIcon size={18} className="text-gray-400 mr-2" />
                  <span className="text-lg font-medium">
                    {equipment.location}
                  </span>
                </div>
                {equipment.locationDetail && <p className="mt-1 text-sm text-gray-500">
                    {equipment.locationDetail}
                  </p>}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">
                  Last Activity
                </h3>
                <div className="mt-2 flex items-center">
                  <CalendarIcon size={18} className="text-gray-400 mr-2" />
                  <span className="text-lg font-medium">
                    {equipment.lastRun}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Run by {equipment.lastOperator}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Equipment Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Type:</span>
                    <span className="text-sm font-medium">
                      {equipment.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Model:</span>
                    <span className="text-sm font-medium">
                      {equipment.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Serial Number:
                    </span>
                    <span className="text-sm font-medium">
                      {equipment.serialNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Manufacturer:</span>
                    <span className="text-sm font-medium">
                      {equipment.manufacturer}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Installation Date:
                    </span>
                    <span className="text-sm font-medium">
                      {equipment.installDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Last Calibration:
                    </span>
                    <span className="text-sm font-medium">
                      {equipment.lastCalibration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Usage Statistics
                </h3>
                <StatisticsChart data={equipment.usageStats} />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Maintenance Schedule
              </h3>
              <div className="space-y-3">
                {equipment.maintenanceSchedule.map((item, index) => <div key={index} className="flex items-start p-3 bg-white rounded-md border border-gray-200">
                    <div className={`p-2 rounded-full mr-3 ${item.status === 'completed' ? 'bg-green-100' : item.status === 'upcoming' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                      {item.status === 'completed' ? <CheckCircleIcon size={18} className="text-green-600" /> : <ClockIcon size={18} className={item.status === 'upcoming' ? 'text-blue-600' : 'text-yellow-600'} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.date}</p>
                      {item.note && <p className="text-xs text-gray-500 mt-1">
                          {item.note}
                        </p>}
                    </div>
                    {item.status !== 'completed' && <button className="text-xs text-blue-600 hover:text-blue-800">
                        {item.status === 'upcoming' ? 'Schedule' : 'Complete'}
                      </button>}
                  </div>)}
              </div>
            </div>
          </div>}
        {activeTab === 'qcdata' && <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-medium">Quality Control Data</h3>
              <div className="flex gap-2">
                <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 90 Days</option>
                  <option>Custom Range</option>
                </select>
                <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>All Parameters</option>
                  <option>Temperature</option>
                  <option>Pressure</option>
                  <option>Calibration</option>
                </select>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <QCDataChart data={equipment.qcData} />
            </div>
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-medium">QC Log</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parameter
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Operator
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {equipment.qcLog.map((log, index) => <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.parameter}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'pass' ? 'bg-green-100 text-green-800' : log.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {log.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.operator}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}
        {activeTab === 'runs' && <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-medium">Previous Runs</h3>
              <div className="flex gap-2">
                <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>All Runs</option>
                  <option>Completed</option>
                  <option>Failed</option>
                  <option>Aborted</option>
                </select>
                <input type="text" placeholder="Search by ID or operator..." className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
            <RunsHistory runs={equipment.previousRuns} />
          </div>}
        {activeTab === 'documents' && <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Equipment Documents</h3>
              <button className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                <EditIcon size={16} className="mr-1" />
                Upload Document
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added By
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {equipment.documents.map((doc, index) => <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                              <FileTextIcon size={16} className="text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {doc.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.addedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">
                            View
                          </a>
                          <a href="#" className="text-blue-600 hover:text-blue-900">
                            Download
                          </a>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}