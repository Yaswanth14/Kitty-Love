const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    email: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: String,
    name: String,
    bio: String,
    gender: String,
    photo: {
        data: Buffer,
        contentType: String
    },
    hasphoto: {
        type: Boolean,
        default: false
    },
    crushcount: {
        type: Number,
        default: 0
    },
    crushlist: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dms: {
        type: [String],
        default: ["Hello from team Kitty Love 💕", "Here I am sliding right into your dms 🦦"]
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

userSchema.methods.generateJWT = function() {
    const token = jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    return token;
}

module.exports.User = model('User', userSchema);