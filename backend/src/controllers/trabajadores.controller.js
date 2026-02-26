import { getTrabajadores } from "../services/trabajadores.service.js";

/** controlador de trabajadores
 * aquí se implementarán las funciones que manejarán las peticiones relacionadas con los trabajadores
 * 
 */

/**
 *Lista de trabajadores por empresa_id(query param)
 *GET /trabajadores?empresa_id=2
 */
export async function listTrabajadores(req, res, next) {
    //req se espera que tenga un parámetro id (req.query.empresa_id) que es el ID de la empresa de la que se quieren listar los trabajadores

    try {
        const id = Number(req.query.empresa_id)
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                code:"VALIDATION_ERROR",
                message: "ID de empresa inválido",
                details: { field: "empresa_id", value: req.query.empresa_id },
                //error: "ID de empresa inválido"
            })
        }
        const trabajadores = await getTrabajadores(id)
        return res.status(200).json({ ok: true, data: trabajadores })
        
    } catch (error) {
        next(error)
    }
}