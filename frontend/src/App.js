import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DataInput from './pages/DataInput';
import ODSScreen from './pages/ODSScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">데이터입력</Link>
            </li>
            <li>
              <Link to="/ods_screen">ODS 화면</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<DataInput />} />
          <Route path="/about" element={<ODSScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
