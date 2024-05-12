import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PipelineStatus = () => {
  const [pipelineStatus, setPipelineStatus] = useState('');

  useEffect(() => {
    const fetchPipelineStatus = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/SusannaDiV/asl/actions/runs'
        );
        const latestRun = response.data.workflow_runs[0];
        setPipelineStatus(latestRun ? latestRun.conclusion : 'No runs found');
      } catch (error) {
        console.error('Error fetching pipeline status:', error);
      }
    };

    fetchPipelineStatus();
  }, []);

  return (
    <div>
      <h1>Pipeline Status</h1>
      <p>{pipelineStatus}</p>
    </div>
  );
};

export default PipelineStatus;
