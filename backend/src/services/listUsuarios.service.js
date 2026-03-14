import { pool } from "../db.js";

/**
 * Service de usuarios por rol.
 * Contiene la lógica de acceso a datos.
 */

/**
 * Obtiene usuarios filtrados por rol.
 */
export async function getUsuariosByRole(role){
    const result = await pool.query(
        `SELECT id, email, role, status, empresa_id FROM usuarios WHERE role = $1 ORDER BY (status = 'PENDIENTE') DESC, id ASC`,
        [role]
    )
    return result.rows 
}