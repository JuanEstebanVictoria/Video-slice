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
            <h3>Agregar nuevo clip</h3>
            <input
                type="text"
                placeholder="Nombre del clip"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Inicio (segundos)"
                value={start}
                onChange={(e) => setStart(e.target.value)}
            />
            <input
                type="number"
                placeholder="Fin (segundos)"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default ClipForm;