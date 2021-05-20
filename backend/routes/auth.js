const Router = require("express");

const router = new Router();

const controller = require("../authController");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/", (req, res) => {
	res.send(req.user);
});
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
