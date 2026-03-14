import { Router } from "express"
import { 
    listIncidencias, 
    addIncidencia, 
    getIncidencia, 
    editIncidencia, 
    removeIncidencia 
} from "../controllers/incidencias.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"
import { requireRole } from "../middlewares/requireRole.js"

/**
 * Router de incidencias.
 * Define los endpoints relacionados con incidencias.
 */

const router = Router()

// GET /incidencias?empresa_id=...
router.get("/", requireAuth, requireRole("GESTOR"), listIncidencias)

// GET /incidencias/:id
router.get("/:id", requireAuth, requireRole("GESTOR"), getIncidencia)

// POST /incidencias
router.post("/", requireAuth, requireRole("GESTOR"), addIncidencia)

// PUT /incidencias/:id
router.put("/:id", requireAuth, requireRole("GESTOR"), editIncidencia)

// DELETE /incidencias/:id
router.delete("/:id", requireAuth, requireRole("GESTOR"), removeIncidencia)


export default router