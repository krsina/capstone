const express = require('express');
const cors = require('cors');

// Route Imports
const authRoute = require('./routes/auth');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/', authRoute)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});