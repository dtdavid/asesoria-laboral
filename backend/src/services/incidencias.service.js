import { pool } from "../db.js";

/**
 * incidencias de trabajadores
 * Contiene la lógica de acceso a datos (consultas SQL).
 * No gestiona HTTP ni req/res.
 */

// función que lista incidencias de un trabajador por empresa_id

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

// GET /incidencias/:id (GESTOR)

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

// función para insertar nueva inidencia

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


