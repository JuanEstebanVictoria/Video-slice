// src/components/ClipForm.jsx
import React, { useState } from 'react';

const ClipForm = ({ onAddClip }) => {
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || start === '' || end === '') return;

        const clip = {
            name,
            start: parseFloat(start),
            end: parseFloat(end),
        };

        onAddClip(clip);
        setName('');
        setStart('');
        setEnd('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a new clip</h3>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Start (seconds)"
                value={start}
                onChange={(e) => setStart(e.target.value)}
            />
            <input
                type="number"
                placeholder="End (seconds)"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default ClipForm;