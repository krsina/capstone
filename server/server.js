const express = require('express');
const cors = require('cors');

// Routes for Authentication
const authRoute = require('./routes/auth');
const protectedRoute = require('./routes/protected');
const authVerify = require('./middleware/authVerify');

// Routes four Posting
const postRoutes = require('./routes/postRoutes');
const imageUploadRoute = require('./routes/imageRoutes');

// Routes for clubs
const clubRoutes = require('./routes/club/clubRoutes');
const clubInfoRoutes = require('./routes/club/clubInfo');
const clubJoinRoutes = require('./routes/club/joinClub');

// Used for port number and express
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/auth', authRoute)
app.use('/protected', authVerify, protectedRoute)
app.use('/club', clubRoutes);
app.use('/club/membership', clubJoinRoutes);
app.use('/club/info', clubInfoRoutes);
app.use('/posts', postRoutes);
app.use('/upload', imageUploadRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});