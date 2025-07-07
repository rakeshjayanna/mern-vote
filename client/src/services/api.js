import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // or use process.env.REACT_APP_API
});

// Add auth token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Polls
export const getAllPolls = async () => {
  const res = await API.get("/polls");
  return res.data.data;
};

export const getPollById = async (id) => {
  const res = await API.get(`/polls/${id}`);
  return res.data.data;
};

export const createPoll = async (data) => {
  const res = await API.post("/polls", data);
  return res.data.data;
};

export const editPoll = async (id, data) => {
  const res = await API.put(`/polls/${id}`, data);
  return res.data.data;
};

export const deletePollById = async (id) => {
  await API.delete(`/polls/${id}`);
};

export const voteOnPoll = async (id, data) => {
  const res = await API.post(`/polls/${id}/vote`, data); // `data` = { optionIndex: 0 }
  return res.data.data;
};


export const getSummary = () => API.get("/polls/summary");
