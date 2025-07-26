// // src/pages/HomePage.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { getReports } from "../api/api";
// import MapView from "../components/Mapview";
// import ReportForm from "../Reportform";

// const HomePage = () => {
//   const [reports, setReports] = useState([]);
//   const [videoResult, setVideoResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const loadReports = () => {
//     getReports().then((res) => setReports(res.data));
//   };

//   useEffect(() => {
//     loadReports();
//   }, []);

//   const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("video", file);
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:8000/api/traffic-congestion/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setVideoResult(response.data);
//     } catch (error: any) {
//       setVideoResult({ error: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Smart Traffic Monitor</h1>
//       <ReportForm onSuccess={loadReports} />
//       <MapView reports={reports} />

//       <div style={{ marginTop: "20px" }}>
//         <h2>Test Traffic Congestion Detection</h2>
//         <input type="file" accept="video/mp4" onChange={handleVideoUpload} />
//         {loading && <p>Analyzing video...</p>}
//         {videoResult && (
//           <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
//             {JSON.stringify(videoResult, null, 2)}
//           </pre>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { getReports } from "../api/api";
import MapView from "../components/MapView";
import ReportForm from "../Reportform";

const HomePage = () => {
  const [reports, setReports] = useState([]);
  const [videoResult, setVideoResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadReports = () => {
    getReports().then((res) => setReports(res.data));
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    setLoading(true);
    setErrorMsg(null);
    setVideoResult(null);

    try {
      const response = await axios.post("http://localhost:8000/api/traffic-congestion/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setVideoResult(response.data);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <MapView reports={reports} />

      <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Test Traffic Congestion Detection</h2>
        <input type="file" accept="video/mp4" onChange={handleVideoUpload} />
        {loading && <p>Analyzing video...</p>}
        {errorMsg && <p style={{ color: "red" }}>Error: {errorMsg}</p>}
        {videoResult && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Result:</h3>
            <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
              {JSON.stringify(videoResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;