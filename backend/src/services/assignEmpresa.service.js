import { pool } from "../db.js";

/**
 * Service de asignación de empresa a usuario.
 * Contiene la lógica de acceso a datos.
 */

// Asigna empresa y activa el usuario
export async function assignEmpresaToUsuario(userId, empresaId){
    const result = await pool.query(
        `UPDATE usuarios SET empresa_id=$1, status='ACTIVO', updated_at=NOW() 
         WHERE id=$2 
         RETURNING id, email, status, empresa_id, updated_at`,
        [empresaId, userId]
    )
    return result.rows[0] || null
}