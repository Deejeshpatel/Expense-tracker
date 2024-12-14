import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Fetch all expenses
export const getExpenses = async (filters) => {
  const { data } = await api.get('/expenses', { params: filters });
  return data;
};

// Add an expense
export const addExpense = async (expense) => {
  const { data } = await api.post('/expenses', expense);
  return data;
};

