// src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoUrl, start, end, clips,selectedClip, onSelect, isLoadingNextClip, setIsLoadingNextClip }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = start;
        video.play();

        const handleTimeUpdate = () => {
            if (video.currentTime >= end) {
                video.pause();
                video.removeEventListener('timeupdate', handleTimeUpdate);

                // Espera 3 segundos y luego avanza
                const currentIndex = clips.findIndex(c => c === selectedClip);
                const nextClip = clips[currentIndex + 1];

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

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [start, end, clips, selectedClip, onSelect, setIsLoadingNextClip]);

    return (
        <div>
            {isLoadingNextClip && (
                <div style={{ textAlign: 'center' }}>
                    <div className="loader"></div>
                    <p>Next clip in 3 sec...</p>
                </div>
            )}

            <video
                ref={videoRef}
                src={videoUrl}
                controls
                width="640"
                style={{ opacity: isLoadingNextClip ? 0.3 : 1 }}
            />
        </div>
    );
};

export default VideoPlayer;