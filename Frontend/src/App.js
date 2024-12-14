import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import Charts from "./components/Charts";
import "./App.css"; 
import ExpenseList from "./components/ExpenseList";

const App = () => {
  return (
    <>
      <div className="app">

        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add-expense" element={<ExpenseForm />} />
          <Route path="/Charts" element={<Charts />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
