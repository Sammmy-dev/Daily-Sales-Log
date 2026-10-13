import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const salesApi = {
  fetchAll: () => api.get('/sales'),
  create: (data: { item_name: string; amount: number; timestamp?: string }) =>
    api.post('/sales', data),
  seed: (count?: number) => api.post('/sales/seed', { count }),
  delete: (id: string) => api.delete(`/sales/${id}`),
  clearAll: () => api.delete('/sales'),
};