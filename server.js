//Dependencies
const express   = require('express');
const mongoose  = require('mongoose');
const path      = require('path');
const app       = express();
const dotenv    = require('dotenv');
dotenv.config();
const db        = mongoose.connection;


app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


//Environment Variables
const PORT      =   process.env.PORT || 5000;
const mongoURI  =   process.env.MONGODB_URI;

// Routes
const todosController = require('./controllers/todos.js');
app.use('/todos', todosController);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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