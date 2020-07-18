//Dependencies
const express   = require('express');
const mongoose  = require('mongoose');
const app       = express();
const dotenv    = require('dotenv');
dotenv.config();
const db        = mongoose.connection;


app.use(express.json());
app.use(express.static('public'));


//Environment Variables
const PORT      =   process.env.PORT || 4000;
const mongoURI  =   process.env.MONGODB_URI;

// Routes
const todosController = require('./controllers/todos.js');
app.use('/todos', todosController);

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('MongoDB connection established')
);

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));


app.listen(PORT, () => {
    console.log('Let\'s get things done on port', PORT);
});