
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.jsx'

/**
 * Layout público de la aplicación
 * Se utiliza para todas las páginas accesibles sin autenticación
 * (home, login, registro, etc.)
 */

export default function PrivateLayout() {
  return (
    <>
      {/* Cabecera común a las páginas públicas */}
      <Header />

      {/* Contenido específico de cada ruta */}
      <main>
        <Outlet />
      </main>
    </>
  )
}