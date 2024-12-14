import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ExpenseCharts from "./Charts";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ffa07a;
  border-radius: 5px;
  width: ${({ wide }) => (wide ? "300px" : "150px")};
  font-size: 14px;

  &:focus {
    border-color: #f08080;
    outline: none;
    box-shadow: 0 0 5px #f08080;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #98fb98;
  border-radius: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ primary }) => (primary ? "#20b2aa" : "#f08080")};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#2e8b57" : "#cd5c5c")};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #ffefd5;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled(Button)`
  margin: 0 5px;
  padding: 8px 15px;
  font-size: 12px;
`;

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDescription, setSearchDescription] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const itemsPerPage = 5;

  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...expenses];
    if (searchDescription) {
      filtered = filtered.filter((expense) =>
        expense.description.toLowerCase().includes(searchDescription.toLowerCase())
      );
    }
    if (searchCategory) {
      filtered = filtered.filter((expense) =>
        expense.category.toLowerCase().includes(searchCategory.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((expense) => expense.category === category);
    }
    if (paymentMethod) {
      filtered = filtered.filter((expense) => expense.paymentMethod === paymentMethod);
    }
    if (startDate && endDate) {
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
        );
      });
    }
    setFilteredExpenses(filtered);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    searchDescription,
    searchCategory,
    category,
    paymentMethod,
    startDate,
    endDate,
    expenses,
  ]);

  const totalItems = filteredExpenses.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const pageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  return (
    <Container>
      <Header>
        <Input
          type="text"
          placeholder="Search Description"
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
          wide
        />
        <Input
          type="text"
          placeholder="Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Payment Method</option>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </Select>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button primary onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button onClick={() => navigate("/add-expense")}>Add Expense</Button>
      </Header>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {paginatedExpenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => pageChange(-1)}
        >
          Previous
        </PageButton>
        <PageButton
          disabled={startIndex + itemsPerPage >= totalItems}
          onClick={() => pageChange(1)}
        >
          Next
        </PageButton>
      </Pagination>

      <ExpenseCharts expenses={filteredExpenses} />
    </Container>
  );
};

export default ExpenseList;
