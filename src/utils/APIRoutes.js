import axios from "axios";

export const URL = "https://chat-server-1wnq.onrender.com";
//Local
// export const URL = "http://localhost:8000";


export const authInstance = axios.create({
  baseURL: `${URL}/api/auth`,
});

// export const messageInstance = axios.create({
//   baseURL: `${URL}/api/message`,
// });
