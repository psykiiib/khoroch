import React, { useEffect, useState } from "react";
import "./expense_page_style.css";
import logo from '../assets/logo.png';

const ExpensePage = () => {
  const [newExpense, setNewExpense] = useState({
    expenseCategory: "",
    expenseName: "",
    description: "",
    date: "",
    amount: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const fetchData = () => {
    try {
      fetch("http://localhost:8080/expense-manager/get-all-expense", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          setExpenses(result);
  
          // Calculate total expenses
          const total = result.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
          setTotalExpenses(total);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(newExpense);

    try {
      fetch("http://localhost:8080/expense-manager/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      })
        .then((response) => response.text())
        .then((result) => fetchData())
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.log(error);
    }

    setNewExpense({
      expenseCategory: "",
      expenseName: "",
      description: "",
      date: "",
      amount: "",
    });
  };

  const [savings, setSavings] = useState(0);

  const handleSavingsChange = (e) => {
    const { value } = e.target;
    setSavings(Number(value));
  };

  const handleIncreaseSavings = () => {
    setSavings((prevSavings) => Math.max(0, prevSavings + 1));
  };

  const handleDecreaseSavings = () => {
    setSavings((prevSavings) => Math.max(0, prevSavings - 1));
  };

  return (
    <>
    <div className="title-container">
    <img src={logo} alt="ExpMan Logo" className="logo" />
    <div className="text-container">
    <h1>KHOROCH</h1>
    <h4>Your personal Expense Manager!</h4>
  </div>
    </div>
    <div className="container">
      <div className="form-container">
        <h2>New Expense</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <label>
            Expense Category:
            <select name="expenseCategory" onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Transportation">Transportation</option>
              <option value="Food">Food</option>
              <option value="Fees">Fees</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </label>
          <label>
            Expense Name:
            <input
              type="text"
              name="expenseName"
              value={newExpense.expenseName}
              onChange={handleChange} />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={newExpense.description}
              onChange={handleChange} />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleChange} />
          </label>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleChange} />
          </label>
          <button type="submit">Add Expense</button>
        </form>
      </div>

      <div className="table-container">
        <div className="savings-container">
          <h1>Current Savings: ৳{savings}</h1>
          <div className="savings-buttons">
            <button onClick={handleIncreaseSavings}>+</button>
            <button onClick={handleDecreaseSavings}>-</button>
          </div>
        </div>
        <h2>Expense Table</h2>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Expense Category</th>
              <th>Expense Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.expenseCategory}</td>
                <td>{expense.expenseName}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
                <td>{expense.amount}৳</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-expense-container">
          <h2>Total Expenses: ৳{totalExpenses}</h2>
        </div>
      </div>


    </div></>
  );
};

export default ExpensePage;
