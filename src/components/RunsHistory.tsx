import React from 'react';
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon, ChevronRightIcon } from 'lucide-react';
export function RunsHistory({
  runs
}) {
  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon size={16} className="text-green-500" />;
      case 'failed':
        return <XCircleIcon size={16} className="text-red-500" />;
      case 'aborted':
        return <AlertCircleIcon size={16} className="text-orange-500" />;
      default:
        return null;
    }
  };
  return <div className="bg-white rounded-lg border border-gray-200">
      <ul className="divide-y divide-gray-200">
        {runs.map((run, index) => <li key={index}>
            <div className="px-6 py-4 flex items-center hover:bg-gray-50 cursor-pointer">
              <div className="min-w-0 flex-1 flex items-center">
                <div className="flex-shrink-0">{getStatusIcon(run.status)}</div>
                <div className="min-w-0 flex-1 px-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {run.protocol}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${run.status === 'completed' ? 'bg-green-100 text-green-800' : run.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                        {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex">
                      <p className="text-sm text-gray-500">Run ID: {run.id}</p>
                      <span className="mx-1 text-gray-500">•</span>
                      <p className="text-sm text-gray-500">
                        Operator: {run.operator}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{run.date}</p>
                  </div>
                </div>
              </div>
              <div className="ml-5 flex-shrink-0">
                <ChevronRightIcon size={20} className="text-gray-400" />
              </div>
            </div>
          </li>)}
      </ul>
      <div className="px-6 py-3 border-t border-gray-200 flex justify-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Runs
        </button>
      </div>
    </div>;
}