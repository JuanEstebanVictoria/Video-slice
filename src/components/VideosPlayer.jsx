// src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoUrl, start, end }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = start;
            videoRef.current.play();
        }

        const handleTimeUpdate = () => {
            if (videoRef.current.currentTime >= end) {
                videoRef.current.pause();
            }
        };

        const video = videoRef.current;
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [start, end]);

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