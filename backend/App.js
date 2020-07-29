const express = require('express');
const { port } = require('./config');

const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/Users');

const app = express();

app.use(express.json());

//Routes
app.use('/explorespace/api/', authRoutes);
app.use('/explorespace/api/', userRoutes);

app.listen(port, () => console.log('Everything OK'));
