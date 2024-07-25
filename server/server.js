const express = require('express');
const cors = require('cors');

// Route Imports
const authRoute = require('./routes/auth');
const postRoutes = require('./routes/postRoutes');
const imageUploadRoute = require('./routes/imageRoutes');
const clubRoutes = require('./routes/clubRoutes');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/', authRoute)
app.use('/posts', postRoutes);
app.use('/upload', imageUploadRoute);
app.use('/club', clubRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});