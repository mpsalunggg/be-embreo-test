import express from 'express'
import {
  createEventController,
  getAllEventsController,
} from '../controllers/event.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/', authenticateToken, getAllEventsController)
router.post('/', authenticateToken, createEventController)

export default router
