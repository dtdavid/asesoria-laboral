import { Outlet, useLocation } from "react-router-dom"
import PublicHeader from "../components/PublicHeader.jsx"
import PublicFooter from "../components/PublicFooter.jsx"

/**
 * Layout público de la aplicación
 * Se utiliza para todas las páginas accesibles sin autenticación
 * (home, login, registro, etc.)
 */

export default function PublicLayout() {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text overflow-x-clip">
      {/* Cabecera común a las páginas públicas */}
      <PublicHeader />

      {/* Contenido específico de cada ruta */}
      <main className="flex-1 w-full min-w-0">
        {/* En Home, el componente ya gestiona paddings/estructura por secciones.
            En el resto de páginas, este wrapper aporta aire y alineación. */}
        {isHome ? (
          <div className="w-full min-w-0">
            <Outlet />
          </div>
        ) : (
          <section className="w-full max-w-7xl mx-auto px-4 py-10 min-w-0">
            <Outlet />
          </section>
        )}
      </main>

      {/* Pie de página común a las páginas públicas */}
      <PublicFooter />
    </div>
  )
}
