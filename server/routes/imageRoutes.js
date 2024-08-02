const express = require('express');
const multer = require('multer');

require('dotenv').config(); // Assuming you're using dotenv to manage your environment variables

// Initialize Supabase client
const supabase = require('../supabaseClient');
const router = express.Router();

// Multer setup for handling multipart/form-data
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Additional body fields
    const { club_id, uuid } = req.body;

    // Prepare file for upload
    const file = req.file;
    const filePath = `${club_id}/${uuid}`; // Unique path for each file, organized by club_id and uuid

    // Upload file to Supabase
    const { data, error } = await supabase.storage.from('images').upload(filePath, file.buffer, {
        contentType: file.mimetype,
    });

    if (error) {
        console.error('Supabase Storage Error:', error.message);
        return res.status(500).send('Error uploading file to Supabase.');
    }

    res.send('File uploaded successfully to Supabase.');
});

// Used to save the clubs images for their profile 
router.post('/clubProfileImage') , upload.single('file'), async (req, res) => {
    
}

module.exports = router;