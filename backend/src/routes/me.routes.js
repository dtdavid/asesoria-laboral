import { Router } from "express"
import { requireAuth } from "../middlewares/requireAuth.js"
import { requireRole } from "../middlewares/requireRole.js"
import { getMyEmpresa, getMyTrabajadores } from "../controllers/me.controller.js"



const router = Router()

// GET /me/empresa

router.get("/empresa", requireAuth, getMyEmpresa)

// GET /me/trabajadores
router.get("/trabajadores", requireAuth, getMyTrabajadores)


export default router