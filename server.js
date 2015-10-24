"use strict"

var express = require('express');
var app = express();

app.use(express.static('.'));

app.listen( process.env.PORT || 3000);

console.log('');
console.log('=========================================');
console.log('Server listening at http://localhost:3000');
console.log('=========================================');
console.log('');
