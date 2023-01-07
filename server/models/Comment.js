const { Types, Schema, model } = require("mongoose");

const commentSchema = new Schema({
    message: { type: String, required: true },
    repliedTo: { type: Types.ObjectId, ref: "Comments", required: true },
    userId: { type: Types.ObjectId, ref: "Users", required: true },
});

module.exports = model('Comments', commentSchema);