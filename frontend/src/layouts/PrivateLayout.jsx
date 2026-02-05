
import { Outlet } from "react-router-dom"

/**
 * Layout privado de la aplicación
 * En el futuro se protegerá con autenticación (JWT)
 */

export default function PrivateLayout() {
  return (
    <>
      <header>
        <h2>Área privada</h2>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}


