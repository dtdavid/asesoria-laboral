import { Router } from "express";
import { listUsuarios } from "../controllers/listUsuarios.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js"
import { requireRole } from "../middlewares/requireRole.js"

/**
 * Router de usuarios.
 * Define los endpoints relacionados con usuarios.
 */


const router = Router()

// ruta para obtener lista de usuarios con role = "CLIENTE"
router.get("/", requireAuth, requireRole("GESTOR"), listUsuarios)



export default router