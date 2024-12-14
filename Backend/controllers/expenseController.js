const mongoose = require("mongoose");
const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  const { category, start, end, paymentMethod } = req.query;
  const filters = {};

  if (category) filters.category = category;
  if (paymentMethod) filters.paymentMethod = paymentMethod;
  if (start && end)
    filters.date = { $gte: new Date(start), $lte: new Date(end) };

  const expenses = await Expense.find(filters).sort({ date: -1 });
  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try {
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await Expense.findByIdAndDelete(expenseId);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Error deleting expense" });
  }
};

exports.updateExpense = async (req, res) => {
  const expenseId = req.params.id;
  const { amount, description, date, category, paymentMethod } = req.body;

  // Validate the expenseId (ensure it's a valid ObjectId)
  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    return res.status(400).json({ message: "Invalid expense ID" });
  }

  if (!amount || !description || !date || !category || !paymentMethod) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;
    expense.date = date || expense.date;
    expense.category = category || expense.category;
    expense.paymentMethod = paymentMethod || expense.paymentMethod;

    const updatedExpense = await expense.save();

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Error updating expense" });
  }
};
