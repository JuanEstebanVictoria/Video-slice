// src/components/ClipForm.jsx

// Import React and useState hook to manage local component state
import React, { useState } from 'react';

// Functional component that renders the form to create new video clips
// It receives the onAddClip callback function as a prop to handle the new clip submission
const ClipForm = ({ onAddClip }) => {
    // Local state for the clip's name, start time, end time, and tags
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [tags, setTags] = useState('');

    // Handles form submission and triggers the onAddClip callback
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation to ensure all required fields are filled
        if (!name || start === '' || end === '') return;

        // Create a new clip object
        const clip = {
            name,
            start: parseFloat(start),
            end: parseFloat(end),
            // Converts comma-separated tags into an array and normalizes them
            tags: tags.split(',').map(t => t.trim().toLowerCase())
        };

        // Send the new clip data to the parent component
        onAddClip(clip);

        // Reset form fields
        setName('');
        setStart('');
        setEnd('');
        setTags('');
    };

    // Render the clip creation form
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
            <input
                type="text"
                placeholder="Tag"
                value={tags}
                onChange={(e)=> setTags(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

// Export the component for use in other parts of the app
export default ClipForm;
