// index.js

// Import React and ReactDOM to render the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import routing components from React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import main views and global styles
import App from './App';
import PlayerView from './components/PlayerView';
import './index.css';

// Create root element for rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render application using React Router for navigation
root.render(
    <BrowserRouter>
        <Routes>
            {/* Main route with full editing interface */}
            <Route path="/" element={<App />} />

            {/* Secondary route with read-only player and clip list */}
            <Route path="/player" element={<PlayerView />} />
        </Routes>
    </BrowserRouter>
);
