// src/components/VideoPlayer.jsx

// Import React and hooks for working with DOM and component state
import React, { useRef, useEffect, useState } from 'react';

// VideoPlayer component responsible for playing a video (or a selected clip of it)
// Props:
// - videoUrl: source URL of the video
// - start, end: clip boundaries (in seconds)
// - clips: list of all clips
// - selectedClip: currently active clip to play
// - onSelect: function to select a new clip
// - isLoadingNextClip, setIsLoadingNextClip: state and handler for loading animation during auto-jump
const VideoPlayer = ({
                         videoUrl,
                         start,
                         end,
                         clips,
                         selectedClip,
                         onSelect,
                         isLoadingNextClip,
                         setIsLoadingNextClip
                     }) => {
    const videoRef = useRef(null); // Reference to the HTML5 video element
    const [duration, setDuration] = useState(0); // Full video duration
    const isFullVideo = selectedClip.start === 0 && selectedClip.end >= duration - 0.5;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Set the video to start from the specified start time
        video.currentTime = start;
        video.play();

        // When metadata is loaded, capture video duration
        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };
        video.addEventListener('loadedmetadata', () => {
            setDuration(video.duration);
        });

        // Check current playback time and auto-jump to the next clip when it ends
        const handleTimeUpdate = () => {
            if (video.currentTime >= end) {
                video.pause();
                video.removeEventListener('timeupdate', handleTimeUpdate);

                const currentIndex = clips.findIndex(
                    (c) => c.start === selectedClip.start && c.end === selectedClip.end
                );
                const nextClip = clips[currentIndex + 1];

                // Auto-play next clip after 3 seconds with loading animation
                if (nextClip) {
                    setIsLoadingNextClip(true);
                    setTimeout(() => {
                        onSelect(nextClip);
                        setIsLoadingNextClip(false);
                    }, 3000);
                }
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        // Clean up event listeners on unmount or dependency change
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [start, end, clips, selectedClip, onSelect, setIsLoadingNextClip]);

    return (
        <div style={{ position: 'relative' }}>
            {/* Display loading animation and countdown before next clip */}
            {isLoadingNextClip && (
                <div style={{ textAlign: 'center' }}>
                    <div className="loader"></div>
                    <p>Next clip in 3 sec...</p>
                </div>
            )}

            {/* HTML5 video element with full control */}
            <video
                ref={videoRef}
                src={videoUrl}
                controls
                style={{
                    width: '100%',
                    opacity: isLoadingNextClip ? 0.3 : 1,
                    borderRadius: '8px'
                }}
            />

            {/* Display markers only when playing full video */}
            {isFullVideo && (
                <div className="timeline-markers">
                    {clips.slice(1).map((clip, i) => {
                        const left = (clip.start / duration) * 100;
                        return (
                            <div
                                key={i}
                                className="marker"
                                style={{ left: `${left}%` }}
                                title={clip.name}
                                onClick={() => onSelect(clip)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
