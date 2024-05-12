import React, { useState } from 'react';
import rules from './data/rules'; // Ensure this path is correct

const Entries = ({ onEntryClick }) => {
  const [entries, setEntries] = useState([
    { id: 1, name: "Entry 1", rules: rules.slice(0, 2).map(rule => rule.name) },
    { id: 2, name: "Entry 2", rules: rules.slice(2, 3).map(rule => rule.name) }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getSortedAndFilteredEntries = () => {
    return entries.filter(entry =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.id.toString().includes(searchTerm) ||
      entry.rules.some(rule => rule.toLowerCase().includes(searchTerm.toLowerCase()))
    ).sort((a, b) => {
      if (sortField === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" placeholder="Search entries..." value={searchTerm} onChange={handleSearchChange} style={{ marginLeft: "10px" }}/>
        <select value={sortField} onChange={e => setSortField(e.target.value)} style={{ marginLeft: "10px" }}>
          <option value="name">Sort by Name</option>
          <option value="numRules">Sort by Number of Rules</option>
          <option value="ruleNames">Sort by Rule Names</option>
        </select>
      </div>
      <div style={{ overflowY: "scroll", height: "500px", border: "1px solid black" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Rules</th>
            </tr>
          </thead>
          <tbody>
            {getSortedAndFilteredEntries().map(entry => (
              <tr key={entry.id} onClick={() => onEntryClick(entry.id)} style={{ cursor: "pointer" }}>
                <td>{entry.id}</td>
                <td>{entry.name}</td>
                <td>{entry.rules.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Entries;
