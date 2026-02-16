import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "../components/ui/Button"

/**
 * Página principal del área privada
 * Por ahora es solo un placeholder
 */

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const card = "rounded-2xl bg-white p-5 shadow-sm"

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Área privada
          </p>
          <h1 className="text-2xl font-semibold text-brand-text">Dashboard</h1>
          <p className="text-sm text-brand-muted">
            Área privada del usuario autenticado.
          </p>
        </div>

        <Button type="button" variant="ghost" onClick={handleLogout} className="sm:mt-1">
          Cerrar sesión
        </Button>
      </header>

      {/* KPIs (placeholder) */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={card}>
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Empresas
          </p>
          <p className="mt-2 text-2xl font-semibold text-brand-text">—</p>
          <p className="mt-1 text-sm text-brand-muted">Total registradas</p>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Trabajadores
          </p>
          <p className="mt-2 text-2xl font-semibold text-brand-text">—</p>
          <p className="mt-1 text-sm text-brand-muted">Total activos</p>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Incidencias
          </p>
          <p className="mt-2 text-2xl font-semibold text-brand-text">—</p>
          <p className="mt-1 text-sm text-brand-muted">En curso</p>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Pendientes
          </p>
          <p className="mt-2 text-2xl font-semibold text-brand-text">—</p>
          <p className="mt-1 text-sm text-brand-muted">Acciones</p>
        </div>
      </section>

      {/* Bloques secundarios */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className={card}>
          <p className="text-sm font-medium text-brand-text">Accesos rápidos</p>
          <p className="mt-1 text-sm text-brand-muted">
            Aquí habrá enlaces a crear empresa, alta de trabajador e incidencias.
          </p>
        </div>

        <div className={card}>
          <p className="text-sm font-medium text-brand-text">Actividad reciente</p>
          <p className="mt-1 text-sm text-brand-muted">
            Aquí se listarán cambios recientes cuando exista backend.
          </p>
        </div>
      </section>
    </div>
  )
}

