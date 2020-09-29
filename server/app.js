const express = require('express');
const app = express();
app.use(express.static('build'));
app.use(express.json())
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

app.use('/api/', require('./api'))



module.exports = app;