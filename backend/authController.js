const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./models/users");
const {secret} = require("./secretKey");

const generateAccessToken = (id) => {
	const payload = {id};
	return jwt.sign(payload, secret, {expiresIn: "24h"});
};

class AuthController {
	async registration(req, res) {
		try {
			const {username, password, email} = req.body;
			const candidate = await Users.findOne({username});
			if (candidate) {
				return res.json({message: "User already exists"});
			}
			const hashPassword = bcrypt.hashSync(password, 7);
			const user = new Users({username, password: hashPassword, email});
			await user.save();
			return res.json({message: "User successfully registered"});
		}

		catch (e) {
			res.status(400).json({message: "Registration error"});
		}

		return true;
	}

	async login(req, res) {
		try {
			const {username, password} = req.body;
			const user = await Users.findOne({username});

			if (!user) {
				return res.json({message: "User did not found"});
			}

			const validPassword = bcrypt.compareSync(password, user.password);

			if (!validPassword) {
				return res.json({message: "Invalid password"});
			}

			const token = generateAccessToken(user._id);
			return res.json({username, token});
		}

		catch (e) {
			res.status(400).json({message: "Login error"});
		}
		return true;
	}
}

module.exports = new AuthController();
