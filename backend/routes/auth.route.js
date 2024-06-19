import express from 'express'
import { loginAuth, logoutAuth, registerAuth } from '../controllers/auth.controller.js';

const router =  express.Router();

router.post('/register',registerAuth)

router.post('/login',loginAuth)

router.post('/logout',logoutAuth)

export default router;