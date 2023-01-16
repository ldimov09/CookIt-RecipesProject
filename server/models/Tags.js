const { Types, Schema, model } = require("mongoose");

const tagSchema = new Schema({
    name: { type: String, required: true },
    incompatible: [{type: String, required: true, default: []}]
});
const Tags = model('Tags', tagSchema);
module.exports = Tags