const notesRoutes = require("./notes.routes")
const router = require("express").Router()

router.use("/notes", notesRoutes)
router.use("/user", require("./user.routes"))

module.exports = router