import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrafficCone as Traffic, Bell, Settings, User } from 'lucide-react';
import clsx from 'clsx';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Traffic className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
               Sahachaari
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={clsx(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/emergency"
              className={clsx(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive('/emergency') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              )}
            >
              Emergency
            </Link>
            <Link
              to="/report"
              className={clsx(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive('/report') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              )}
            >
              Report Incident
            </Link>
            <Link
              to="/parking"
              className={clsx(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive('/parking') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              )}
            >
              Parking
            </Link>
            <Link
              to="/admin"
              className={clsx(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive('/admin') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              )}
            >
              Admin
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                3
              </span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;