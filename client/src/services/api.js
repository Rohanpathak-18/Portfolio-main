import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

export const getProjects = async () => (await api.get('/projects')).data;
export const sendContactMessage = async (payload) =>
  (await api.post('/contact', payload)).data;
