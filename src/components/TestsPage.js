import React, { useState } from 'react';
import CreateRequirementPopup from './CreateRequirementPopup'; // Ensure this path is correct based on your project structure
import implementations from './data/implementations'; // Adjust the import path as needed
import rules from './data/rules';

const TestsPage = () => {
  const [selectedImplementation, setSelectedImplementation] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isImplVisible, setIsImplVisible] = useState(false);
  const [isTestVisible, setIsTestVisible] = useState(false);
  const [entries, setEntries] = useState([
    { id: 1, name: "Entry 1", rules: rules.slice(0, 2).map(rule => rule.name) },
    { id: 2, name: "Entry 2", rules: rules.slice(2, 3).map(rule => rule.name) }
  ]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const handleEntryClick = (entryId) => {
    const foundImplementation = implementations.find(impl => impl.id === entryId);
    setSelectedImplementation(foundImplementation);
    setIsImplVisible(true);
    setIsTestVisible(false);
  };

  const handleCloseImplClick = () => {
    setIsImplVisible(false);
    setIsTestVisible(false);
    setSelectedTest(null);
  };

  const handleTestClick = (test) => {
    setSelectedTest(test);
    setIsTestVisible(true);
  };

  const handleCloseTestClick = () => {
    setIsTestVisible(false);
  };

  const addNewRequirement = (selectedRules) => {
    const newEntry = {
      id: entries.length + 1,
      name: `Requirement ${entries.length + 1}`,
      rules: selectedRules.map(rule => rule.name)
    };
    setEntries([...entries, newEntry]);
    togglePopup();
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedEntries = entries
    .filter(entry => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortField === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <button style={{ padding: "5px 10px", fontSize: "12px" }} onClick={togglePopup}>Create Requirement</button>
        <input type="text" placeholder="Search entries..." value={searchTerm} onChange={handleSearchChange} style={{ marginLeft: "10px" }}/>
      </div>
      {isPopupVisible && <CreateRequirementPopup onSave={addNewRequirement} onClose={togglePopup} />}
      <table style={{ width: "100%", border: "1px solid black" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Rules</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map(entry => (
            <tr key={entry.id} onClick={() => handleEntryClick(entry.id)} style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.rules.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isImplVisible && (
        <div style={{ flex: 1, overflowY: "auto", height: "300px", border: "1px solid grey", padding: "10px", position: "relative" }}>
          <button onClick={handleCloseImplClick} style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}>X</button>
          <h2>Implementation</h2>
          <pre>{selectedImplementation.content}</pre>
          <h3>Test Cases:</h3>
          <ul>
            {selectedImplementation.tests.map(test => (
              <li key={test.id} onClick={() => handleTestClick(test)} style={{ cursor: "pointer" }}>
                {test.content}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isTestVisible && (
        <div style={{ overflowY: "auto", height: "300px", border: "1px solid grey", padding: "10px", position: "relative" }}>
          <button onClick={handleCloseTestClick} style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}>X</button>
          <h2>Test Case Detail</h2>
          <pre>{selectedTest.content}</pre>
        </div>
      )}
    </div>
  );
};

export default TestsPage;
