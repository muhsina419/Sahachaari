import React, { useState } from 'react';
import { MapPin, Car, Clock, DollarSign, Zap, Shield, Search } from 'lucide-react';
import TrafficMap from '../components/MapView';
import { mockParkingAreas } from '../data/mockData';

const Parking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredParking = mockParkingAreas.filter(parking => {
    const matchesSearch = parking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parking.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || parking.type === filterType;
    return matchesSearch && matchesType;
  });

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityBg = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'bg-green-100';
    if (percentage > 20) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Public Parking Areas</h1>
          <p className="text-gray-600 mt-2">Find available parking spaces in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters and Search */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter</h3>
              
              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Parking
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or amenities"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parking Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            {/* Parking List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Parking ({filteredParking.length})
              </h3>
              
              <div className="space-y-4">
                {filteredParking.map((parking) => (
                  <div key={parking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{parking.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{parking.type} parking</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityBg(parking.availableSpaces, parking.totalSpaces)} ${getAvailabilityColor(parking.availableSpaces, parking.totalSpaces)}`}>
                        {parking.availableSpaces} available
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4" />
                        <span>{parking.availableSpaces} / {parking.totalSpaces} spaces</span>
                      </div>
                      
                      {parking.hourlyRate && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>${parking.hourlyRate}/hour</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{parking.operatingHours}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {parking.amenities.map((amenity, index) => (
                        <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {amenity.includes('EV') && <Zap className="h-3 w-3" />}
                          {amenity.includes('Security') && <Shield className="h-3 w-3" />}
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>

                    {/* Get Directions Button */}
                    <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm">
                      Get Directions
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Parking Locations</h3>
              </div>
              <TrafficMap
                parkingAreas={filteredParking}
                height="600px"
                zoom={13}
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Spaces</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {mockParkingAreas.reduce((sum, p) => sum + p.totalSpaces, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Available Now</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {mockParkingAreas.reduce((sum, p) => sum + p.availableSpaces, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Avg Rate</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(mockParkingAreas.reduce((sum, p) => sum + (p.hourlyRate || 0), 0) / mockParkingAreas.length).toFixed(2)}/hr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parking;