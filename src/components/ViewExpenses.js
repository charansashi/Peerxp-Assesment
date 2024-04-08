import React, { useState } from 'react';
import './ViewExpenses.css';

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Expense 1', category: 'Food', date: '2024-04-01', amount: 50, updatedAt: '2024-04-02', createdBy: 'me' },
    { id: 2, name: 'Expense 2', category: 'Transport', date: '2024-04-02', amount: 30, updatedAt: '2024-04-03', createdBy: 'user@example.com' },
    { id: 3, name: 'Expense 3', category: 'Entertainment', date: '2024-04-03', amount: 20, updatedAt: '2024-04-04', createdBy: 'me' },
  ]);

  const [editedExpense, setEditedExpense] = useState(null);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: '',
    category: '',
    date: '',
    amount: '',
  });

  const handleEditExpense = (id) => {
    const selectedExpense = expenses.find((expense) => expense.id === id);
    if (selectedExpense) {
      setEditedExpense(selectedExpense);
    } else {
      console.error(`Expense with id ${id} not found.`);
    }
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)));
    setEditedExpense(null);
  };

  const handleCancelEdit = () => {
    setEditedExpense(null);
  };

  const handleNewExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value,
    });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
    const newExpenseWithId = { ...newExpense, id: newId };
    setExpenses([...expenses, newExpenseWithId]);
    setNewExpense({
      name: '',
      category: '',
      date: '',
      amount: '',
    });
    setIsAddingExpense(false);
  };

  return (
    <div className="view-expenses-container">
      <h2 className="view-expenses-heading">View Expenses</h2>
      <button className="add-expense-btn" onClick={() => setIsAddingExpense(true)}>Add Expense</button>

      {isAddingExpense && (
        <form onSubmit={handleAddExpense} className="expense-form">
          <label className="form-label">
            Name:
            <input type="text" name="name" value={newExpense.name} onChange={handleNewExpenseChange} className="form-input" required />
          </label>
          <label className="form-label">
            Category:
            <input type="text" name="category" value={newExpense.category} onChange={handleNewExpenseChange} className="form-input" required />
          </label>
          <label className="form-label">
            Date:
            <input type="date" name="date" value={newExpense.date} onChange={handleNewExpenseChange} className="form-input" required />
          </label>
          <label className="form-label">
            Amount:
            <input type="number" name="amount" value={newExpense.amount} onChange={handleNewExpenseChange} className="form-input" min="0" required />
          </label>
          <button type="submit" className="add-expense-btn">Add Expense</button>
        </form>
      )}

      <table className="expenses-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date of Expense</th>
            <th>Amount</th>
            <th>Updated at</th>
            <th>Created by</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>${expense.amount}</td>
              <td>{expense.updatedAt}</td>
              <td>{expense.createdBy === 'me' ? 'me' : expense.createdBy}</td>
              <td>
                <button onClick={() => handleEditExpense(expense.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editedExpense && (
        <EditExpenseForm expense={editedExpense} onUpdateExpense={handleUpdateExpense} onCancelEdit={handleCancelEdit} />
      )}
    </div>
  );
};

const EditExpenseForm = ({ expense, onUpdateExpense, onCancelEdit }) => {
  const [editedName, setEditedName] = useState(expense.name);
  const [editedCategory, setEditedCategory] = useState(expense.category);
  const [editedDate, setEditedDate] = useState(expense.date);
  const [editedAmount, setEditedAmount] = useState(expense.amount);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedExpense = {
      ...expense,
      name: editedName,
      category: editedCategory,
      date: editedDate,
      amount: editedAmount,
    };
    onUpdateExpense(updatedExpense);
  };

  return (
    <div className="edit-expense-form">
      <h3>Edit Expense</h3>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="form-input" maxLength={140} required />
        </label>
        <label className="form-label">
          Date of Expense:
          <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} className="form-input" required />
        </label>
        <label className="form-label">
          Category:
          <select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} className="form-select" required>
            <option value="Health">Health</option>
            <option value="Electronics">Electronics</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Books">Books</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <label className="form-label">
          Amount:
          <input type="number" value={editedAmount} onChange={(e) => setEditedAmount(e.target.value)} className="form-input" min={0} required />
        </label>
        <button type="submit" className="add-expense-btn">Update</button>
        <button type="button" onClick={onCancelEdit} className="add-expense-btn">Cancel</button>
      </form>
    </div>
  );
};

export default ViewExpenses;
