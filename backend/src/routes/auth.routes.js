import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";


/** 
 * Router de autenticación
 * Define los endpoints de registro y login.
 */

const router = Router()

// POST /auth/registro

router.post("/registro", register )

//POST /auth/login

router.post("/login", login)

export default router