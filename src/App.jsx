import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlphabetGridPage from './pages/AlphabetGridPage';
import TracingPage from './pages/TracingPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alphabet" element={<AlphabetGridPage />} />
          <Route path="/trace/:letter" element={<TracingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
