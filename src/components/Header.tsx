import React from 'react';
import { MenuIcon, BellIcon, SearchIcon, UserIcon } from 'lucide-react';
export function Header({
  onMenuClick
}) {
  return <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="p-1 mr-4 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none">
            <MenuIcon size={24} />
          </button>
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search equipment, locations..." className="py-2 pl-10 pr-4 w-64 lg:w-96 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-600 rounded-full hover:bg-gray-100 relative">
            <BellIcon size={24} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <UserIcon size={20} className="text-blue-600" />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
              Lab Admin
            </span>
          </div>
        </div>
      </div>
    </header>;
}