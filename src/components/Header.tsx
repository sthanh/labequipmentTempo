import React from "react";
import { BellIcon, UserIcon, SettingsIcon } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-end px-4 py-2">
        <div className="flex items-center space-x-3">
          <button className="p-1 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none">
            <SettingsIcon size={20} />
          </button>
          <button className="p-1 text-gray-600 rounded-full hover:bg-gray-100 relative">
            <BellIcon size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <UserIcon size={18} className="text-blue-600" />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
              Lab Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
