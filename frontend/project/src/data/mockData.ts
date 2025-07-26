import { TrafficData, EmergencyAlert, Incident, ParkingArea, TrafficLight } from '../types';

export const mockTrafficData: TrafficData[] = [
  {
    id: '1',
    location: 'Broadway & 42nd St',
    congestionLevel: 'high',
    vehicleCount: 245,
    averageSpeed: 8.5,
    timestamp: new Date(),
    coordinates: [40.7589, -73.9851]
  },
  {
    id: '2',
    location: 'Park Ave & 59th St',
    congestionLevel: 'medium',
    vehicleCount: 156,
    averageSpeed: 15.2,
    timestamp: new Date(),
    coordinates: [40.7614, -73.9776]
  },
  {
    id: '3',
    location: 'FDR Drive & Houston St',
    congestionLevel: 'low',
    vehicleCount: 78,
    averageSpeed: 35.8,
    timestamp: new Date(),
    coordinates: [40.7218, -73.9789]
  }
];

export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: 'em1',
    type: 'ambulance',
    priority: 'critical',
    origin: 'Mount Sinai Hospital',
    destination: 'Accident Site - 5th Ave & 34th St',
    route: [[40.7903, -73.9527], [40.7505, -73.9934]],
    eta: 8,
    status: 'active',
    timestamp: new Date(),
    contactInfo: 'Unit A-47'
  }
];

export const mockIncidents: Incident[] = [
  {
    id: 'inc1',
    type: 'accident',
    description: 'Multi-vehicle collision blocking two lanes',
    location: '5th Ave & 34th St',
    coordinates: [40.7505, -73.9934],
    severity: 'high',
    status: 'investigating',
    reportedBy: 'Traffic Observer',
    reportedAt: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 'inc2',
    type: 'pothole',
    description: 'Large pothole causing vehicle damage',
    location: 'Madison Ave & 23rd St',
    coordinates: [40.7414, -73.9883],
    severity: 'medium',
    status: 'reported',
    reportedBy: 'Citizen Report',
    reportedAt: new Date(Date.now() - 1000 * 60 * 120)
  }
];

export const mockParkingAreas: ParkingArea[] = [
  {
    id: 'park1',
    name: 'Central Park Parking',
    type: 'public',
    coordinates: [40.7711, -73.9741],
    totalSpaces: 150,
    availableSpaces: 23,
    hourlyRate: 4.50,
    operatingHours: '6:00 AM - 10:00 PM',
    amenities: ['24/7 Security', 'EV Charging', 'Covered']
  },
  {
    id: 'park2',
    name: 'Times Square Garage',
    type: 'private',
    coordinates: [40.7580, -73.9855],
    totalSpaces: 400,
    availableSpaces: 67,
    hourlyRate: 8.00,
    operatingHours: '24/7',
    amenities: ['Valet Service', 'Car Wash', 'EV Charging']
  }
];

export const mockTrafficLights: TrafficLight[] = [
  {
    id: 'tl1',
    location: 'Broadway & 42nd St',
    coordinates: [40.7589, -73.9851],
    currentPhase: 'red',
    timeRemaining: 45,
    suggestedChange: 'extend_green'
  },
  {
    id: 'tl2',
    location: 'Park Ave & 59th St',
    coordinates: [40.7614, -73.9776],
    currentPhase: 'green',
    timeRemaining: 30
  }
];