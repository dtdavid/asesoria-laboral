import { pool } from "../db.js";

/**
 * Service de trabajadores.
 * Contiene la lógica de acceso a datos.
 */

/**
 * Obtiene los trabajadores de una empresa.
 */
export async function getTrabajadores(empresa_id) {

    const result = await pool.query(
        `SELECT id, nombre, apellidos, dni, email, telefono, puesto, activo, empresa_id
         FROM trabajadores
         WHERE empresa_id = $1
         ORDER BY apellidos, nombre ASC`,
        [empresa_id]
    )
    return result.rows
}


/**
 * Obtiene un trabajador por su id.
 */
export async function getTrabajadorById(id) {
    const result = await pool.query(
        `SELECT id, apellidos, nombre, dni, empresa_id, telefono, email, puesto, salario_bruto, activo, created_at, updated_at FROM trabajadores WHERE id = $1`,
        [id]
    )
    return result.rows[0] || null
}           
    
/**
 * Crea un nuevo trabajador.
 */
export async function createTrabajador(payload){
    const {empresa_id, nombre, apellidos, dni, telefono = null, email = null, puesto = null, salario_bruto = null, activo = true} = payload
    const result = await pool.query(
        `INSERT INTO trabajadores (empresa_id, nombre, apellidos, dni, telefono, email, puesto, salario_bruto, activo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, empresa_id, nombre, apellidos, dni, telefono, email, puesto, salario_bruto, activo, created_at, updated_at`,
        [empresa_id, nombre, apellidos, dni, telefono, email, puesto, salario_bruto, activo]    )
    return result.rows[0]
}


/**
 * Elimina un trabajador por su id.
 */
export async function deleteTrabajadorById(id){
    const result = await pool.query(
        "DELETE FROM trabajadores WHERE id = $1",
        [id]
    )
    
    return result.rowCount  
}


/**
 * Actualiza un trabajador por su id.
 */
 export async function updateTrabajadorById(id, payload){
    const {empresa_id, nombre, apellidos, dni, telefono = null, email = null, puesto = null, salario_bruto = null, activo = true} = payload
    const result = await pool.query(
        `UPDATE trabajadores
        SET empresa_id = $1,
        nombre = $2, 
        apellidos = $3, 
        dni = $4, 
        telefono = $5, 
        email = $6, 
        puesto = $7, 
        salario_bruto = $8, 
        activo = $9, 
        updated_at = NOW()
        WHERE id = $10
        RETURNING id, empresa_id, nombre, apellidos, dni, telefono, email, puesto, salario_bruto, activo, created_at, updated_at`,
        [empresa_id, nombre, apellidos, dni, telefono, email, puesto, salario_bruto, activo, id]
    )
    return result.rows[0] || null 

}