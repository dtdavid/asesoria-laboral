import { pool } from "../db.js";

/**Service de usuarios
 * Contiene la lógica de acceso a datos (consultas SQL).
 * No gestiona HTTP ni req/res.
 */



// opbtenemos un usuario por su email

export async function getUserByEmail(email) {
    const result = await pool.query(
        `SELECT id, email, password_hash, role, status, empresa_id FROM usuarios WHERE email = $1`,
        [email]
    )
    return result.rows[0] || null
}

// opbtenemos un usuario por su id

export async function getUserById(id) {
    const result = await pool.query(
        `SELECT id, email, role, status, empresa_id FROM usuarios WHERE id = $1`,
        [id]
    )
    return result.rows[0] || null
}


// creamos un nuevo usuario
export async function createUser(payload) {
    const { email, password_hash, role = "CLIENTE", status = "PENDIENTE", empresa_id =null} = payload
    const result = await pool.query(
        `INSERT INTO usuarios (email, password_hash, role, status, empresa_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, role, status, empresa_id`,
        [email, password_hash, role, status, empresa_id]
    )
    return result.rows[0]
}