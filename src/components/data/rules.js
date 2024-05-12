const rules = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Rule ${i + 1}`,
    date: new Date(Date.now() - i * 10000000).toISOString().split('T')[0]
}));

export default rules;
//Read from MongoDB