// src/App.js

// Core React imports
import React, { useEffect, useState } from 'react';

// Import components
import VideoPlayer from './components/VideosPlayer';
import ClipForm from './components/ClipForm';
import ClipList from './components/ClipList';
import './App.css';

// React Router hook for navigation
import { useNavigate } from 'react-router-dom';

// Video source URL
const VIDEO_URL = "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4";

// Main application component
function App() {
    // Initialize state with the full video as the first default clip
    const [clips, setClips] = useState([
        { name: "Full video", start: 0, end: 52 }
    ]);

    // Load previously saved clips from localStorage
    useEffect(() => {
        const savedClips = localStorage.getItem('clips');
        if (savedClips) {
            const parsed = JSON.parse(savedClips);
            setClips(parsed);
            setSelectedClip(parsed[0]);
        }
    }, []);

    // Save clips to localStorage when modified
    useEffect(() => {
        localStorage.setItem('clips', JSON.stringify(clips));
    }, [clips]);

    const navigate = useNavigate(); // Navigation hook

    const [selectedClip, setSelectedClip] = useState(clips[0]); // Currently selected clip
    const [isLoadingNextClip, setIsLoadingNextClip] = useState(false); // Controls next-clip loading behavior

    // Add new clip
    const handleAddClip = (clip) => {
        setClips([...clips, clip]);
    };

    // Delete clip and fallback to full video if deleted one is active
    const handleDeleteClip = (index) => {
        const newClips = clips.filter((_, i) => i !== index);
        setClips(newClips);
        if (selectedClip === clips[index]) {
            setSelectedClip(newClips[0]);
        }
    };

    // Edit a clip and update selected one if necessary
    const handleEditClip = (index, updateClip) => {
        const newClips = clips.map((clip, i) =>
            (i === index ? updateClip : clip));
        setClips(newClips);

        if (selectedClip === clips[index]) {
            setSelectedClip(updateClip);
        }
    };

    // Reset to initial state (only full video)
    const handleResetClips = () => {
        localStorage.removeItem('clips');
        const fullVideo = { name: "Full video", start: 0, end: 52 };
        setClips([fullVideo]);
        setSelectedClip(fullVideo);
    };

    // Keyboard navigation: ArrowLeft = previous clip, ArrowRight = next clip
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isLoadingNextClip) return;

            const index = clips.findIndex(
                (c) => c.start === selectedClip.start && c.end === selectedClip.end
            );

            if (e.key === 'ArrowRight' && index < clips.length - 1) {
                setSelectedClip(clips[index + 1]);
            }

            if (e.key === 'ArrowLeft' && index > 0) {
                setSelectedClip(clips[index - 1]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [clips, selectedClip, isLoadingNextClip]);

    const [tagFilter, setTagFilter] = useState(''); // Tag filter state

    // Filter clips by tag if a filter is applied
    const filteredClips = tagFilter
        ? clips.filter(clip => clip.tags?.includes(tagFilter))
        : clips;

    return (
        <div className="App">
            <h1>Video slicer</h1>

            {/* Video player with clip boundaries */}
            <VideoPlayer
                videoUrl={VIDEO_URL}
                start={selectedClip.start}
                end={selectedClip.end}
                clips={clips}
                selectedClip={selectedClip}
                onSelect={setSelectedClip}
                isLoadingNextClip={isLoadingNextClip}
                setIsLoadingNextClip={setIsLoadingNextClip}
            />

            {/* Tag filter input */}
            <input
                type="text"
                placeholder="Filter by tag..."
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value.toLowerCase())}
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
            />

            {/* List of clips (filtered), editable */}
            <ClipList
                clips={filteredClips}
                onSelect={setSelectedClip}
                onDelete={handleDeleteClip}
                onEdit={handleEditClip}
                editable={true}
            />

            {/* Reset and navigation buttons */}
            <button onClick={handleResetClips}>Reset</button>
            <button className="footer-button" onClick={() => navigate('/player')} style={{ marginTop: '2rem' }}>
                Only clips and video
            </button>

            {/* Form to add a new clip */}
            <ClipForm onAddClip={handleAddClip} />
        </div>
    );
}

export default App;

