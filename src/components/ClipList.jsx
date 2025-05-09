// src/components/ClipList.jsx
import React from 'react';

const ClipList = ({ clips, onSelect, onDelete, onEdit, editable = true }) => {
    return (
        <div>
            <h3>Saved clips</h3>
            <ul>
                {clips.map((clip, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <strong onClick={() => onSelect(clip)} style={{ cursor: 'pointer' }}>
                            {clip.name} ({clip.start}s - {clip.end}s)
                        </strong>
                        <p style={{ fontSize: '0.9rem', color: '#777' }}>
                            Tags: {clip.tags?.join(', ') || "None"}
                        </p>

                        {editable && index !== 0 && (
                            <>
                                <button
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => onDelete(index)}
                                >
                                    Delete
                                </button>

                                <button
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                        const newName = prompt("New name:", clip.name);
                                        const newStart = prompt("New start:", clip.start);
                                        const newEnd = prompt("New end:", clip.end);
                                        const newTags = prompt("New tags:", clip.tags?.join(', ')||'' );

                                        if (newName && newStart !== null && newEnd !== null) {
                                            const updated = {
                                                name: newName,
                                                start: parseFloat(newStart),
                                                end: parseFloat(newEnd),
                                                tags: newTags.split(',').map(t => t.trim().toLowerCase())
                                            };
                                            onEdit(index, updated);
                                        }
                                    }}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClipList;
