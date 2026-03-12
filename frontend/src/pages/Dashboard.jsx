import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"

/**
 * Página principal del área privada
 * Por ahora es solo un placeholder
 */

export default function Dashboard() {
  const navigate = useNavigate()
  
  const card = "rounded-2xl bg-brand-surface p-5 shadow-sm border border-brand-border flex flex-col min-h-[170px]"

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
      </header>

      {/* KPIs (placeholder) */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        <div className={card}>
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Empresas
          </p>
          <p className="mt-2 text-center text-2xl font-semibold text-brand-text">—</p>
          <p className="mt-auto pt-2 text-center text-sm text-brand-muted">
            Total registradas
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/app/empresas")}
            className="mt-4 w-full"
          >
            Ir a empresas
          </Button>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Trabajadores
          </p>
          <p className="mt-2 text-center text-2xl font-semibold text-brand-text">—</p>
          <p className="mt-auto pt-2 text-center text-sm text-brand-muted">
            Total activos
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/app/trabajadores")}
            className="mt-4 w-full"
          >
            Ir a trabajadores
          </Button>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Incidencias
          </p>
          <p className="mt-2 text-center text-2xl font-semibold text-brand-text">—</p>
          <p className="mt-auto pt-2 text-center text-sm text-brand-muted">
            En curso
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/app/incidencias")}
            className="mt-4 w-full"
          >
            Ir a incidencias
          </Button>
        </div>

        <div className={card}>
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Estado
          </p>
          <p className="mt-2 text-center text-2xl font-semibold text-brand-text">Demo</p>
          <p className="mt-auto pt-2 text-center text-sm text-brand-muted">
            Panel operativo del prototipo
          </p>
        </div>
      </section>

      {/* Bloques secundarios */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className={card}>
          <p className="text-sm font-medium text-brand-text">Accesos rápidos</p>
          <p className="mt-1 text-sm text-brand-muted">
            Accede a las secciones principales del panel para consultar o gestionar información.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button variant="secondary" onClick={() => navigate("/app/empresas")}>
              Empresas
            </Button>
            <Button variant="secondary" onClick={() => navigate("/app/trabajadores")}>
              Trabajadores
            </Button>
            <Button variant="secondary" onClick={() => navigate("/app/incidencias")}>
              Incidencias
            </Button>
          </div>
        </div>

        <div className={card}>
          <p className="text-sm font-medium text-brand-text">Resumen</p>
          <p className="mt-1 text-sm text-brand-muted">
            Desde este panel puedes entrar a empresas, trabajadores e incidencias según tu rol.
          </p>
        </div>
      </section>
    </div>
  )
}

