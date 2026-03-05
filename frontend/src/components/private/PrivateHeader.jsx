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
  const { logout, user } = useAuth()
  
  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <header className="border-b border-brand-border bg-brand-surface">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Identidad mínima */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-brand-muted uppercase tracking-wide">
            Área privada
          </span>
        </div>

        {/* Usuario + acción */}
        <div className="flex items-center gap-3">
          
          <span className="text-xs sm:text-sm text-brand-muted truncate max-w-[160px] sm:max-w-none">
            {user?.email || "—"} <span className="hidden sm:inline">({user?.role || "—"})</span>
          </span>

          <Button
            type="button"
            variant="ghost"
            onClick={handleLogout}
            className="px-3"
          >
            Cerrar sesión
          </Button>
        </div>

      </div>
    </header>
  )
}


