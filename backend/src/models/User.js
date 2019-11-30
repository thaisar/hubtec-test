const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();
    let salt = bcrypt.genSaltSync(10);

    bcrypt.genSalt(Number(salt), function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);