import express from 'express'
import {
  changeStatusController,
  createScheduleController,
  getAllScheduleController,
  getDetailScheduleController,
} from '../controllers/schedule.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/', authenticateToken, getAllScheduleController)
router.get('/:id_schedule', authenticateToken, getDetailScheduleController)
router.post('/', authenticateToken, createScheduleController)
router.put('/', authenticateToken, changeStatusController)

export default router
