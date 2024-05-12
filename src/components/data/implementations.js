import tests from './tests';

const implementations = [
    {
      id: 1,
      content: "Implementation for Requirement 1:\nconsole.log('Hello, Requirement 1');",
      tests: tests.filter(test => test.implementation_id === 1)
    },
    {
      id: 2,
      content: "Implementation for Requirement 2:\nconsole.log('Hello, Requirement 2');",
      tests: tests.filter(test => test.implementation_id === 2)
    }
  ];
  
  export default implementations;
  