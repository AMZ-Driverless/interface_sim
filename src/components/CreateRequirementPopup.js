import React, { useState } from 'react';
import rules from './data/rules';

const CreateRequirementPopup = ({ onSave, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('name');
    const [selectedRules, setSelectedRules] = useState([]);

    const handleRuleSelect = (rule) => {
        const updatedSelection = selectedRules.includes(rule)
            ? selectedRules.filter(r => r !== rule)
            : [...selectedRules, rule];
        setSelectedRules(updatedSelection);
    };

    const getFilteredAndSortedRules = () => {
        const filteredRules = rules.filter(rule =>
            rule.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sortedRules = filteredRules.sort((a, b) => {
            if (sortType === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortType === 'date') {
                return new Date(a.date) - new Date(b.date);
            }
            return 0;
        });

        return sortedRules;
    };

    return (
        <div style={{ position: 'absolute', top: '20%', left: '20%', backgroundColor: 'white', padding: '20px', border: '1px solid black', zIndex: 2 }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '5px', right: '5px' }}>X</button>
            <h2>Select Rules</h2>
            <input
                type="text"
                placeholder="Search rules"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <select value={sortType} onChange={e => setSortType(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date</option>
            </select>
            <div style={{ height: '300px', overflowY: 'scroll' }}>
                {getFilteredAndSortedRules().map(rule => (
                    <div key={rule.id}>
                        <input
                            type="checkbox"
                            checked={selectedRules.includes(rule)}
                            onChange={() => handleRuleSelect(rule)}
                        /> {rule.name} ({rule.date})
                    </div>
                ))}
            </div>
            <button disabled={selectedRules.length === 0} onClick={() => onSave(selectedRules)}>Save Requirement</button>
        </div>
    );
};

export default CreateRequirementPopup;
