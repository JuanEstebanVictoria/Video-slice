// src/App.js
import React, { useState } from 'react';
import VideoPlayer from './components/VideosPlayer';
import ClipForm from './components/ClipForm';

const VIDEO_URL = "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4";

function App() {
  const [clips, setClips] = useState([
    { name: "Video completo", start: 0, end: 52 } // duración estimada del trailer
  ]);
  const [selectedClip, setSelectedClip] = useState(clips[0]);

  const handleAddClip = (clip) => {
    setClips([...clips, clip]);
  };

  return (
      <div>
        <h1>Editor de Clips</h1>
        <VideoPlayer
            videoUrl={VIDEO_URL}
            start={selectedClip.start}
            end={selectedClip.end}
        />

        <h2>Clips</h2>
        <ul>
          {clips.map((clip, index) => (
              <li key={index} onClick={() => setSelectedClip(clip)}>
                {clip.name} ({clip.start} - {clip.end}s)
              </li>
          ))}
        </ul>

        <ClipForm onAddClip={handleAddClip} />
      </div>
  );
}

export default App;
