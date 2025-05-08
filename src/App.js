// src/App.js
import React, { useState } from 'react';
import VideoPlayer from './components/VideosPlayer';
import ClipForm from './components/ClipForm';
import ClipList from './components/ClipList';
import './App.css';

const VIDEO_URL = "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4";

function App() {
    const [clips, setClips] = useState([
        { name: "Video completo", start: 0, end: 52 }
    ]);
    const [selectedClip, setSelectedClip] = useState(clips[0]);

    const handleAddClip = (clip) => {
        setClips([...clips, clip]);
    };

    const handleDeleteClip = (index) => {
        const newClips = clips.filter((_, i) => i !== index);
        setClips(newClips);
        if (selectedClip === clips[index]) {
            setSelectedClip(newClips[0]);
        }
    };
    const handleEditClip = (index, updateClip) => {
        const newClips = clips.map((clip, i) =>
            (i === index ? updateClip : clip));
        setClips(newClips);

        if (selectedClip === clips[index]) {
            setSelectedClip(updateClip);
        }
    };

    return (
        <div className="App">
            <h1>Editor de Clips</h1>

            <VideoPlayer
                videoUrl={VIDEO_URL}
                start={selectedClip.start}
                end={selectedClip.end}
            />

            <ClipList
                clips={clips}
                onSelect={setSelectedClip}
                onDelete={handleDeleteClip}
                onEdit={handleEditClip}
            />

            <ClipForm onAddClip={handleAddClip} />
        </div>
    );
}
export default App;
