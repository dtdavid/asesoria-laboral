import { Router } from "express"
import { requireAuth } from "../middlewares/requireAuth.js"
import {requireRole} from "../middlewares/requireRole.js"
import { getMyEmpresa, getMyTrabajadores, getMyIncidencias } from "../controllers/me.controller.js"



const router = Router()

// GET /me/empresa

router.get("/empresa", requireAuth, requireRole("CLIENTE"), getMyEmpresa)

// GET /me/trabajadores
router.get("/trabajadores", requireAuth, requireRole("CLIENTE"), getMyTrabajadores)

// GET /me/incidencias

router.get("/incidencias", requireAuth, requireRole("CLIENTE"), getMyIncidencias)

export default router