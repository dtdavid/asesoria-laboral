import { getUsuariosByRole } from "../services/listUsuarios.service.js"

/**
 * GET /usuarios
 * Lista usuarios filtrados por role.
 */

 export async function listUsuarios(req, res, next) {
    try {
       const role = req.query?.role
    
       if(role  !== "CLIENTE" ){
            return res.status(400).json({
                ok: false,
                code:"VALIDATION_ERROR",
                message: "El rol debe ser CLIENTE",
                details: { field: "role", value: req.query.role },
                //error: "Role no existe o no es válido"
            })
       } 
       const usuarios = await getUsuariosByRole( role )
       return res.status(200).json({ 
        ok: true, 
        data: usuarios })


    } 
    catch (error) {
        next(error)
    }
 }