import { Outlet } from "react-router-dom"
import PrivateSidebar from "../components/private/PrivateSidebar"
import PrivateHeader from "../components/private/PrivateHeader"
import PublicFooter from "../components/PublicFooter"

/**
 * Layout privado (/app/*)
 * - Header superior fijo
 * - Sidebar en escritorio, colapsable en móvil
 * - En móvil, la sidebar pasa arriba (stack vertical)
 */
export default function PrivateLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text overflow-x-clip">

      {/* Header privado */}

      <PrivateHeader />

      {/* Contenedor principal */}

      <div className="w-full px-4 py-6 flex-1">
        <div className="mx-auto w-full max-w-7xl min-w-0">
          {/*
            grid-cols-1 en móvil (una columna)
            md:grid-cols-[220px_1fr] en escritorio
          */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr] min-w-0">

            {/* Sidebar */}

            <PrivateSidebar />

            {/* Contenido */}

            <main className="rounded-2xl bg-white p-6 shadow-sm min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      {/** PublicFooter */}
      
      <div className="mt-6">
        <PublicFooter />
      </div>
    </div>
    
  )
}




