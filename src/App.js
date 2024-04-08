import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import ViewExpenses from './components/ViewExpenses';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <h1>My Personal Finance Management App</h1>
      {isAuthenticated ? (
        <ViewExpenses onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

