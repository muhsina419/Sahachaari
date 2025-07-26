import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import { TrafficData, EmergencyAlert, Incident, ParkingArea } from '../types';
import StatusBadge from './Common/StatusBadge';
import L from 'leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'


interface TrafficMapProps {
  trafficData?: TrafficData[];
  emergencyAlerts?: EmergencyAlert[];
  incidents?: Incident[];
  parkingAreas?: ParkingArea[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showRadius?: boolean; // optional prop to toggle the circle radius
  radiusInMeters?: number;
}

// Fix for default markers in React-Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TrafficMap: React.FC<TrafficMapProps> = ({
  trafficData = [],
  emergencyAlerts = [],
  incidents = [],
  parkingAreas = [],
  center = [10.998779, 75.991737],
  zoom = 14,
  height = '500px',
  showRadius = true,
  radiusInMeters = 4000
}) => {
  const maxBounds = useMemo(() => {
    return L.latLng(center[0], center[1]).toBounds(radiusInMeters);
  }, [center, radiusInMeters]);

  const createCustomIcon = (color: string) =>
    new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24" height="24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `)}`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24]
    });

  const trafficIcon = createCustomIcon('#3B82F6');
  const emergencyIcon = createCustomIcon('#EF4444');
  const incidentIcon = createCustomIcon('#F59E0B');
  const parkingIcon = createCustomIcon('#10B981');

  return (
    <div style={{ height }} className="w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0}
        minZoom={13}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Optional: Circle to visualize the allowed area */}
        {showRadius && <Circle center={center} radius={radiusInMeters} color="blue" fillOpacity={0.1} />}

        {/* Traffic Data Markers */}
        {trafficData.map((traffic) => (
          <Marker key={traffic.id} position={traffic.coordinates} icon={trafficIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{traffic.location}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Congestion:</span>
                    <StatusBadge status={traffic.congestionLevel} variant="traffic" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Vehicles:</span>
                    <span className="text-sm font-medium">{traffic.vehicleCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Speed:</span>
                    <span className="text-sm font-medium">{traffic.averageSpeed} mph</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Emergency Alert Routes */}
        {emergencyAlerts.map((alert) => (
          <React.Fragment key={alert.id}>
            <Polyline
              positions={alert.route}
              pathOptions={{
                color: '#EF4444',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10'
              }}
            />
            <Marker position={alert.route[0]} icon={emergencyIcon}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-red-700 capitalize">
                    {alert.type} Emergency
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><strong>From:</strong> {alert.origin}</p>
                    <p className="text-sm"><strong>To:</strong> {alert.destination}</p>
                    <p className="text-sm"><strong>ETA:</strong> {alert.eta} minutes</p>
                    <StatusBadge status={alert.status} variant="emergency" />
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {/* Incident Markers */}
        {incidents.map((incident) => (
          <Marker key={incident.id} position={incident.coordinates} icon={incidentIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900 capitalize">
                  {incident.type.replace('_', ' ')}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">{incident.description}</p>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Severity:</span>
                    <StatusBadge status={incident.severity} variant="traffic" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <StatusBadge status={incident.status} variant="incident" />
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Parking Area Markers */}
        {parkingAreas.map((parking) => (
          <Marker key={parking.id} position={parking.coordinates} icon={parkingIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{parking.name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <span className="text-sm font-medium capitalize">{parking.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Available:</span>
                    <span className="text-sm font-medium">
                      {parking.availableSpaces} / {parking.totalSpaces}
                    </span>
                  </div>
                  {parking.hourlyRate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rate:</span>
                      <span className="text-sm font-medium">${parking.hourlyRate}/hr</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{parking.operatingHours}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrafficMap;
