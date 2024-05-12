import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import ImplementationsPage from './components/ImplementationsPage';
import TestsPage from './components/TestsPage';

// Dummy data
const requirements = [{ id: 1, name: "Requirement 1" }, { id: 2, name: "Requirement 2" }];
const implementations = [
  { id: 1, content: "Implementation Code for Requirement 1: console.log('Hello World');" },
  { id: 2, content: "Implementation Code for Requirement 2: console.log('Goodbye World');" }
];

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/implementations">Implementations</Link> | <Link to="/tests">Tests</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage requirements={requirements} />} />
          <Route path="/implementations" element={<ImplementationsPage implementations={implementations} />} />
          <Route path="/tests" element={<TestsPage requirements={requirements} implementations={implementations} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
