import React, { useState, useEffect } from 'react';

function App() {
  const [commits, setCommits] = useState([]);

  const fetchCommits = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/:susanndiv/:amy_sim_toy/commits');
      const data = await response.json();
      setCommits(data);
      await saveCommitsToBackend(data);
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  };

  const saveCommitsToBackend = async (newCommits) => {
    try {
      const existingCommitsResponse = await fetch('/api/commits');
      const existingCommits = await existingCommitsResponse.json();

      const commitsToSave = newCommits.filter(newCommit => {
        return !existingCommits.some(existingCommit => existingCommit.sha === newCommit.sha);
      });

      if (commitsToSave.length > 0) {
        const response = await fetch('/api/commits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(commitsToSave)
        });
        console.log('New commits saved to backend:', response);
      } else {
        console.log('No new commits to save.');
      }
    } catch (error) {
      console.error('Error saving commits to backend:', error);
    }
  };

  useEffect(() => {
    fetchCommits();
    const intervalId = setInterval(fetchCommits, 1500); 
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      <h1>Currently running jobs</h1>
      <button onClick={fetchCommits}>Fetch jobs</button>
      <table>
        <thead>
          <tr>
            <th>Message</th>
            <th>Author</th>
            <th>Commit Id</th>
          </tr>
        </thead>
        <tbody>
          {commits.map(commit => (
            <tr key={commit.sha}>
              <td>
                {commit.commit.message}
                {commit.commit.message.includes("start") && <span style={{ color: 'red' }}>🔴</span>}
                {commit.commit.message.includes("running") && <span style={{ color: 'green' }}>🟢</span>}
              </td>
              <td>{commit.commit.author.name}</td>
              <td>{commit.sha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
