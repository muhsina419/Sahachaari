export interface TrafficData {
  id: string;
  location: string;
  congestionLevel: 'low' | 'medium' | 'high';
  vehicleCount: number;
  averageSpeed: number;
  timestamp: Date;
  coordinates: [number, number];
}

export interface EmergencyAlert {
  id: string;
  type: 'ambulance' | 'fire' | 'police';
  priority: 'high' | 'critical';
  origin: string;
  destination: string;
  route: [number, number][];
  eta: number;
  status: 'active' | 'completed' | 'cancelled';
  timestamp: Date;
  contactInfo: string;
}

export interface Incident {
  id: string;
  type: 'accident' | 'pothole' | 'traffic_jam' | 'road_closure';
  description: string;
  location: string;
  coordinates: [number, number];
  severity: 'low' | 'medium' | 'high';
  status: 'reported' | 'investigating' | 'resolved';
  reportedBy: string;
  reportedAt: Date;
  images?: string[];
}

export interface ParkingArea {
  id: string;
  name: string;
  type: 'public' | 'private';
  coordinates: [number, number];
  totalSpaces: number;
  availableSpaces: number;
  hourlyRate?: number;
  operatingHours: string;
  amenities: string[];
}

export interface TrafficLight {
  id: string;
  location: string;
  coordinates: [number, number];
  currentPhase: 'red' | 'yellow' | 'green';
  timeRemaining: number;
  suggestedChange?: 'extend_green' | 'change_to_red' | 'optimize_timing';
}