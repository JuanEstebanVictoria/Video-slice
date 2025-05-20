// index.js

// Import React and ReactDOM to render the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import routing components from React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Import main views and global styles
import App from './App';
import PlayerView from './components/PlayerView';
import './index.css';

import {QueryClientContext} from "@tanstack/react-query";

const queryClient = new QueryClient();

// Create root element for rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render application using React Router for navigation

root.render(
    <React.StrictMode>
        {/* Envolver todo dentro del QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/player" element={<PlayerView />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
