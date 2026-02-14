
import { Outlet } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader.jsx'
import PublicFooter from '../components/PublicFooter.jsx'

/**
 * Layout público de la aplicación
 * Se utiliza para todas las páginas accesibles sin autenticación
 * (home, login, registro, etc.)
 */

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
      {/* Cabecera común a las páginas públicas */}
      <PublicHeader />

      {/* Contenido específico de cada ruta */}
      <main className="flex-1 w-full">
        <section className="w-full max-w-4xl mx-auto px-4 py-10"> 
          <Outlet />
        </section>
      </main>
        {/* Pie de página común a las páginas públicas */}
      <PublicFooter /> 
    </div>
  )
}