const express = require('express');
const { port } = require('./config');

const authRoutes = require('./routes/Auth');

const app = express();

app.use(express.json());

//Routes
app.use('/explorespace/api/', authRoutes);

app.listen(port, () => console.log('Everything OK'));