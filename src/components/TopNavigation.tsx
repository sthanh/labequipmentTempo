import React from "react";
import {
  LayoutDashboardIcon,
  FlaskConicalIcon,
  BarChart3Icon,
  CalendarIcon,
  MapPinIcon,
  WrenchIcon,
  SearchIcon,
} from "lucide-react";

export function TopNavigation({ currentView, onNavigate }) {
  // Default values for props
  currentView = currentView ?? "dashboard";
  onNavigate = onNavigate ?? ((view) => console.log(`Navigate to ${view}`));

  const navItems = [
    {
      icon: <LayoutDashboardIcon size={18} />,
      label: "Dashboard",
      id: "dashboard",
      active: currentView === "dashboard",
    },
    {
      icon: <FlaskConicalIcon size={18} />,
      label: "Equipment",
      id: "equipment",
      active: currentView === "equipment",
    },
    {
      icon: <WrenchIcon size={18} />,
      label: "Service Requests",
      id: "servicerequests",
      active: currentView === "servicerequests",
    },
    {
      icon: <MapPinIcon size={18} />,
      label: "Locations",
      id: "locations",
      active: currentView === "locations",
    },
    {
      icon: <BarChart3Icon size={18} />,
      label: "QC Data",
      id: "qcdata",
      active: currentView === "qcdata",
    },
    {
      icon: <CalendarIcon size={18} />,
      label: "Run History",
      id: "runhistory",
      active: currentView === "runhistory",
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-2 px-4">
      <div className="flex items-center space-x-1 md:space-x-2">
        <div className="flex items-center mr-4">
          <FlaskConicalIcon className="text-blue-600 mr-2" size={20} />
          <h1 className="text-lg font-bold text-blue-600 hidden md:block">
            LabManager
          </h1>
        </div>

        <div className="flex-1 flex items-center overflow-x-auto hide-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id || item.label}
              onClick={() => item.id && onNavigate(item.id)}
              className={`flex items-center px-2 md:px-3 py-2 text-sm rounded-md whitespace-nowrap
                ${
                  item.active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <span className="inline-flex mr-1">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="relative ml-2 hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="py-1.5 pl-8 pr-4 w-40 lg:w-64 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <SearchIcon
            className="absolute left-2.5 top-2 text-gray-400"
            size={16}
          />
        </div>
      </div>
    </div>
  );
}
