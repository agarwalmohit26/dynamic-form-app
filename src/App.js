import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormCreation from './components/FormCreation';
import FormFill from './components/FormFill';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/create-form">Create Form</Link>
            </li>
            <li>
              <Link to="/fill-form">Fill Form</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/create-form" element={<FormCreation />} />
          <Route path="/fill-form" element={<FormFill />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
