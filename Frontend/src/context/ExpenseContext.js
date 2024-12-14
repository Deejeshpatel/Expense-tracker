import React, { createContext, useReducer, useContext } from 'react';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  filters: {
    category: '',
    dateRange: { start: '', end: '' },
    paymentMethod: '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);
