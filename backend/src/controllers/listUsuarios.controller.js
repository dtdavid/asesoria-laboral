import { getUsuariosByRole } from "../services/listUsuarios.service.js"

/** controlador de usuarios con role
 * 
 */

/**
 *Lista de usuarios por role
 *
 */

 export async function listUsuarios(req, res, next) {
    try {
       const role = req.query.role
    //    if(!role || (role !== "CLIENTE" && role !== "GESTOR"))
       if(role  !== "CLIENTE" ){
            return res.status(400).json({
                ok: false,
                code:"VALIDATION_ERROR",
                message: "Role de usuario inválido",
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