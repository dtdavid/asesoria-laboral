import { pool } from "../db.js";

/**
 * Service de incidencias.
 * Contiene la lógica de acceso a datos.
 */

/**
 * Obtiene las incidencias de una empresa.
 */
export async function getIncidenciasByEmpresaId(empresa_id){

    const result = await pool.query(
    `SELECT
        i.id,
        i.empresa_id,
        e.razon_social,
        i.trabajador_id,
        t.nombre   AS trabajador_nombre,
        t.apellidos AS trabajador_apellidos,
        i.tipo,
        i.estado,
        i.fecha_inicio,
        i.fecha_fin,
        i.descripcion,
        i.created_at,
        i.updated_at
     FROM incidencias i
     JOIN empresas e ON e.id = i.empresa_id
     LEFT JOIN trabajadores t ON t.id = i.trabajador_id
     WHERE i.empresa_id = $1
     ORDER BY i.fecha_inicio DESC, i.created_at DESC`,
           [empresa_id] 
    )
    return result.rows
}

/**
 * Obtiene una incidencia por su id.
 */
export async function getIncidenciaById(id) {
   
    const result = await pool.query (
    `SELECT
        i.id,
        i.empresa_id,
        e.razon_social,
        i.trabajador_id,
        t.nombre   AS trabajador_nombre,
        t.apellidos AS trabajador_apellidos,
        i.tipo,
        i.estado,
        i.fecha_inicio,
        i.fecha_fin,
        i.descripcion,
        i.created_at,
        i.updated_at
     FROM incidencias i
     JOIN empresas e ON e.id = i.empresa_id
     LEFT JOIN trabajadores t ON t.id = i.trabajador_id
     WHERE i.id = $1`,
     [id]
    )
    return result.rows[0] || null

}

/**
 * Crea una nueva incidencia.
 */
export async function createIncidencia(payload){
    const {
        empresa_id,
        tipo,
        fecha_inicio,
        trabajador_id = null,
        estado = "ABIERTA",
        fecha_fin = null,
        descripcion = null
        
    } = payload
    const result = await pool.query(
        `INSERT INTO incidencias (
            empresa_id, tipo, fecha_inicio, trabajador_id, estado, fecha_fin, descripcion 
        ) VALUES (
            $1,$2,$3,$4,$5,$6,$7
        )
        RETURNING id, empresa_id, tipo, fecha_inicio, trabajador_id, estado, fecha_fin, descripcion, created_at, updated_at`,
        [
            empresa_id,
            tipo,
            fecha_inicio,
            trabajador_id,
            estado,
            fecha_fin,
            descripcion,
        ]
    )
    return result.rows[0]
}


/**
 * Actualiza una incidencia por su id.
 */
export async function updateIncidenciaById(id, payload){
    const {
        tipo, 
        estado, 
        fecha_inicio,
        trabajador_id = null,
        fecha_fin = null,
        descripcion = null
    } = payload
    const result = await pool.query(
        `UPDATE incidencias
        SET tipo = $1,
        estado = $2, 
        fecha_inicio = $3, 
        trabajador_id = $4, 
        fecha_fin = $5, 
        descripcion = $6,  
        updated_at = NOW()
        WHERE id = $7
        RETURNING id, tipo, estado, fecha_inicio, trabajador_id, fecha_fin, descripcion, updated_at`,
        [tipo, estado, fecha_inicio, trabajador_id, fecha_fin, descripcion, id]
    )
    return result.rows[0] || null // devuelve la incidencia actualizado o null si no se ha encontrado
}

/**
 * Elimina una incidencia por su id.
 */
export async function deleteIncidenciaById(id){
    const result = await pool.query(
        `DELETE FROM incidencias WHERE id = $1`,
         [id]
    )
    return result.rowCount // 1 si se ha eliminado (204), 0 si no se ha encontrado (404)
}