const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    
    async getUser({ email, password }) { 
        
        let objError = { 
            status: 407, 
            data: 'User or password incorrect' 
        }; 
    
        try {
            const user = await User.findOne({ email });

            if (!user) return objError;

            const id = user['_id']; 

            const token = jwt.sign({ id }, process.env.SECRET);

            const isMatch = await bcrypt.compare(password, user.password)

            return isMatch === true ? { 
                status: 200, 
                data: user, 
                token: token 
            } : objError

        } catch (e) {
            return { status: 500, data: 'Internal Error 2' }
        }
    },
}