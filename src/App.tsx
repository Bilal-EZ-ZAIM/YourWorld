import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ChatLayout from './components/Chat/ChatLayout';

function App() {
  const isAuthenticated = false; // This will be connected to authentication state later

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={isAuthenticated ? <ChatLayout /> : <Login />} /> */}
        <Route path="/" element={<ChatLayout />} />
      </Routes>
    </Router>
  );
}

export default App;