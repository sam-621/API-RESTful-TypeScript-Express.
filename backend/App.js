//API created by @rogeliosamuel21

const express = require('express');
const { port } = require('./config');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/Users');

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(cors());

//ROUTES
app.use('/explorespace/api/', authRoutes);
app.use('/explorespace/api/', userRoutes);

//SERVER
app.listen(port, () => console.log('Everything OK'));