import React from 'react';
import { Car, AlertTriangle, MapPin, Clock } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import AIInsights from '../components/Dashboard/Allnsights';
import TrafficMap from '../components/MapView';
import { mockTrafficData, mockEmergencyAlerts, mockIncidents } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Traffic Control Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring and AI-powered traffic management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Traffic Points"
            value={mockTrafficData.length}
            change="+2 from last hour"
            changeType="increase"
            icon={MapPin}
            color="blue"
          />
          <StatsCard
            title="Emergency Alerts"
            value={mockEmergencyAlerts.length}
            change="1 critical"
            changeType="increase"
            icon={AlertTriangle}
            color="red"
          />
          <StatsCard
            title="Avg Response Time"
            value="6.2 min"
            change="-0.8 min from yesterday"
            changeType="decrease"
            icon={Clock}
            color="green"
          />
          <StatsCard
            title="Traffic Flow"
            value="87%"
            change="+5% improvement"
            changeType="increase"
            icon={Car}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Traffic Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Traffic Map</h3>
              <TrafficMap
                trafficData={mockTrafficData}
                emergencyAlerts={mockEmergencyAlerts}
                incidents={mockIncidents}
                height="500px"
              />
            </div>
          </div>

          {/* AI Insights */}
          <div className="space-y-6">
            <AIInsights />
            
            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                {mockEmergencyAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800 capitalize">
                        {alert.type} Emergency
                      </p>
                      <p className="text-xs text-red-600">{alert.destination}</p>
                      <p className="text-xs text-red-500">ETA: {alert.eta} minutes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Incidents</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {incident.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {incident.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        incident.severity === 'high' ? 'bg-red-100 text-red-800' :
                        incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                        incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(incident.reportedAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;