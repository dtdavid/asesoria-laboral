import { getEmpresas } from "../services/empresas.service.js"

/**
 * Controller: capa HTTP.
 * Se encarga de responder a la petición usando el service.
 */

export async function listEmpresas(_req, res, next) {
  try {
    const empresas = await getEmpresas()
    res.status(200).json({ ok: true, data: empresas })
  } catch (err) {
    next(err)
  }
}
