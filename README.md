# 🎬 Video Slicer — React Video Clipping App

This project is a technical challenge focused on frontend development using **React**. The goal is to create a video clipping tool that allows users to split a video into multiple segments (clips), with additional features for editing, tagging, filtering, and viewing.

🔗 **Video Source:**  
https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4

---

##  Features (Requirements Fulfilled)

###  Mandatory Features
- HTML5 video player using media fragments (`start`, `end`)
- Initial clip list includes the full video
- Form to add clips with name, start time, end time
- List of saved clips
- Play a clip in the video player by clicking it
- Delete a clip (excluding full video)
- Edit a clip's name, time, and tags

###  Bonus Features Implemented
-  Auto-jump to the next clip with 3-second delay + loader animation
-  Tag input and tag filtering by name
-  Save and load clips using `localStorage` (persistent across reloads)
-  Hotkeys to jump to next (→) and previous (←) clips
-  Timeline markers that show where each clip begins (in full video mode)
-  Clickable timeline markers to play the clip
-  Separate read-only page to reuse the player and playlist without editing (`/player` route)

---

##  Tech Stack

- React.js (Functional Components + Hooks)
- React Router (Routing)
- HTML5 Video
- CSS3 (Responsive Design)
- LocalStorage (Persistent State)

---
##  How to Test the Project

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/JuanEstebanVictoria/Video-slice.git

npm install

npm start

This will launch the app at:

📍 http://localhost:3000