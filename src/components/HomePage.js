import React from 'react';

const HomePage = ({ entries }) => (
  <div>
    <h1>Entries</h1>
    <table style={{ width: "100%", border: "1px solid black" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(entry => (
          <tr key={entry.id} style={{ borderBottom: "1px solid #ddd" }}>
            <td>{entry.id}</td>
            <td>{entry.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default HomePage;
