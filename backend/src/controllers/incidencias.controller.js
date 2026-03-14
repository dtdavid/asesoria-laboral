import { getIncidenciasByEmpresaId, createIncidencia, getIncidenciaById, updateIncidenciaById, deleteIncidenciaById } from "../services/incidencias.service.js"

/**
 * 
 * GET /incidencias
 * Listar incidencias por empresa_id.
 */

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

/**
 * POST /incidencias
 * Crea una nueva incidencia 
 */

export async function addIncidencia(req, res, next){
    try {
        const { empresa_id, tipo, fecha_inicio, trabajador_id} = req.body || {}

        const missingFields = ["empresa_id", "tipo", "fecha_inicio"].filter(
            (field) => !req.body?.[field]
            )

            if (missingFields.length > 0) {
            return res.status(400).json({
                ok: false,
                code: "VALIDATION_ERROR",
                message: `Campos obligatorios: ${missingFields.join(", ")}`,
                details: { missing_fields: missingFields },
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
                message: "ID del trabajador inválido",
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

/**
 * GET /incidencias/:id
 * Obtiene una incidencia por su id 
 */

export async function getIncidencia(req, res, next){
    try {
        
        const id = Number(req.params.id)

        //validación entero positivo

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de incidencia inválido",
                details: { field: "id", value: req.params.id },
                // error: "id no es un número entero positivo"
            })
        }

        const incidencia = await getIncidenciaById(id)
        if(!incidencia){
            return res.status(404).json({
                ok:false, 
                code: "NOT_FOUND",
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

/**
 * PUT incidencia/:id
 * Actualiza una incidencia existente 
 */

export async function editIncidencia(req, res, next){
    try {
        
        const id = Number(req.params.id)
        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de incidencia inválido",
                details: { field: "id", value: req.params.id },
                 //error: "ID de incidencia inválido"
            })
        }

        const missingFields = ["tipo", "estado", "fecha_inicio"].filter(
            (field) => !req.body?.[field]
            )

            if (missingFields.length > 0) {
            return res.status(400).json({
                ok: false,
                code: "VALIDATION_ERROR",
                message: `Campos obligatorios: ${missingFields.join(", ")}`,
                details: { missing_fields: missingFields },
            })
            }

        const { trabajador_id } = req.body
        let trabajador_id_num = null

        if(trabajador_id != null && trabajador_id !== ""){
            trabajador_id_num = Number(trabajador_id)
            if (!Number.isInteger(trabajador_id_num) || trabajador_id_num <= 0)
         {
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID del trabajador inválido",
                details: { 
                    field: "trabajador_id", 
                    value: trabajador_id },
                    // error: Id del trabajador inválido.
            })
            }
        }

        const payload = {...req.body, trabajador_id: trabajador_id_num }
        const updated = await updateIncidenciaById(id, payload)
        if(!updated){
            return res.status(404).json({
                ok: false,
                code: "NOT_FOUND",
                message: "Incidencia no encontrada",
                details: {id},
                // error: "Incidencia no encontrada"
            })
        }
        return res.status(200).json({
                ok: true,
                data:updated
        })

    } catch (error) {
        if(error?.code === "23503"){
            return res.status(409).json({
                ok: false,
                code: "FK_ERROR",
                message: "trabajador_id no existe",
                details: {
                    field: "trabajador_id",
                    value: req.body.trabajador_id },
                    // error "Error en la FK trabajador_id"
            })
        }
        next(error)
    }
}

/**
 * DELETE /incidencias/:id
 * Elimina una incidencia por su id.
 */

export async function removeIncidencia(req, res, next){
    try {
        const id = Number(req.params.id)

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de incidencia inválido",
                details: { 
                    field: "id", 
                    value: req.params.id },
                    //error: "ID de incidencia inválido"
            })
        }
        const deleted = await deleteIncidenciaById(id)
        
        if(deleted === 0){
            return res.status(404).json({
                ok:false,
                code: "NOT_FOUND",
                message: "Incidencia no encontrada",
                details: {id},
                //error: "Incidencia no encontrada"
            })
        }

        return res.status(204).send()

    } catch (error) {
        next(error)
    }
}