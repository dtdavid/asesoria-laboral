import { Link, useNavigate } from "react-router-dom"
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
  const { logout, user } = useAuth()
  
  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <header className="border-b border-brand-border bg-brand-surface">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Identidad mínima */}

        <Link to="/" className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Home" className="h-8 w-auto" />
          <span className="hidden sm:inline text-xs font-semibold text-brand-muted uppercase tracking-wide">
            Área privada
          </span>
        </div>
        </Link>

        {/* Usuario + acción */}
        <div className="flex items-center gap-3">
          
          <span className="text-xs sm:text-sm text-brand-muted truncate max-w-[140px] sm:max-w-none">
            {user?.email || "—"} 
            <span className="hidden sm:inline">
            ({user?.role || "—"})
            </span>
          </span>

          <Button
            type="button"
            variant="ghost"
            onClick={handleLogout}
            className="px-3"
          >
            <span className="sm:hidden">Salir</span>
            <span className="hidden sm:inline">Cerrar sesión</span>
          </Button>
        </div>

      </div>
    </header>
  )
}


