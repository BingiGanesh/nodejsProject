import express from 'express'
import { myOrders, login, orderProduct, addAccount, searchProduct, authenticate } from "../controllers/customer.js"



const router = express.Router();

// GET requests

router.get('/my-orders',authenticate,myOrders)

// POST requests

router.post('/login',login)

router.post('/order-product',authenticate,orderProduct)

router.post('/add-account',addAccount)

router.post('/search-product/:search',authenticate,searchProduct)

export default router;

