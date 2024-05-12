const rules = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Rule ${i + 1}`
}));

export default rules;
//Read from MongoDB