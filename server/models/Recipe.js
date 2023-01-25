const { Types, Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'Users', required: true},
    tags: [{ type: String,  default: []}],
    imageurl: {type: String, required: true},
    title: {type: String, required: true},
    ingredients: [{type:  String, default: [], required: true }],
    description: {type: String, required: true},
    comments: [{type: Types.ObjectId, ref: 'Comments', default: []}],
    likes: [{ type: Types.ObjectId, ref: 'Users', default: [] }],
    dislikes: [{ type: Types.ObjectId, ref: 'Users', default: [] }],
    cookTime: { type: String, required: true},
    servings: { type: Number, required: true}
});


const Recipe = model('Recipes', recipeSchema);
module.exports = Recipe;