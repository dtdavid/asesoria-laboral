
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.jsx'

/**
 * Layout público de la aplicación
 * Se utiliza para todas las páginas accesibles sin autenticación
 * (home, login, registro, etc.)
 */

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabecera común a las páginas públicas */}
      <Header />

      {/* Contenido específico de cada ruta */}
      <main className="flex-1 w-full">
        <section className="w-full max-w-4xl mx-auto px-4 py-10"> 
          <Outlet />
        </section>
      </main>
        {/* Pie de página común a las páginas públicas */}
      <footer className="border-t text-gray-500">
        <div className="w-full max-w-4xl mx-auto px-4 py-4 text-sm">
          <p>Proyecto académico (demo)</p>
        </div>
      </footer>
        
     
    </div>
  )
}