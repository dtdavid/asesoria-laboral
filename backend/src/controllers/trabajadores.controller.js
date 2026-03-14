import { getTrabajadores, getTrabajadorById, createTrabajador, deleteTrabajadorById, updateTrabajadorById } from "../services/trabajadores.service.js";



/**
 * GET /trabajadores
 * Lista de trabajadores por empresa_id
 */
export async function listTrabajadores(req, res, next) {
    
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

/**
 * GET /trabajadores/:id
 * Obtiene un trabajador por su id.
 */

export async function getTrabajador(req, res, next){

    try {
        const id = Number(req.params.id)
        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de trabajador inválido",
                details: { field: "id", value: req.params.id },
                //error: "ID de trabajador inválido"
            })
        }
        const trabajador = await getTrabajadorById(id)
        if(!trabajador){
            return res.status(404).json({
                ok:false, code: "NOT_FOUND",
                message: "Trabajador no encontrado",
                details: {id},
                //error: "Trabajador no encontrado"
            })
        }
        return res.status(200).json({ok:true, data: trabajador})
        
    } catch (error) {
        
        next(error)
    }
}

/**
 * POST /trabajadores
 * Crea un nuevo trabajador
 */

export async function addTrabajador(req, res, next){
    try {
        const {empresa_id, nombre, apellidos, dni} = req.body

        const missingFields = ["empresa_id", "nombre", "apellidos", "dni"].filter(
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

        if(!Number.isInteger(empresa_id_num) || empresa_id_num <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de empresa inválido",
                details: { field: "empresa_id", value: empresa_id },
            })
        } 

        const dniValue = String(dni).trim().toUpperCase()
        const dniNieRegex = /^(\d{8}[A-Z]|[XYZ]\d{7}[A-Z])$/

        if (!dniNieRegex.test(dniValue)) {
        return res.status(400).json({
            ok: false,
            code: "VALIDATION_ERROR",
            message: "Formato de DNI/NIE inválido",
            details: { field: "dni", value: req.body.dni },
        })
        }

        //paso el payload con la validación numérica del empresa_id
        const payload = { ...req.body, empresa_id: empresa_id_num, dni:dniValue}
        const nuevo = await createTrabajador(payload)
        return res.status(201).json({
            ok:true,
            data: nuevo
            })
            } catch (error) 
        {
        //error.code 23505 es el código de error de Postgres para violación de restricción de unicidad (en este caso, el DNI debe ser único)
        if(error?.code === "23505"){
            return res.status(409).json({
                ok:false,
                code: "DNI_DUPLICADO",
                message: "Ya existe un trabajador con ese DNI",
                details: { field: "dni", value: req.body.dni },
                //error: "Ya existe un trabajador con ese DNI"
            })
        }
        if (error?.code === "23503") {
            return res.status(409).json({
                ok: false,
                code: "FK_ERROR",
                message: "empresa_id no existe",
                details: { field: "empresa_id", value: req.body.empresa_id },
            })
        }
        next(error)
    }
}

/**
 * 
 * DELETE /trabajadores/:id
 * Elimina un trabajador por su id. 
 */
export async function removeTrabajador(req, res, next){
    try {
        const id = Number(req.params.id)
        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de trabajador inválido",
                details: { field: "id", value: req.params.id },
                //error: "ID de trabajador inválido"
            })
        }
        
        const deleted = await deleteTrabajadorById(id)

        if(deleted === 0){
            return res.status(404).json({
                ok:false,
                code: "NOT_FOUND",
                message: "Trabajador no encontrado",
                details: {id},
                //error: "Trabajador no encontrado"
            })
        }
        return res.status(204).send()
    } 
    catch (error) {
        next(error)
    }
}


//editar trabajador
export async function editTrabajador(req, res, next){
    try {
        const id = Number(req.params.id)
        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de trabajador inválido",
                details: { field: "id", value: req.params.id },
            })
        }

        const { empresa_id, nombre, apellidos, dni } = req.body

        const missingFields = ["empresa_id", "nombre", "apellidos", "dni"].filter(
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

        const empresa_id_num = Number(req.body.empresa_id)
        if(!Number.isInteger(empresa_id_num) || empresa_id_num <= 0){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "ID de empresa inválido",
                details: { field: "empresa_id", value: req.body.empresa_id },
            })
        }

        const dniValue = String(dni).trim().toUpperCase()
        const dniNieRegex = /^(\d{8}[A-Z]|[XYZ]\d{7}[A-Z])$/

        if (!dniNieRegex.test(dniValue)) {
        return res.status(400).json({
            ok: false,
            code: "VALIDATION_ERROR",
            message: "Formato de DNI/NIE inválido",
            details: { field: "dni", value: req.body.dni },
        })
        }

        //paso el payload con la validación numérica del empresa_id
        const payload = { ...req.body, empresa_id: empresa_id_num, dni:dniValue}
        const updated = await updateTrabajadorById(id, payload)

        if(!updated){
            return res.status(404).json({
                ok:false,
                code: "NOT_FOUND",
                message: "Trabajador no encontrado",
                details: {id},
            })
        }

        return res.status(200).json({
            ok: true,
            data: updated
        })
    }
    catch (error) {
        if(error?.code === "23505"){
            return res.status(409).json({
                ok:false,
                code: "DNI_DUPLICADO",
                message: "Ya existe un trabajador con ese DNI",
                details: { field: "dni", value: req.body.dni },
            })
        }

        if (error?.code === "23503") {
            return res.status(409).json({
                ok: false,
                code: "FK_ERROR",
                message: "empresa_id no existe",
                details: { field: "empresa_id", value: req.body.empresa_id },
            })
        }

        next(error)
    }
}