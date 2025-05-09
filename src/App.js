// src/App.js
import React, {useEffect, useState} from 'react';
import VideoPlayer from './components/VideosPlayer';
import ClipForm from './components/ClipForm';
import ClipList from './components/ClipList';
import './App.css';

const VIDEO_URL = "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4";

function App() {
    const [clips, setClips] = useState([
        { name: "Full video", start: 0, end: 52 }
    ]);
    useEffect(() => {
        const savedClips = localStorage.getItem('clips');
        if (savedClips) {
            const parsed = JSON.parse(savedClips);
            setClips(parsed);
            setSelectedClip(parsed[0]);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem('clips', JSON.stringify(clips));
    }, [clips]);



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
    const handleResetClips= ()=>{
        localStorage.removeItem('clips');
        const fullVideo = { name: "Full video", start: 0, end: 52 };
        setClips([fullVideo]);
        setSelectedClip(fullVideo);
    }

    const [isLoadingNextClip, setIsLoadingNextClip] = useState(false);
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

    const [tagFilter, setTagFilter] = useState('');


    const filteredClips = tagFilter
        ? clips.filter(clip => clip.tags?.includes(tagFilter))
        : clips;




    return (
        <div className="App">
            <h1>Video slicer</h1>

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
            <input
                type="text"
                placeholder="Filtrar por tag..."
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value.toLowerCase())}
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
            />


            <ClipList
                clips={filteredClips}
                onSelect={setSelectedClip}
                onDelete={handleDeleteClip}
                onEdit={handleEditClip}
                editable={true}
            />
            <button onClick={handleResetClips}>Reset</button>

            <ClipForm onAddClip={handleAddClip} />
        </div>
    );
}
export default App;
