import { Router } from "express"
import { listEmpresas, addEmpresa, removeEmpresa, editEmpresa } from "../controllers/empresas.controller.js"


/**
 * Router de empresas.
 * Define los endpoints relacionados con empresas.
 */

const router = Router()

// GET /empresas
router.get("/", listEmpresas)

// POST /empresas
router.post("/", addEmpresa)

// DELETE /empresas/:id
router.delete("/:id", removeEmpresa)

// PUT /empresas/:id
router.put("/:id", editEmpresa)


export default router
