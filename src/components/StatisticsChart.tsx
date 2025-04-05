import React from 'react';
interface StatData {
  label: string;
  value: number;
}
export function StatisticsChart({
  data
}: {
  data?: StatData[];
}) {
  // Return early if no data
  if (!data?.length) {
    return <div className="h-60 flex items-center justify-center text-gray-500">
        No statistics data available
      </div>;
  }
  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(item => item.value)) * 1.2;
  return <div className="h-60">
      <div className="w-full h-full relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between">
          <span className="text-xs text-gray-500">{maxValue.toFixed(0)}</span>
          <span className="text-xs text-gray-500">
            {(maxValue / 2).toFixed(0)}
          </span>
          <span className="text-xs text-gray-500">0</span>
        </div>
        {/* Chart area */}
        <div className="absolute left-8 right-0 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gray-200"></div>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-200"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>
          {/* Bars */}
          <div className="absolute left-0 right-0 top-0 bottom-0 flex items-end justify-around">
            {data.map((item, index) => {
            const height = `${item.value / maxValue * 100}%`;
            return <div key={index} className="flex flex-col items-center w-8">
                  <div className="w-6 bg-blue-500 rounded-t transition-all duration-500 ease-in-out" style={{
                height
              }}></div>
                  <span className="text-xs text-gray-500 mt-1">
                    {item.label}
                  </span>
                </div>;
          })}
          </div>
        </div>
      </div>
    </div>;
}