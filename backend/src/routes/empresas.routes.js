import { Router } from "express"
import { listEmpresas, addEmpresa } from "../controllers/empresas.controller.js"

const router = Router()

// GET /empresas
router.get("/", listEmpresas)

// POST /empresas
router.post("/", addEmpresa)

export default router
