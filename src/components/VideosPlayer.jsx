// src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoUrl, start, end, clips,selectedClip, onSelect }) => {
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
                    setTimeout(() => {
                        onSelect(nextClip);
                    }, 3000);
                }
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [start, end, clips, selectedClip, onSelect]);

    return (
        <video
            ref={videoRef}
            src={videoUrl}
            controls
            width="640"
        />
    );
};

export default VideoPlayer;