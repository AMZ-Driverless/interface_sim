import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import ImplementationsPage from './components/ImplementationsPage';
import TestsPage from './components/TestsPage';

// Dummy data
const entries = [{ id: 1, name: "Entry 1" }, { id: 2, name: "Entry 2" }];
const implementations = [
  { id: 1, content: "Implementation Code for Entry 1: console.log('Hello World');" },
  { id: 2, content: "Implementation Code for Entry 2: console.log('Goodbye World');" }
];

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/implementations">Implementations</Link> | <Link to="/tests">Tests</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage entries={entries} />} />
          <Route path="/implementations" element={<ImplementationsPage implementations={implementations} />} />
          <Route path="/tests" element={<TestsPage entries={entries} implementations={implementations} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
