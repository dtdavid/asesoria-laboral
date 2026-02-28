import { pool } from "../db.js";

/**Service de trabajadores
 * Contiene la lógica de acceso a datos (consultas SQL).
 * No gestiona HTTP ni req/res.
 */

/**
 * obtiene la lista de trabajadores de una empresa
 * @export
 * @param {*} empresa_id
 * @return {*} 
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
 * trabajador por id 
 * trabajador o null si no existe
 * @param {number} id
 * @return {Promise<Object|null>}
 */
export async function getTrabajadorById(id) {
    const result = await pool.query(
        `SELECT id, apellidos, nombre, dni, empresa_id, telefono, email, puesto, salario_bruto, activo, created_at, updated_at FROM trabajadores WHERE id = $1`,
        [id]
    )
    return result.rows[0] || null
}           
    

