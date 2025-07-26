import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Dashboard from './page/Dashboard';
import Emergency from './page/Emergency';
import ReportIncident from './page/ReportIncident';
import Parking from './page/Parking';
import Admin from './page/Admin';
import HomePage from './page/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/report" element={<ReportIncident />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;