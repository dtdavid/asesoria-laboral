import { Router } from "express";
import { listTrabajadores, getTrabajador, addTrabajador, removeTrabajador, editTrabajador } from "../controllers/trabajadores.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js"
import { requireRole } from "../middlewares/requireRole.js"

/**
 * Router de trabajadores.
 * Define los endpoints relacionados con trabajadores.
 */


const router = Router()

// Aquí se definirán los endpoints relacionados con trabajadores

// listar trabajadores por id de empresa
router.get("/", requireAuth, requireRole("GESTOR"),  listTrabajadores)

// GET /trabajadores/:id
router.get("/:id", requireAuth, requireRole("GESTOR"),  getTrabajador)

// POST /trabajadores
router.post("/", requireAuth, requireRole("GESTOR"), addTrabajador) 

// PUT /trabajadores/:id
router.put("/:id", requireAuth, requireRole("GESTOR"), editTrabajador)

// DELETE /trabajadores/:id
router.delete("/:id", requireAuth, requireRole("GESTOR"), removeTrabajador)


export default router