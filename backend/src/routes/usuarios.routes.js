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

// GET /usuarios?role=CLIENTE
router.get("/", requireAuth, requireRole("GESTOR"), listUsuarios)

// PATCH /usuarios/:id/asignar-empresa
router.patch("/:id/asignar-empresa", requireAuth, requireRole("GESTOR"), assignEmpresa)

export default router