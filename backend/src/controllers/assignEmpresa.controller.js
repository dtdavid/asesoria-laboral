import { assignEmpresaToUsuario } from "../services/assignEmpresa.service.js"
import  { getUserById } from "../services/usuarios.service.js"
import { getEmpresaById } from "../services/empresas.service.js"




/**
 * PATCH /usuarios/:id/asignar-empresa
 * Asigna una empresa a un usuario cliente.
 */

export async function assignEmpresa(req, res, next) {
        
    
        try {
          
           const id = Number(req.params.id)
           if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                ok: false,
                code:"VALIDATION_ERROR",
                message: "ID de usuario inválido",
                details: { field: "id", value: req.params.id },
                //error: "ID de usuario inválido"
            })
           }
           const empresa_id = Number(req.body?.empresa_id)
           if(!Number.isInteger(empresa_id) || empresa_id <= 0) {
            return res.status(400).json({
                ok: false,
                code:"VALIDATION_ERROR",
                message: "ID de empresa inválido",
                details: { field: "empresa_id", value: req.body.empresa_id },
                //error: "ID de empresa inválido"
            })
        }
        const user = await getUserById(id)
        
        if(!user){
            return res.status(404).json({
                ok:false, 
                code: "NOT_FOUND",
                message: "Usuario no encontrado",
                details: {id},
                //error: "Usuario no encontrado"
            })
        }
        
        if(user.role !== "CLIENTE"){
            return res.status(400).json({
                ok:false, 
                code: "VALIDATION_ERROR",
                message: "Solo se puede asignar empresa a usuarios con rol CLIENTE",
                details: {id, role: user.role},
                //error: "Usuario sin permiso"
            })
        }
        const empresa = await getEmpresaById(empresa_id)
        if (!empresa){
            return res.status(404).json({
                ok:false, 
                code: "NOT_FOUND",
                message: "Empresa no encontrada",
                details: {empresa_id},
                //error: "Empresa no encontrada"
            })
        }
        const updated = await assignEmpresaToUsuario( id, empresa_id )
        if(!updated){
            return res.status(404).json({
                ok:false, 
                code: "NOT_FOUND",
                message: "No se pudo asignar la empresa al usuario",
                details: { id, empresa_id },
                //error: "No se pudo actualizar la assignación"
            })
        }
        return res.status(200).json({ok:true, data: updated})
        
        } 
        catch (error) {
            next(error)
        }
}