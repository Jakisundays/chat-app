import axios from "axios";

export const URL = "http://localhost:8000";

export const authInstance = axios.create({
  baseURL: `${URL}/api/auth`,
});

// const jwt_token = localStorage.getItem("token");
// export const messageInstance = axios.create({
//   baseURL: `${URL}/api/message`,
//   headers: {
//     Authorization: `BEAR ${jwt_token}`,
//   },
// });