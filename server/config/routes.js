const express = require("express");
//onst bodyParser = require("body-parser");
let cors = require('cors');
const authController = require("../controllers/authController");
const recipeController = require("../controllers/recipeController");

module.exports = function (app) {
    app.use(cors()); 
    app.use(express.json());
    //app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api/auth/', authController)
    app.use('/api/', recipeController)
}