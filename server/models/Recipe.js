const { Types, Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'Users', required: true},
    tags: [{ type: Types.ObjectId, ref: 'Tags', default: []}],
    imageUrl: {type: String, required: true},
    title: {type: String, required: true},
    ingredients: [{type: /*TODO: Types.ObjectId!*/ String, ref: 'Ingredients', default: [], required: true }],
    description: {type: String, required: true},
    comments: [{type: Types.ObjectId, ref: 'Comments', default: []}],
    likes: [{ type: Types.ObjectId, ref: 'Users', default: [] }],
    dislikes: [{ type: Types.ObjectId, ref: 'Users', default: [] }],
    cookTime: { type: String, required: true},
    servings: { type: Number, required: true}
});


const Recipe = model('Recipes', recipeSchema);
module.exports = Recipe;