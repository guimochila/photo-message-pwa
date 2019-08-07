const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.Server(app);

// Static content
app.use(express.static(path.join(__dirname, '..', 'app')));
app.use('/modules', express.static(path.join(__dirname, '..', 'node_modules')));

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
