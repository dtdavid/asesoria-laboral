import { Router } from "express";
import { listUsuarios } from "../controllers/listUsuarios.controller.js";
import { assignEmpresa } from "../controllers/assignEmpresa.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"
import { requireRole } from "../middlewares/requireRole.js"

/**
 * Router de usuarios.
 * Define los endpoints relacionados con usuarios.
 */


const router = Router()

// ruta para obtener lista de usuarios con role = "CLIENTE"

router.get("/", requireAuth, requireRole("GESTOR"), listUsuarios)

// ruta para asignar empresa a cliente

router.patch("/:id/asignar-empresa", requireAuth, requireRole("GESTOR"), assignEmpresa)

export default router