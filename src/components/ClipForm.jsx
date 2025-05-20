import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3001/clips';

const ClipForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const queryClient = useQueryClient();

    // Mutación para crear clip
    const createClipMutation = useMutation({
        mutationFn: async (newClip) => {
            const response = await axios.post(API_URL, newClip);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['clips']); // Refresca la lista
            reset(); // Limpia el formulario
        },
        onError: (error) => {
            alert('Error al crear el clip: ' + error.message);
        }
    });

    const onSubmit = (data) => {
        const newClip = {
            name: data.name,
            start: parseFloat(data.start),
            end: parseFloat(data.end),
            tags: data.tags ? data.tags.split(',').map(t => t.trim().toLowerCase()) : []
        };

        createClipMutation.mutate(newClip);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
            <h3>Add a new clip</h3>

            <input
                type="text"
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

            <input
                type="number"
                placeholder="Start (seconds)"
                {...register('start', { required: 'Start time is required', min: 0 })}
            />
            {errors.start && <p style={{ color: 'red' }}>{errors.start.message}</p>}

            <input
                type="number"
                placeholder="End (seconds)"
                {...register('end', {
                    required: 'End time is required',
                    validate: (value, { start }) =>
                        parseFloat(value) > parseFloat(start) || 'End must be greater than start'
                })}
            />
            {errors.end && <p style={{ color: 'red' }}>{errors.end.message}</p>}

            <input
                type="text"
                placeholder="Tags (comma separated)"
                {...register('tags')}
            />

            <button type="submit" disabled={createClipMutation.isPending}>
                {createClipMutation.isPending ? 'Adding...' : 'Add'}
            </button>
        </form>
    );
};

export default ClipForm;
