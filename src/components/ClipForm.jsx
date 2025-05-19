// src/components/ClipForm.jsx

// Import React and useState hook to manage local component state
import React from 'react';
import {useForm} from 'react-hook-form';

// Functional component that renders the form to create new video clips
// It receives the onAddClip callback function as a prop to handle the new clip submission
const ClipForm = ({ onAddClip }) => {
    // Local state for the clip's name, start time, end time, and tags
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        const clip = {
            name : data.name,
            start : parseFloat(data.start),
            end : parseFloat(data.end),
            tags : data.tags.split(',').map(t => t.trim().toLowerCase())
        };
        onAddClip(clip);
        reset();
    }

    // Render the clip creation form
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Add a new clip</h3>
            <input
                type="text"
                placeholder="Name"
                {...register('name', { required: 'The mame is required',
                maxlength:{ value: 50, message: 'Maz 50 characters' }
                })}
            />
            {errors.start && <p style={{ color: 'red' }}>{errors.start.message}</p>}

            <input
                type="number"
                placeholder ="Start (seconds)"
                {...register('start', { required: 'Start time is required',
                min: { value: 0, message: 'Start time must be greater than 0' }
                })}
            />

            {errors.end && <p style={{ color: 'red' }}>{errors.end.message}</p>}
            <input
                type="number"
                placeholder="End (seconds)"
                {...register('end', { required: 'End time is required',
                validate: (value, formValues)=>
                parseFloat(value) > parseFloat(formValues.start) || 'End time must be greater than start time'
                })}
            />
            {errors.tags && <p style={{ color: 'red' }}>{errors.tags.message}</p>}
            <input
                type="text"
                placeholder="Tag"
                {...register('tags')}
            />
            <button type="submit">Add</button>
        </form>
    );
};

// Export the component for use in other parts of the app
export default ClipForm;
