const User = require("../models/User")
const bcrypt = require("bcrypt")
const { api } = require("./helpers")
const { server } = require('..')
const mongoose = require("mongoose")

describe("Creating a new user", () => {

	beforeEach(async () => {
		await User.deleteMany({})
		const passwordHash = bcrypt.hashSync("1234", 10)
		await User.create({ userName: "JaimeTest", name: "Jaime", passwordHash })
	})

	test("works as expected creating a fresh userName", async () => {

		const userInit = await User.find()

		const newUser = { userName: "midudev", name: "midu", password: "twitch" }

		await api
			.post("/api/user")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const userFinal = await User.find()


		expect(userFinal).toHaveLength(userInit.length + 1)

		const userNames = userFinal.map(elem => elem.userName)
		expect(userNames).toContain(newUser.userName)

	})

	test("creation fails with proper statuscoe and message if username is already taken", async () => {
		const userInit = await User.find()
		const newUser = { userName: "JaimeTest", name: "midu", password: "twitch" }

		const result = await api
			.post("/api/user")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/)

		expect(result.body.error.code).toBe(11000)
		const userFinal = await User.find()
		expect(userFinal).toHaveLength(userInit.length)



	})

	afterAll(() => {
		moongose.connection.close()
		server.close()
	})


})