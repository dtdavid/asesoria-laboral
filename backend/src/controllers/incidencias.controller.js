import { getIncidenciasByEmpresaId, createIncidencia, getIncidenciaById } from "../services/incidencias.service.js"

// listar incidencia por empresa a partir de empresa_id
export async function listIncidencias(req, res, next) {

    try {
        
        const empresa_id = Number(req.query.empresa_id)

        if(!Number.isInteger(empresa_id) || empresa_id <= 0) {
            return res.status(400).json({
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

// crear nueva incidencia

export async function addIncidencia(req, res, next){
    try {
        const { empresa_id, tipo, fecha_inicio, trabajador_id} = req.body || {}

        //validación básica de campos obligatorios
        if(!empresa_id || !tipo || !fecha_inicio){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "Campos obligatorios: empresa_id, tipo, fecha_inicio",
                details: { missing_fields: ["empresa_id", "tipo", "fecha_inicio"].filter(f => !req.body[f]) },
                //error: "Campos obligatorios: empresa_id, tipo, fecha_inicio"
            })
        }    
        const empresa_id_num = Number(empresa_id)
        let trabajador_id_num = null

        if(!Number.isInteger(empresa_id_num) || empresa_id_num <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de empresa inválido.",
                details: { field: "empresa_id", value: empresa_id },
            })
        }

         if(trabajador_id != null && trabajador_id !== ""){
            trabajador_id_num = Number(trabajador_id)
            if (!Number.isInteger(trabajador_id_num) || trabajador_id_num <= 0)
         {
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID del trabajador inválido.",
                details: { field: "trabajador_id", value: trabajador_id },
            })
            }
        }
            

        //paso el payload con la validación numérica del empresa_id y trabajador_id
        const payload = { ...req.body, empresa_id: empresa_id_num, trabajador_id: trabajador_id_num }
        const nuevo = await createIncidencia(payload)
        return res.status(201).json({
            ok:true,
            data: nuevo
            })

    } catch (error)
     {

        //error.code 23505 es el código de error de Postgres para cuando no exista empresa)
        if(error?.code === "23503"){
            return res.status(409).json({
                ok:false,
                code: "FK_ERROR",
                message: "empresa_id o trabajador_id no existe",
                details: {
                    empresa_id: req.body.empresa_id, 
                    trabajador_id: req.body.trabajador_id ?? null
                },
                //error: "Campos obligatorios empresa_id, tipo, fecha_inicio"
            })
        }
       next(error) 
    }
}

// obtener incidencia por id

export async function getIncidencia(req, res, next){
    try {
        
        const id = Number(req.params.id)

        //validación entero positivo

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de incidencia inválido.",
                details: { field: "id", value: req.params.id },
                // error: "id no es un número entero positivo"
            })
        }

        const incidencia = await getIncidenciaById(id)
        if(!incidencia){
            return res.status(404).json({
                ok:false, code: "NOT_FOUND",
                message: "Incidencia no encontrada",
                details: {id},
                //error: "Incidencia no encontrada"
            })
        }
        return res.status(200).json({
            ok:true, 
            data: incidencia
        })

    } catch (error) {
        next(error)
    }
}