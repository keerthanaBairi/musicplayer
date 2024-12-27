const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static music files from the 'music' directory
app.use('/music', express.static(path.join(__dirname, 'music')));

// API to fetch the list of songs
app.get('/api/songs', (req, res) => {
    const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
    res.json({ songs });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../client')));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
