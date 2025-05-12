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

    const previewRef = useRef(null);
    const progressBarRef = useRef(null);
    const [hoverTime, setHoverTime] = useState(null);
    const [previewStyle, setPreviewStyle] = useState({ display: "none" });

    const handleMouseMove = (e) => {
        const bar = progressBarRef.current;
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const time = percentage * duration;

        const preview = previewRef.current;
        if (preview && !isNaN(time)) {
            preview.currentTime = time;
            setHoverTime(time);

            const left = Math.min(Math.max(x - 60, 0), rect.width - 120);
            setPreviewStyle({
                display: "block",
                position: "absolute",
                bottom: "60px",
                left: `${left}px`,
                width: "120px",
                height: "67px",
                pointerEvents: "none",
                zIndex: 10,
                border: "2px solid white",
            });
        }
    };

    const handleMouseLeave = () => {
        setPreviewStyle({ display: "none" });
        setHoverTime(null);
    };

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
            {/* invisible bar */}
            <div
                ref={progressBarRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "40px",
                    width: "100%",
                    cursor: "pointer",
                    zIndex: 5
                }}
            />

            {/* dynamic miniature */}
            <div style={previewStyle}>
                <video
                    ref={previewRef}
                    src={videoUrl}
                    muted
                    width="120"
                    height="67"
                    style={{ borderRadius: "4px" }}
                />
                <div style={{ textAlign: "center", fontSize: "12px", color: "white" }}>
                    {hoverTime !== null &&
                        `${Math.floor(hoverTime / 60)}:${String(Math.floor(hoverTime % 60)).padStart(2, "0")}`}
                </div>
            </div>

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
