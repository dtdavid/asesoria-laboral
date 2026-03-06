import { getIncidenciasByEmpresaId } from "../services/incidencias.service.js"

// listar incidencia por empresa a partir de empresa_id
export async function listIncidencias(req, res, next) {

    try {
        
        const empresa_id = Number(req.query.empresa_id)

        if(!Number.isInteger(empresa_id) || empresa_id <= 0) {
            return resizeBy.status(400).json({
                ok: false,
                code: "VALIDATION_ERROR",
                message: "ID de empresa inválido",
                details: { field: "empresa_id",
                    value: req.query.empresa_id
                }
                //error: "ID de empresa inválido"
        
            })
        }
        const incidencias = await getIncidenciasByEmpresaId(empresa_id)
        return res.status(200).json({
            ok: true,
            data: incidencias
        })


    } catch (error) {
        next(error)
    }
}