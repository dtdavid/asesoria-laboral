import { Router } from "express"
import { listIncidencias } from "../controllers/incidencias.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"
import { requireRole } from "../middlewares/requireRole.js"

// router de incidencias por empresa

const router = Router()

// listar incidencias a partir de una empresa_id

router.get("/", requireAuth, requireRole("GESTOR"), listIncidencias)


export default router