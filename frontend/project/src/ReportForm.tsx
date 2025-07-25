import { useState } from "react";
import { postReport } from "../src/api/api"; 

const ReportForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [location, setLocation] = useState("");
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await postReport({ location, report_type: reportType, description, latitude, longitude });
      alert("Report submitted!");
      setLocation(""); setReportType(""); setDescription(""); setLatitude(""); setLongitude("");
      onSuccess(); // refresh report list
    } catch (err) {
      alert("Error submitting report.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report an Incident</h2>
      <input placeholder="Location name" value={location} onChange={e => setLocation(e.target.value)} required />
      <select value={reportType} onChange={e => setReportType(e.target.value)} required>
        <option value="">Select Type</option>
        <option value="Accident">Accident</option>
        <option value="Pothole">Pothole</option>
        <option value="Road Block">Road Block</option>
      </select>
      <textarea placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="number" step="any" placeholder="Latitude" value={latitude} onChange={e => setLatitude(e.target.value)} required />
      <input type="number" step="any" placeholder="Longitude" value={longitude} onChange={e => setLongitude(e.target.value)} required />
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;