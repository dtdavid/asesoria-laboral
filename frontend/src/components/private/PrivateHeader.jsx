import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Button from "../ui/Button"

/**
 * Header del área privada
 * 
 * Responsabilidad:
 * - Mostrar identidad mínima del sistema
 * - Mostrar usuario autenticado (placeholder)
 * - Permitir cerrar sesión
 * 
 * No contiene navegación estructural (eso estará en el sidebar)
 */

export default function PrivateHeader() {

  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <header className="bg-white border-b border-brand-border">
      <div className="w-full max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Identidad mínima */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-brand-muted uppercase tracking-wide">
            Área privada
          </span>
        </div>

        {/* Usuario + acción */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-sm text-brand-muted">
            Usuario
          </span>

          <Button
            type="button"
            onClick={handleLogout}
            className="px-3 py-2 text-sm"
          >
            Cerrar sesión
          </Button>
        </div>

      </div>
    </header>
  )
}

