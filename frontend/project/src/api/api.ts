import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const getReports = () => axios.get(`${API_BASE}/reports/`);
export const postReport = (data: any) => axios.post(`${API_BASE}/reports/`, data);
export const getTrafficData = () => axios.get(`${API_BASE}/traffic/`);
export const getReportSummary = () => axios.get(`${API_BASE}/report-summary/`);
