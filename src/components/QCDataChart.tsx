import React from 'react';
interface QCData {
  datasets: Array<{
    data: number[];
    label: string;
  }>;
  labels: string[];
  upperLimit: number;
  lowerLimit: number;
  maxValue: number;
  unit: string;
}
export function QCDataChart({
  data
}: {
  data?: QCData;
}) {
  // Return early if no data
  if (!data?.datasets?.[0]?.data) {
    return <div className="h-80 flex items-center justify-center text-gray-500">
        No QC data available
      </div>;
  }
  return <div>
      <div className="h-80 flex items-center justify-center">
        <div className="w-full h-full relative">
          {/* This is a simplified chart representation */}
          <div className="absolute inset-0 flex items-end">
            {data.datasets[0].data.map((value, index) => {
            const height = `${value / data.maxValue * 100}%`;
            const isOutOfRange = value > data.upperLimit || value < data.lowerLimit;
            return <div key={index} className="flex-1 flex flex-col items-center justify-end px-1">
                  <div className={`w-full ${isOutOfRange ? 'bg-red-400' : 'bg-blue-400'} rounded-t`} style={{
                height
              }}></div>
                  <div className="text-xs mt-1 text-gray-500">
                    {data.labels[index]}
                  </div>
                </div>;
          })}
          </div>
          {/* Upper and lower limits */}
          <div className="absolute w-full border-t-2 border-dashed border-red-400 flex items-center justify-end" style={{
          bottom: `${data.upperLimit / data.maxValue * 100}%`
        }}>
            <span className="text-xs text-red-500 pr-2">Upper Limit</span>
          </div>
          <div className="absolute w-full border-t-2 border-dashed border-red-400 flex items-center justify-end" style={{
          bottom: `${data.lowerLimit / data.maxValue * 100}%`
        }}>
            <span className="text-xs text-red-500 pr-2">Lower Limit</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-1"></div>
            <span className="text-xs text-gray-500">
              {data.datasets[0].label}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Acceptable Range: {data.lowerLimit} - {data.upperLimit} {data.unit}
        </div>
      </div>
    </div>;
}