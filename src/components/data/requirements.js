import rules from './rules'; 

const requirements = [
  { id: 1, name: "Requirement 1", rules: rules.slice(0, 2).map(rule => rule.name) },
  { id: 2, name: "Requirement 2", rules: rules.slice(2, 3).map(rule => rule.name) }
];

export default requirements;