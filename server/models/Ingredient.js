const { Types, Schema, model } = require("mongoose");

const ingredientsSchema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

module.exports = model('ingredients', ingredientsSchema);