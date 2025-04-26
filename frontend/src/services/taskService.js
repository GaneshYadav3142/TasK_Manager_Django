import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000/api';

//Get all tasks for a specific username
export const getTasks = (username) => {
  return axios.get(`${API_BASE_URL}/tasks/`, { params: { username } });
};

// Create a new task
export const createTask = (taskData) => {
  return axios.post(`${API_BASE_URL}/tasks/`, taskData);
};

// Update an existing task
export const updateTask = (id, taskData) => {
  return axios.put(`${API_BASE_URL}/tasks/${id}/`, taskData);
};

// Delete a task
export const deleteTask = (id) => {
  return axios.delete(`${API_BASE_URL}/tasks/${id}/`);
};

//Export all tasks for a user into Excel
export const exportTasks = (username) => {
  return axios.get(`${API_BASE_URL}/tasks/export/`, {
    params: { username },
    responseType: 'blob', // Important for file download
  });
};
