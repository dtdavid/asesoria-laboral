//se ejecuta después de requireAuth
// Middleware para proteger rutas que requieren un rol específico
// Verifica que el usuario autenticado (req.user) tenga el rol requerido para acceder a la ruta. Si no tiene el rol adecuado, responde con un error 403 Forbidden. Si tiene el rol correcto, llama a next() para continuar con la ejecución del controlador.

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