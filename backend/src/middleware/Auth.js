const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    const token = req.headers.token
    if (!token) return res.status(401).json({ message: 'Undefined Token' });
    try {
        const decodedToken = await promisify(jwt.verify)(token, process.env.SECRET);
       
            const user = await User.findById({ _id: decodedToken.id });
       
            if (!user) return res.status(401).json({ message: 'Undefined user' })
       
            req.id = user.id
            return next()
    } catch (err) {
        return res.status(401).json({ message: 'Incorrect Token' });
    }
}