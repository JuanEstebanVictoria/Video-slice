// Import core dependencies from React
import React, { useEffect, useState } from 'react';

// Import child components for video playback and clip listing
import VideoPlayer from './VideosPlayer';
import ClipList from './ClipList';

// PlayerView is a dedicated view to watch clips without editing them
// This component is useful for fulfilling the bonus requirement of reusing the player and playlist on another page
const PlayerView = () => {
    // Holds the list of saved clips and the currently selected one to play
    const [clips, setClips] = useState([]);
    const [selectedClip, setSelectedClip] = useState(null);

    // On component mount, load saved clips from localStorage and auto-select the first one (full video)
    useEffect(() => {
        const savedClips = localStorage.getItem('clips');
        if (savedClips) {
            const parsed = JSON.parse(savedClips);
            setClips(parsed);
            setSelectedClip(parsed[0]); // Default to full video
        }
    }, []);

    // Show loading message if no clip is yet selected
    if (!selectedClip) return <p>Loading clips...</p>;

    // Render the player view
    return (
        <div className="App">
            <h1>Watch clips</h1>

            {/* VideoPlayer component plays the selected clip */}
            <VideoPlayer
                videoUrl="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
                start={selectedClip.start}
                end={selectedClip.end}
                clips={clips}
                selectedClip={selectedClip}
                onSelect={setSelectedClip}
                isLoadingNextClip={false}
                setIsLoadingNextClip={() => {}} // No loading logic needed here
            />

            {/* ClipList displays the list of clips without editing capabilities */}
            <ClipList
                clips={clips}
                onSelect={setSelectedClip}
                editable={false} // Read-only list
            />
        </div>
    );
};

// Export the component for use in routing or as a separate page
export default PlayerView;

