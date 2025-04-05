import React from "react";
import {
  LayoutDashboardIcon,
  FlaskConicalIcon,
  BarChart3Icon,
  CalendarIcon,
  MapPinIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
} from "lucide-react";

export function Sidebar({ isOpen, currentView, onNavigate }) {
  // Default values for props
  isOpen = isOpen ?? true;
  currentView = currentView ?? "dashboard";
  onNavigate = onNavigate ?? ((view) => console.log(`Navigate to ${view}`));
  const navItems = [
    {
      icon: <LayoutDashboardIcon size={20} />,
      label: "Dashboard",
      id: "dashboard",
      active: currentView === "dashboard",
    },
    {
      icon: <FlaskConicalIcon size={20} />,
      label: "Equipment",
      id: "equipment",
      active: currentView === "equipment",
    },
    {
      icon: <MapPinIcon size={20} />,
      label: "Locations",
      id: "locations",
      active: currentView === "locations",
    },
    {
      icon: <BarChart3Icon size={20} />,
      label: "QC Data",
      id: "qcdata",
    },
    {
      icon: <CalendarIcon size={20} />,
      label: "Run History",
      id: "runhistory",
    },
    {
      icon: <SettingsIcon size={20} />,
      label: "Settings",
      id: "settings",
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? "w-64" : "w-0 md:w-16"} overflow-hidden`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          {isOpen ? (
            <h1 className="text-xl font-bold text-blue-600">LabManager</h1>
          ) : (
            <FlaskConicalIcon className="text-blue-600" size={24} />
          )}
        </div>
        <nav className="flex-1 pt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.id || item.label}>
                <button
                  onClick={() => item.id && onNavigate(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${item.active ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : ""}`}
                >
                  <span className="inline-flex">{item.icon}</span>
                  {isOpen && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <ul>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <HelpCircleIcon size={20} />
                {isOpen && <span className="ml-3">Help</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <LogOutIcon size={20} />
                {isOpen && <span className="ml-3">Logout</span>}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
