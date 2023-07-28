const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saveUser = (req, res, next) => {
	const { userName, name, password } = req.body

	const passwordHash = bcrypt.hashSync(password, 10)

	User
		.create({ userName, name, passwordHash })
		.then((response) => res.status(201).json(response))
		.catch((error) => res.status(400).json({ error }))
}

const logIn = async (req, res, next) => {
	const { userName, password } = req.body

	const user = await User.findOne({ userName })

	const passWordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

	if (!passWordCorrect) {
		res.status(401).json({ error: 'invalid user or password' })
	}

	const userForToken = {
		id: user._id,
		userName: user.userName
	}

	const token = jwt.sign(
		userForToken,
		process.env.SECRET,
		{ expiresIn: '6h' })

	res.json({ token: token })
}

module.exports = { saveUser, logIn }
