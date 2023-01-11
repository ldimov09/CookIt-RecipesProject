const Recipes = require('../models/Recipe');
const Users = require('../models/User');

async function getById(id) {
    return Recipes.findById(id).lean();
}

async function getAll(id) {
    return Recipes.find({}).lean(); 
}

async function createRecipe(recipe) {
    return Recipes.create(recipe);
}
 
module.exports ={
    getById,
    getAll,
    createRecipe,
}