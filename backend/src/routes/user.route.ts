import express from 'express'
import { getAllVendorController } from '../controllers/user.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/vendor', authenticateToken, getAllVendorController)

export default router
