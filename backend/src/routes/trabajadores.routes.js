import { Router } from "express";
import { listTrabajadores } from "../controllers/trabajadores.controller.js";
/**
 * Router de trabajadores.
 * Define los endpoints relacionados con trabajadores.
 */


const router = Router()

// Aquí se definirán los endpoints relacionados con trabajadores

// listar trabajadores por id de empresa
router.get("/", listTrabajadores)

// GET /trabajadores/:id
//router.get("/:id", getTrabajador)

// POST /trabajadores
//router.post("/", addTrabajador) 

// PUT /trabajadores/:id
//router.put("/:id", editTrabajador)

// DELETE /trabajadores/:id
//router.delete("/:id", removeTrabajador)


export default router