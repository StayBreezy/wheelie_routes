const bcrypt = require("bcryptjs");

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get("db");
        const result = await db.user.find_user_by_username([username])
        const existingUser = result[0];
        if(existingUser) {
            return res.status(409).send('Username Taken');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.user.create_user([username, hash]);
        const user = registeredUser[0];
        req.session.user = {
            id: user.user_id,
            username: user.username,
            password: user.password,
        };
        return res.status(201).send(req.session.user);
    },
    login: (req, res) => {

    },
    logout: (req, res) => {

    },
    delete: (req, res) => {

    }
}
