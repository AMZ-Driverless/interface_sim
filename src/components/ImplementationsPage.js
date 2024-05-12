import React from 'react';

const ImplementationsPage = ({ implementations }) => (
  <div>
    <h1>Implementations</h1>
    <ul>
      {implementations.map(impl => (
        <li key={impl.id}>{impl.content}</li>
      ))}
    </ul>
  </div>
);

export default ImplementationsPage;
