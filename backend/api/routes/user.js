const express =require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup",UserController.user_signup);

router.post("/login",UserController.user_login);

router.get("/",UserController.user_get_all);

router.get("/:userId",UserController.users_get_user);

//router.patch("/:userId",UserController.users_updates_user );



router.delete("/:userId",checkAuth,UserController.user_delete);

module.exports = router;