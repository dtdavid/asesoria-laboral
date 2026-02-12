import { NavLink } from "react-router-dom"

/**
 * Sidebar del área privada
 * Contiene la navegación principal del usuario autenticado.
 * 
 * Se utiliza NavLink para:
 * - Navegación SPA (sin recarga)
 * - Detectar automáticamente la ruta activa
 * 
 * Móvil: colapsable con <details>
 * Desktop: visible siempre
 */
export default function PrivateSidebar() {

  // Clase base común a todos los enlaces
  const baseItem =
    "block px-3 py-2 rounded text-sm font-medium"

  // NavLink permite una función para aplicar estilos si la ruta está activa
  const linkClass = ({ isActive }) =>
    `${baseItem} ${
      isActive
        ? "bg-brand-primary text-white"
        : "text-brand-text hover:bg-brand-surface"
    }`

  // Links del panel (lo reutilizamos en móvil y desktop)
  const Links = ({ onNavigate }) => (
    <nav aria-label="Panel privado" className="space-y-1">
      <NavLink to="/app" end className={linkClass} onClick={onNavigate}>
        Dashboard
      </NavLink>
      <NavLink to="/app/empresas" className={linkClass} onClick={onNavigate}>
        Empresas
      </NavLink>
      <NavLink to="/app/trabajadores" className={linkClass} onClick={onNavigate}>
        Trabajadores
      </NavLink>
      <NavLink to="/app/incidencias" className={linkClass} onClick={onNavigate}>
        Incidencias
      </NavLink>
    </nav>
  )



  return (
    <aside className="w-full">

      {/* MÓVIL: details colapsable */}
      
      <div className="md:hidden">
        <details className="rounded border border-brand-border bg-white">

          {/* summary = “cabecera” clickable */}

          <summary className="cursor-pointer select-none px-4 py-3 text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Panel
          </summary>

           {/* Contenido desplegable */}

          <div className="px-3 pb-3">

            {/* onNavigate: cerramos el details al navegar */}

            <Links />

          </div>
        </details>
      </div>

      {/* DESKTOP: sidebar fijo */}

      <div className="hidden md:block">
        <div className="rounded border border-brand-border bg-white p-4">
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Panel
          </p>
          <div className="mt-3">
            <Links /> 
          </div>
        </div>
      </div>
    </aside>
  )
}

