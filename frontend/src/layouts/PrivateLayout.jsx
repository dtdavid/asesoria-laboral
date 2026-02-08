
import { Outlet } from "react-router-dom"

/**
 * Layout privado de la aplicación
 * En el futuro se protegerá con autenticación (JWT)
 */

export default function PrivateLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header />
        
      <main className="flex-1 w-full">
        <section className="w-full max-w-4xl mx-auto px-4 py-10">
          <Outlet />
          </section>
      </main>
      
    </div>
  )
}


