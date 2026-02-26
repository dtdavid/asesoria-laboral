import { pool } from "../db.js";

/**Service de trabajadores
 * Contiene la lógica de acceso a datos (consultas SQL).
 * No gestiona HTTP ni req/res.
 */

/**
 *
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