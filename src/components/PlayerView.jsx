import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideosPlayer';
import ClipList from './ClipList';


const PlayerView = () => {
    const [clips, setClips] = useState([]);
    const [selectedClip, setSelectedClip] = useState(null);

    useEffect(() => {
        const savedClips = localStorage.getItem('clips');
        if (savedClips) {
            const parsed = JSON.parse(savedClips);
            setClips(parsed);
            setSelectedClip(parsed[0]);
        }
    }, []);

    if (!selectedClip) return <p>Cargando clips...</p>;

    return (
        <div className="App">
            <h1>Watch clips</h1>
            <VideoPlayer
                videoUrl="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
                start={selectedClip.start}
                end={selectedClip.end}
                clips={clips}
                selectedClip={selectedClip}
                onSelect={setSelectedClip}
                isLoadingNextClip={false}
                setIsLoadingNextClip={() => {}}
            />

            <ClipList
                clips={clips}
                onSelect={setSelectedClip}
                editable={false}
            />
        </div>
    );
};

export default PlayerView;
