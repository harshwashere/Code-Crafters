import express from 'express'
import { contact } from '../controllers/contact-controller.js'

const contactRoute = express.Router()

contactRoute.post('/contacts', contact)

export default contactRoute