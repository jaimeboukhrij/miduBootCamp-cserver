const { saveUser, logIn } = require("../controllers/user.controllers")

const router = require("express").Router()

router.post("/", saveUser)
router.post("/login", logIn)

module.exports = router