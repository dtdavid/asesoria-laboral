import { Router } from "express"
import { getEmpresa, listEmpresas, addEmpresa, removeEmpresa, editEmpresa } from "../controllers/empresas.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"
import { requireRole } from "../middlewares/requireRole.js"

/**
 * Router de empresas.
 * Define los endpoints relacionados con empresas.
 */

const router = Router()

// GET /empresas
router.get("/", listEmpresas)

// GET /empresas/:id
router.get("/:id", getEmpresa)


//Protegemos las rutas de modificación con autenticación y rol de gestor
// POST /empresas
router.post("/", requireAuth, requireRole("GESTOR"), addEmpresa)

// DELETE /empresas/:id
router.delete("/:id", requireAuth, requireRole("GESTOR"), removeEmpresa)

// PUT /empresas/:id
router.put("/:id", requireAuth, requireRole("GESTOR"), editEmpresa)


export default router
