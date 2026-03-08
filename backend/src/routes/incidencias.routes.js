import { Router } from "express"
import { listIncidencias, addIncidencia, getIncidencia, editIncidencia, removeIncidencia } from "../controllers/incidencias.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"
import { requireRole } from "../middlewares/requireRole.js"

// router de incidencias por empresa

const router = Router()

// listar incidencias a partir de una empresa_id

router.get("/", requireAuth, requireRole("GESTOR"), listIncidencias)

// obtener incidencia por id

router.get("/:id", requireAuth, requireRole("GESTOR"), getIncidencia)

// añadir incidencia

router.post("/", requireAuth, requireRole("GESTOR"), addIncidencia)

// actualizar incidencia

router.put("/:id", requireAuth, requireRole("GESTOR"), editIncidencia)

// eliminar incidencia

router.delete("/:id", requireAuth, requireRole("GESTOR"), removeIncidencia)


export default router