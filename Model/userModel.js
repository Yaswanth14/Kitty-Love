const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    email: { 
        type: String,
        required: true
    }
}, {timestaps: true});

userSchema.methods.generateJWT = function() {
    const token = jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    return token;
}

module.exports.User = model('User', userSchema);