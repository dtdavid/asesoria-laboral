import { Link, useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"

/**
 * Página 404 (Not Found)
 * - Para rutas no existentes dentro de la SPA
 * - Ofrece navegación segura: volver a Home o volver atrás
 */
export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-brand-border">
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Error 404
          </p>

          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-brand-text">
            Página no encontrada
          </h1>

          <p className="mt-2 text-sm text-brand-muted max-w-prose">
            La dirección que has escrito no existe o la página ha sido movida.
            Puedes volver al inicio o regresar a la página anterior.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button type="button" variant="primary" onClick={() => navigate("/")}>
              Ir a Home
            </Button>

            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              Volver atrás
            </Button>

            <Link
              to="/"
              className="sm:ml-auto text-sm text-brand-muted hover:text-brand-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded-md"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
