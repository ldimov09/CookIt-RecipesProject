
const express = require("express");
//onst bodyParser = require("body-parser");
let cors = require('cors');

module.exports = function (app) {
    app.use(cors()); 
    app.use(express.json());
    //app.use(bodyParser.urlencoded({extended: true}));
}