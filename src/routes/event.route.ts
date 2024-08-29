import express from 'express'
import {
  createEventController,
  getAllEventsController,
} from '../controllers/event.controller'

const router = express.Router()

router.get('/', getAllEventsController)
router.post('/', createEventController)

export default router
