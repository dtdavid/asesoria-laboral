import { pool } from "../db.js";

/**
 * incidencias de trabajadores
 * Contiene la lógica de acceso a datos (consultas SQL).
 * No gestiona HTTP ni req/res.
 */

// función que lista incidencias de un trabajador por empresa_id

export async function getIncidenciasByEmpresaId(empresa_id){

    
        const result = await pool.query(
           `SELECT id, empresa_id, trabajador_id, tipo, estado, fecha_inicio, fecha_fin, descripcion, created_at, updated_at FROM incidencias WHERE empresa_id = $1 ORDER BY fecha_inicio DESC, created_at DESC`,
           [empresa_id] 
        )
    return result.rows
}