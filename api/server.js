/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const server = express();

server.set('trust proxy', 1);
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(port, () => {
  console.log('Server running at port:', port);
});
