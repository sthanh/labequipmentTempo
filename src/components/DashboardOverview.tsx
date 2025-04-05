import React from 'react';
import { CheckCircleIcon, AlertCircleIcon, XCircleIcon, ClockIcon, BarChart3Icon, CalendarIcon, BellIcon, ActivityIcon, ArrowUpIcon, ArrowDownIcon, AlertTriangleIcon, TimerIcon, UsersIcon } from 'lucide-react';
export function DashboardOverview() {
  const stats = [{
    title: 'Operational',
    value: 42,
    change: '+2',
    trend: 'up',
    icon: <CheckCircleIcon size={24} className="text-green-500" />,
    color: 'bg-green-50 text-green-600',
    percentage: '84%'
  }, {
    title: 'Under Maintenance',
    value: 7,
    change: '-1',
    trend: 'down',
    icon: <ClockIcon size={24} className="text-yellow-500" />,
    color: 'bg-yellow-50 text-yellow-600',
    percentage: '14%'
  }, {
    title: 'Needs Attention',
    value: 3,
    change: '+1',
    trend: 'up',
    icon: <AlertCircleIcon size={24} className="text-orange-500" />,
    color: 'bg-orange-50 text-orange-600',
    percentage: '6%'
  }, {
    title: 'Out of Service',
    value: 2,
    change: '0',
    trend: 'neutral',
    icon: <XCircleIcon size={24} className="text-red-500" />,
    color: 'bg-red-50 text-red-600',
    percentage: '4%'
  }];
  const criticalAlerts = [{
    equipment: 'Mass Spectrometer',
    issue: 'Calibration due',
    priority: 'high',
    time: '2h ago'
  }, {
    equipment: 'Thermal Cycler',
    issue: 'Temperature deviation',
    priority: 'medium',
    time: '4h ago'
  }, {
    equipment: 'HPLC System',
    issue: 'Pressure warning',
    priority: 'low',
    time: '6h ago'
  }];
  const upcomingMaintenance = [{
    equipment: 'Confocal Microscope',
    task: 'Annual service',
    date: 'Tomorrow',
    technician: 'John Smith'
  }, {
    equipment: 'Ultracentrifuge',
    task: 'Filter replacement',
    date: 'In 3 days',
    technician: 'Sarah Johnson'
  }];
  const performanceMetrics = [{
    metric: 'Average Uptime',
    value: '97.8%',
    trend: 'up',
    change: '+0.6%'
  }, {
    metric: 'Utilization Rate',
    value: '76.2%',
    trend: 'up',
    change: '+2.1%'
  }, {
    metric: 'Response Time',
    value: '2.4h',
    trend: 'down',
    change: '-0.3h'
  }];
  return <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Equipment Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time overview of your lab equipment status and performance
          </p>
        </div>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Locations</option>
            <option>Main Lab</option>
            <option>Research Wing</option>
            <option>Clinical Lab</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${stat.color}`}>
                {stat.trend === 'up' ? <ArrowUpIcon size={12} className="mr-1" /> : stat.trend === 'down' ? <ArrowDownIcon size={12} className="mr-1" /> : null}
                {stat.change} from last month
              </div>
              <span className="text-sm font-medium text-gray-500">
                {stat.percentage}
              </span>
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {performanceMetrics.map((metric, index) => <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {metric.metric}
              </p>
              <ActivityIcon size={20} className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold mt-2">{metric.value}</p>
            <div className="mt-2 flex items-center">
              {metric.trend === 'up' ? <ArrowUpIcon size={14} className="text-green-500 mr-1" /> : <ArrowDownIcon size={14} className="text-red-500 mr-1" />}
              <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Critical Alerts
              </h2>
              <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full">
                {criticalAlerts.length} active
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {criticalAlerts.map((alert, index) => <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${alert.priority === 'high' ? 'bg-red-100' : alert.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    <AlertTriangleIcon size={16} className={`${alert.priority === 'high' ? 'text-red-600' : alert.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.equipment}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{alert.issue}</p>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>)}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all alerts
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Upcoming Maintenance
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Schedule New
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingMaintenance.map((task, index) => <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-50">
                    <div size={16} className="text-blue-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {task.equipment}
                      </p>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {task.date}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{task.task}</p>
                    <div className="mt-2 flex items-center">
                      <UsersIcon size={12} className="text-gray-400" />
                      <span className="ml-1 text-xs text-gray-500">
                        {task.technician}
                      </span>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View full schedule
            </button>
          </div>
        </div>
      </div>
    </div>;
}