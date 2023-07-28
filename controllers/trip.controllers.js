const Note = require("../models/Note")


const homePage = (request, res, next) => {
	console.log(request.ip)
	console.log(request.ips)
	console.log(request.originalUrl)
	response.send('<h1>Hello World!</h1>')
}

const getNotes = (request, response, next) => {
	Note
		.find({})
		.then((notes) => response.json(notes))
		.catch(e => next(e))
}

const getOneNote = (request, response, next) => {
	const { id } = request.params

	Note.findById(id)
		.then(note => {
			if (note) return response.json(note)
			response.status(404).end()
		})
		.catch(err => next(err))
}

const editNote = (request, response, next) => {
	const { id } = request.params
	const note = request.body

	const newNoteInfo = {
		content: note.content,
		important: note.important
	}

	Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
		.then(result => {
			response.json(result)
		})
		.catch(next)
}


const deleteNote = async (request, response, next) => {
	const { id } = request.params

	Note
		.findByIdAndDelete(id)
		.then((res) => res == null ? response.sendStatus(404) : response.status(204).end())
		.catch(next)
}


const saveNote = async (request, response, next) => {
	const note = request.body

	if (!note.content) {
		return response.status(400).json({
			error: 'required "content" field is missing'
		})
	}

	const newNote = new Note({
		content: note.content,
		date: new Date(),
		important: note.important || false
	})

	try {
		const savedNote = await newNote.save()
		response.json(savedNote)
	} catch (error) {
		next(error)
	}
}


module.exports = { getNotes, getOneNote, homePage, editNote, deleteNote, saveNote }