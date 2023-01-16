const Recipes = require('../models/Recipe');
const Users = require('../models/User');
const Tags = require('../models/Tags');

async function getById(id) {
    return Recipes.findById(id).lean();
}

async function getAll(id) {
    return Recipes.find({}).lean(); 
}

async function createRecipe(recipe) {
    return Recipes.create(recipe);
}

async function createTag(tag) {
    return Tags.create(tag);
}

async function getAllTags(){
    return Tags.find({}).lean();
}
 
module.exports ={
    getById,
    getAll,
    createRecipe,
    createTag,
    getAllTags
}