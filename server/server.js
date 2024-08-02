const express = require('express');
const cors = require('cors');

// Route Imports
const authRoute = require('./routes/auth');
const protectedRoute = require('./routes/protected');
const authVerify = require('./middleware/authVerify');

const postRoutes = require('./routes/postRoutes');
const imageUploadRoute = require('./routes/imageRoutes');
const clubRoutes = require('./routes/club/clubRoutes');
const clubJoinRoutes = require('./routes/club/joinClub');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/auth', authRoute)
app.use('/protected', authVerify, protectedRoute)
app.use('/club', clubRoutes);
app.use('/club/membership', clubJoinRoutes);
app.use('/posts', postRoutes);
app.use('/upload', imageUploadRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});