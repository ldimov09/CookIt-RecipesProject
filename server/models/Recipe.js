const { Types, Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'Users', required: true},
    tags: [{ type: Types.ObjectId, ref: 'Tags', default: []}],
    imageUrl: {type: String, required: true},
    title: {type: String, required: true},
    ingredients: [{type: Types.ObjectId, ref: 'Ingredients', default: [] }],
    description: {type: String, required: true},
    comments: [{type: Types.ObjectId, ref: 'Comments', default: []}],
    likes: [{ type: Types.ObjectId, ref: 'Users', default: [] }],
    dislikes: [{ type: Types.ObjectId, ref: 'Users', default: [] }],
});


const Recipe = model('Recipes', recipeSchema);
module.exports = Recipe;