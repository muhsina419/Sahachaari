// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { getReports } from "../api/api";
import MapView from "../components/Mapview";
import ReportForm from "../Reportform";

const HomePage = () => {
  const [reports, setReports] = useState([]);

  const loadReports = () => {
    getReports().then((res) => setReports(res.data));
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div>
      <h1>Smart Traffic Monitor</h1>
      <ReportForm onSuccess={loadReports} />
      <MapView reports={reports} />
    </div>
  );
};

export default HomePage;
