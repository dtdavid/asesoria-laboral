import { getEmpresaById } from "../services/empresas.service.js"
import { getTrabajadores } from "../services/trabajadores.service.js"

/**
 * GET /me/empresa
 * Devuelve la empresa asociada al usuario autenticado (cliente).
 */
export async function getMyEmpresa(req, res, next) {
  try {
    const empresaId = req.user?.empresa_id

    if (!empresaId) {
      return res.status(403).json({
        ok: false,
        code: "NO_EMPRESA_ASIGNADA",
        message: "Usuario pendiente de asignación a una empresa",
        details: { empresa_id: null },
      })
    }

    const empresa = await getEmpresaById(empresaId)

    if (!empresa) {
      return res.status(404).json({
        ok: false,
        code: "NOT_FOUND",
        message: "Empresa no encontrada",
        details: { id: empresaId },
      })
    }

    return res.status(200).json({ ok: true, data: empresa })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /me/trabajadores
 * Devuelve trabajadores asociados a la empresa del usuario autenticado.
 */
export async function getMyTrabajadores(req, res, next) {
  try {
    const empresaId = req.user?.empresa_id

    if (!empresaId) {
      return res.status(403).json({
        ok: false,
        code: "NO_EMPRESA_ASIGNADA",
        message: "Usuario pendiente de asignación a una empresa",
        details: { empresa_id: null },
      })
    }

    const trabajadores = await getTrabajadores(empresaId)
    return res.status(200).json({ ok: true, data: trabajadores })
  } catch (err) {
    next(err)
  }
}