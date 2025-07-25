// import { Outlet } from "react-router"
// import { useState } from "react"


// function App() {
// const [count,setCount] = useState(1)

// const increment = ()=>{
//   setCount(count+1)
// }

//   return (
//     <div className="flex items-center justify-center flex-col h-screen w-screen">
//     <div className="">Header</div>
//     <Outlet/>
//     <div className="">Footer</div>
//     </div>
//   )
// }

// export default App


import { useEffect, useState } from "react";
import { getReports } from "./api/api"; 
import MapView from "./components/Mapview";
import ReportForm from "./Reportform";

function App() {
  const [reports, setReports] = useState([]);

  const loadReports = () => {
    getReports().then(res => setReports(res.data));
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
}

export default App;