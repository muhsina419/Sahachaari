import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ reports }: any) => (
  <MapContainer center={[10.99, 76.0]} zoom={13} style={{ height: "500px" }}>
    <TileLayer
      attribution='&copy; OpenStreetMap'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {reports.map((r: any, i: number) => (
      <Marker key={i} position={[r.latitude, r.longitude]}>
        <Popup>{r.report_type}</Popup>
      </Marker>
    ))}
  </MapContainer>
);
export default MapView;