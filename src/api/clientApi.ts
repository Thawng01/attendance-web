import axios from "axios";

// export const baseURL = "https://attendance-api-xewv.onrender.com/api"
// const baseURL = "http://localhost:9000/api";
export const baseURL = "https://attendanceapi.aridient.com/api";

export const clientApi = axios.create({
  baseURL,
});
