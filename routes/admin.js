import express from 'express'

import { viewOrders , addProduct , addAccount , login , authenticate } from "../controllers/admin.js"


const router = express.Router();

//  GET requests
router.get('/view-orders',authenticate,viewOrders)

// POST requests

router.post('/login',login)

router.post('/add-product',authenticate,addProduct)

router.post('/add-account',addAccount)



export default router;