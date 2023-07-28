const notesRoutes = require("express").Router()
const { getNotes, getOneNote, editNote, deleteNote, saveNote } = require('../controllers/trip.controllers')
const { isAuthenticated } = require("../middleware/verifyToken.middleware")



notesRoutes.get('/', getNotes)
notesRoutes.get('/:id', getOneNote)
notesRoutes.put('/:id', isAuthenticated, editNote)
notesRoutes.delete('/:id', isAuthenticated, deleteNote)
notesRoutes.post('/', isAuthenticated, saveNote)


module.exports = notesRoutes