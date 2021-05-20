const jwt = require("jsonwebtoken");

const {secret} = require("./secretKey");

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		next();
	}

	try {
		console.log(req.headers);
		const token = req.headers.authorization;
		if (!token) {
			return res.json({message: "Пользователь не авторизован"});
		}
		const decodedData = jwt.verify(token, secret);
		req.user = decodedData;
		next();
	}

	catch (e) {
		return res.json({message: "Пользователь не авторизован"});
	}
};
