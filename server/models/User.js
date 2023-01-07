const { Types, Schema, model } = require("mongoose");

const userSchema = new Schema({
    role: { type: String, enum: ['user', 'admin'], required: true, default: 'user'},
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    username: { type: String, required: true },
    myRecipes: [{ type: Types.ObjectId, ref: 'Recipes', default: [] }],
    reports: { type: Number, ref: 'Users', required: true },
});

userSchema.index({ email: 1 }, {
    options: {
        collation: {
            locale: 'en',
            strength: 2,
        }
    }
});

const Users = model('Users', userSchema);
module.exports = Users;