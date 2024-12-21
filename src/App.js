import React, { useState } from 'react';
import Login from './components/Login';
import BookLending from './components/BookLending';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app">
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <nav className="navbar">
            <div className="navbar-brand">
              <h1>📚 ระบบจัดการยืม-คืนหนังสือ</h1>
            </div>
            <div className="navbar-user">
              <span>{user.email}</span>
              <button onClick={handleLogout} className="logout-button">
                ออกจากระบบ
              </button>
            </div>
          </nav>
          
          <main className="main-content">
            <BookLending />
          </main>
          
          <footer className="footer">
            <p>&copy; CPE499 React ระบบจัดการยืม-คืนหนังสือ. 6401501 นายชิโน เฮงหิรัญพชรเดชา.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;