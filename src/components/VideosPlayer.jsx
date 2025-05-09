// src/components/VideoPlayer.jsx
import React, {useRef, useEffect, useState} from 'react';

const VideoPlayer = ({ videoUrl, start, end, clips,selectedClip, onSelect, isLoadingNextClip, setIsLoadingNextClip }) => {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const isFullVideo = selectedClip.start === 0 && selectedClip.end >= duration - 0.5;




    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Setear el tiempo inicial y reproducir
        video.currentTime = start;
        video.play();

        // Capturar duración cuando esté disponible
        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };
        video.addEventListener('loadedmetadata', () => {
            setDuration(video.duration);
        });

        // Lógica para salto automático al siguiente clip
        const handleTimeUpdate = () => {
            if (video.currentTime >= end) {
                video.pause();
                video.removeEventListener('timeupdate', handleTimeUpdate);

                const currentIndex = clips.findIndex(
                    (c) => c.start === selectedClip.start && c.end === selectedClip.end
                );
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

        // Limpieza
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [start, end, clips, selectedClip, onSelect, setIsLoadingNextClip]);


    return (
        <div style={{ position: 'relative' }}>
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
                style={{
                    width: '100%',
                    opacity: isLoadingNextClip ? 0.3 : 1,
                    borderRadius: '8px'
                }}
            />

            {/* Marcadores visuales */}
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