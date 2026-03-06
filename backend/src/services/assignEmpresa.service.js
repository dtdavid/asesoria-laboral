import { pool } from "../db.js";

/**
 * Service para GESTOR asignar Empresa a CLIENTE
 * Contiene la lógica de acceso a datos (consultas SQL).
 * No gestiona HTTP ni req/res.
 */

//optenemos un usuario por su role
export async function assignEmpresaToUsuario(userId, empresaId){
    const result = await pool.query(
        `UPDATE usuarios SET empresa_id=$1, status='ACTIVO', updated_at=NOW() WHERE id=$2 RETURNING id, email, status, empresa_id, updated_at`,
        [empresaId,userId]
    )
    return result.rows[0] || null
}