import { getTrabajadores, getTrabajadorById, createTrabajador, deleteTrabajadorById, updateTrabajadorById } from "../services/trabajadores.service.js";

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

/**
 * busca trabajador por id (path param)
 * GET /trabajadores/:id
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

// inserción de un nuevo trabajador
export async function addTrabajador(req, res, next){
    try {
        const {empresa_id, nombre, apellidos, dni} = req.body

        //validación básica de campos obligatorios
        if(!empresa_id || !nombre || !apellidos || !dni){
            return res.status(400).json({
                ok:false,
                code: "VALIDATION_ERROR",
                message: "Campos obligatorios: empresa_id, nombre, apellidos, dni",
                details: { missing_fields: ["empresa_id", "nombre", "apellidos", "dni"].filter(f => !req.body[f]) },
                //error: "Campos obligatorios: empresa_id, nombre, apellidos, dni"
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

        //paso el payload con la validación numérica del empresa_id
        const payload = { ...req.body, empresa_id: empresa_id_num}
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
        next(error)
    }
}

// eliminación de un trabajador por su id
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
        //validar id del trabajador que sea número entero positivo
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

         const {empresa_id,nombre, apellidos, dni} = req.body
        if(!nombre|| !apellidos || !dni|| !empresa_id){
            return res.status(400).json({
                ok: false,
                code: "VALIDATION_ERROR",
                message: "Campos obligatorios: empresa_id, nombre, apellidos, dni",
                details: { missing_fields: ["empresa_id", "nombre", "apellidos", "dni"].filter(f => !req.body[f]) },
                //error: "Campos obligatorios: id, empresa_id, nombre, apellidos, dni"
            })
        }

        //validar empresa_id que sea número y positivo
        const empresa_id_num = Number(req.body.empresa_id)
            if(!Number.isInteger(empresa_id_num) || empresa_id_num <= 0){
                return res.status(400).json({
                    ok:false,
                    code: "VALIDATION_ERROR",
                    message: "ID de empresa inválido",
                    details: { field: "empresa_id", value: req.body.empresa_id },
                    //error: "ID de empresa inválido"
                })
            }
       
        const payload = { ...req.body, empresa_id: empresa_id_num }
        const updated = await updateTrabajadorById(id, payload)

        if(!updated){
            return res.status(404).json({
                ok:false,
                code: "NOT_FOUND",
                message: "Trabajador no encontrado",
                details: {id},
                //error: "Trabajador no encontrado"
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
                //error: "Ya existe un trabajador con ese DNI"
            })
        }
        next(error)
    }
}