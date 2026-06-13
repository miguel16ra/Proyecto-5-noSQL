const express = require('express');
const {connect} = require('./utils/db');
const moviesRoutes = require('./routes/movies.routes');

connect();

const PORT = 3000;
const server = express();

server.use(express.json());
server.use('/', moviesRoutes);

server.use((req, res, next) => {
	const error = new Error('Route not found');
	error.status = 404;
	next(error);
});

server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

server.listen(PORT, () => {
  console.log(`Server running in <http://localhost>:${PORT}`);
});