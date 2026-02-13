import { Outlet } from "react-router-dom"
import PrivateSidebar from "../components/private/PrivateSidebar"
import PrivateHeader from "../components/private/PrivateHeader"


/**
 * Layout privado (/app/*)
 * - Header superior fijo
 * - Sidebar en escritorio, colapsable en móvil
 * - En móvil, la sidebar pasa arriba (stack vertical)
 */
export default function PrivateLayout() {
  return (
    <div className="min-h-screen bg-brand-surface">
      
      {/* Header privado */}
      <PrivateHeader />

      {/* Contenedor principal */}
      <div className="w-full px-4 py-6">
        
        {/* 
          grid-cols-1 en móvil (una columna)
          md:grid-cols-[220px_1fr] en escritorio
        */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">

          {/* Sidebar */}
          <PrivateSidebar />

          {/* Contenido */}
          <main className="rounded border border-brand-border bg-white p-6">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  )
}



