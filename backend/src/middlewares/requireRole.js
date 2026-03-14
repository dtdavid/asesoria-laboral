/**
 * Middleware de autorización por rol.
 * Permite el acceso solo si req.user.role coincide con el rol requerido.
 */

export function requireRole(role) {
  return (req, res, next) => {
    const current = req.user?.role
    if (current !== role) {
      return res.status(403).json({
        ok: false,
        code: "FORBIDDEN",
        message: "No autorizado",
        details: { required: role, current: current ?? null },
      })
    }
    return next()
  }
}