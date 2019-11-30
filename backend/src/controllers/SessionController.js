const AuthService = require('../service/AuthService');
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { name, email, password, passwordConfirmation } = req.body;

        if (password !== passwordConfirmation)
            return res.status(401).json({ message: 'passwords are differents' })

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email, password });
            return res.json(user);
        }

        return res.status(402).json({ error: "email has already been taken" });
    },

    async auth(req, res) {
        let response = await AuthService.getUser(req.body);

        if (response.status !== 200) {
            return res.status(response.status).json({ error: response.data });
        }
        
        answer = {
            name: response.data.name,
            _id: response.data._id,
            token: response.token
        }

        res.setHeader('token', response.token);
        res.status(response.status).json(answer);
    }
};
