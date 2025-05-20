// src/components/ClipList.jsx

// Import React to define the functional component
import React from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getClip, deleteClip, updateClip} from '../api/clip';
import {getClips} from "../clipsApis";

// ClipList is a reusable component that displays a list of video clips
// Props:
// - clips: array of clip objects to display
// - onSelect: callback to handle when a clip is selected to play
// - onDelete: callback to handle deletion of a clip
// - onEdit: callback to handle editing a clip
// - editable: determines whether delete/edit buttons should be shown (defaults to true)
const ClipList = ({  onSelect, editable = true }) => {

    const queryClient = useQueryClient();


    //get clips
    const {data: clips =  [], isLoading, isError} = useQuery(['clips'], getClips());

    //Mutation to delete
    const  deleteMutation = useMutation({
        mutationFn: deleteClip,
        onSuccess: () => {
            queryClient.invalidateQueries(['clips']);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({id, data}) => updateClip(id, data),
        onSuccess: ()=>{
            queryClient.invalidateQueries(['clips']);
        }
    });

    if (isLoading) return <p>Loading clips...</p>;
    if (isError) return <p>Error loading clips</p>;


    return (
        <div>
            <h3>Saved clips</h3>
            <ul>
                {clips.map((clip) => (
                    <li key={clip.id} style={{ marginBottom: '10px' }}>
                        {/* Clicking on the clip name triggers the video player to play the selected clip */}
                        <strong onClick={() => onSelect(clip)} style={{ cursor: 'pointer' }}>
                            {clip.name} ({clip.start}s - {clip.end}s)
                        </strong>

                        {/* Display the tags associated with the clip */}
                        <p style={{ fontSize: '0.9rem', color: '#777' }}>
                            Tags: {clip.tags?.join(', ') || "None"}
                        </p>

                        {/* If editing is allowed and this is not the full video (index 0), show edit/delete options */}
                        {editable && (
                            <>
                                {/* Button to delete the clip */}
                                <button
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => deleteMutation.mutate(clip.id)}
                                >
                                    Delete
                                </button>

                                {/* Button to edit clip information using prompt dialogs */}
                                <button
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                        const newName = prompt("New name:", clip.name);
                                        const newStart = prompt("New start:", clip.start);
                                        const newEnd = prompt("New end:", clip.end);
                                        const newTags = prompt("New tags:", clip.tags?.join(', ') || '');

                                        // Update the clip only if required fields are filled
                                        if (newName && newStart !== null && newEnd !== null) {
                                            updateMutation.mutate({
                                                id: clip.id,
                                                data: {
                                                    name: newName,
                                                    start: parseFloat(newStart),
                                                    end: parseFloat(newEnd),
                                                    tags: newTags.split(',').map(t => t.trim().toLowerCase())
                                                }
                                            });
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

// Export the component for use in other parts of the application
export default ClipList;
