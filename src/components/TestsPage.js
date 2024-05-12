import React, { useState } from 'react';
import CreateRequirementPopup from './CreateRequirementPopup'; // Ensure this path is correct based on your project structure
import implementations from './data/implementations'; // Adjust the import path as needed
import requirementsData from './data/requirements';

const TestsPage = () => {
  const [selectedImplementation, setSelectedImplementation] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isImplVisible, setIsImplVisible] = useState(false);
  const [isTestVisible, setIsTestVisible] = useState(false);
  const [requirements, setRequirements] = useState(requirementsData);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRule, setSelectedRule] = useState('');

  const handleRequirementClick = (entryId) => {
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
    const newRequirement = {
      id: requirements.length + 1,
      name: `Requirement ${requirements.length + 1}`,
      rules: selectedRules.map(rule => rule.name)
    };
    setRequirements([...requirements, newRequirement]);
    togglePopup();
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRuleChange = (event) => {
    setSelectedRule(event.target.value);
  };

  const sortedRequirements = requirements
    .filter(entry => 
      (entry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.rules.some(rule => rule.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (!selectedRule || entry.rules.includes(selectedRule))
    )
    .sort((a, b) => {
      if (sortField === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const ruleOptions = Array.from(new Set(requirements.flatMap(entry => entry.rules)));

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
          <button style={{ padding: "5px 10px", fontSize: "12px" }} onClick={togglePopup}>Create Requirement</button>
          <input type="text" placeholder="Search requirements..." value={searchTerm} onChange={handleSearchChange} style={{ marginLeft: "10px" }}/>
          <select value={selectedRule} onChange={handleRuleChange} style={{ marginLeft: "10px" }}>
            <option value="">Filter by Rule</option>
            {ruleOptions.map(rule => (
              <option key={rule} value={rule}>{rule}</option>
            ))}
          </select>
        </div>
        {isPopupVisible && <CreateRequirementPopup onSave={addNewRequirement} onClose={togglePopup} />}
          <table style={{ width: "100%", border: "1px solid black" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Parent</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequirements.map(entry => (
                <tr key={entry.id} onClick={() => handleRequirementClick(entry.id)} style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                  <td>{entry.id}</td>
                  <td>{entry.name}</td>
                  <td>{entry.rules.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1 }}>
          {isImplVisible && (
            <div style={{ overflowY: "auto", height: "300px", border: "1px solid grey", padding: "10px", position: "relative" }}>
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
              {selectedTest.result.length !== 0 && (
                <div>
                  <p>Latest test: {selectedTest.result[selectedTest.result.length - 1].result}</p>
                  <p>Total Tests: {selectedTest.result.length}</p>
                  <p>Pass Percentage: {((selectedTest.result.filter(runTest => runTest.result === 'Passed').length / selectedTest.result.length) * 100).toFixed(2)}%</p>
                  <p>Fail Percentage: {((selectedTest.result.filter(runTest => runTest.result === 'Failed').length / selectedTest.result.length) * 100).toFixed(2)}%</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestsPage;
