// Helper para centralizar llamadas a la API:
// - Usa la URL base desde VITE_API_URL
// - Adjunta el JWT si existe (Authorization: Bearer ...)
// - Normaliza errores usando message/error del backend
import { API_URL } from "../config/api"

/**
 * Realiza una petición a la API con soporte de JWT y manejo básico de errores.
 * @param {string} path Ruta relativa (ej: "/empresas")
 * @param {RequestInit} options Opciones fetch (method, headers, body...)
 * @returns {Promise<any>} JSON parseado (si lo hay)
 */

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token") // token persistido por AuthContext
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  // Si enviamos body en JSON, aseguramos Content-Type (solo si no viene ya)
  const hasBody = options.body !== undefined && options.body !== null
  const isJsonBody = hasBody && typeof options.body === "string"
  if (isJsonBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json"
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  // 204 = No Content (ej: DELETE OK), no hay JSON que parsear
  if (res.status === 204) return null

  const isJson = res.headers.get("content-type")?.includes("application/json")
  const data = isJson ? await res.json() : null

  if (!res.ok) {
    // backend usa message/código en muchos endpoints
    const msg = data?.message || data?.error || `HTTP ${res.status}`
    throw new Error(msg)
  }

  return data
}