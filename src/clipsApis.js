// src/api/clipsApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/clips';

export const getClips = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const deleteClip = async (clipId) => {
    await axios.delete(`${API_URL}/${clipId}`);
};

export const updateClip = async (clipId, updatedData) => {
    const response = await axios.put(`${API_URL}/${clipId}`, updatedData);
    return response.data;
};
