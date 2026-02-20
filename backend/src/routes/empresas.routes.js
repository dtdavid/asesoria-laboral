import { Router } from "express"
import { listEmpresas } from "../controllers/empresas.controller.js"

const router = Router()

// GET /empresas
router.get("/", listEmpresas)

export default router
