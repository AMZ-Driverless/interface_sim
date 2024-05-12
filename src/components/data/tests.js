import run_tests from './run_tests';

const tests = [
    { test_id: 101, implementation_id: 1, content: "Test 1:  console.assert(true);", result: run_tests.filter(run_test => run_test.test_id === 101) },
    { test_id: 102, implementation_id: 1, content: "Test 2: console.assert(false);", result: run_tests.filter(run_test => run_test.test_id === 102) },
    { test_id: 201, implementation_id: 2, content: "Test 1: console.assert(true);", result: run_tests.filter(run_test => run_test.test_id === 201) },
    { test_id: 202, implementation_id: 2, content: "Test 2: console.assert(false);", result: run_tests.filter(run_test => run_test.test_id === 202) },
  ];
  
  export default tests;