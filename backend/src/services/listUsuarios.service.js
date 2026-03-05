import { pool } from "../db.js";

/**Service de usuarios con role
 * Contiene la lógica de acceso a datos (consultas SQL).
 * No gestiona HTTP ni req/res.
 */

//optenemos un usuario por su role
export async function getUsuariosByRole(role){
    const result = await pool.query(
        `SELECT id, email, role, status, empresa_id FROM usuarios WHERE role = $1`,
        [role]
    )
    return result.rows 
}