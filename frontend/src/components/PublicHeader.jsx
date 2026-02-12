import React from 'react'
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import Navbar from "./Navbar"
import Button from "./ui/Button"

/**
 * Header público:
 * - Navegación informativa (anclas en Home)
 * - Acciones de acceso (Login/Registro)
 * - En móvil se colapsa en menú hamburguesa
 */


export default function PublicHeader() {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  // Obtenemos información de la URL actual (pathname, etc.)
  const location = useLocation()  
  //togleMenu al ser llamado cambia su estado
  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

// Solo mostramos anclas cuando estamos en Home; 
  const isHome = location.pathname === "/"

  return (
    <header className="border-b border-brand-border bg-brand-bg sticky top-0 z-50"> 
      <div className="w-full max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Marca: link a Home */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Consultoría Gestión Laboral" className="h-10 w-auto" />
        </Link>

        {/* Navegación informativa (solo en Home) */}
        <nav className="hidden md:block" aria-label="Navegación pública">
          {/* Al navegar, cierro el menú */}
          {isHome ? <Navbar onNavigate={closeMenu} /> : null}
        </nav>

        {/* Acciones (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-brand-primary hover:bg-brand-secondary px-5"
          >
            Login
          </Button>

          <Button
            type="button"
            onClick={() => navigate("/registro")}
            className="bg-brand-muted text-brand-text fborder-brand-border hover:bg-brand-surface px-5"
          >
            Registro
          </Button>
        </div>

        {/* Botón móvil */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded border border-brand-border px-3 py-2"
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {/* Al hacer click al icono se llama a toggleMenu*/}
          <GiHamburgerMenu aria-hidden="true" />
        </button>
      </div>

      {/* Panel móvil */}
      {isOpen && (
        <nav id="mobile-nav" className="md:hidden border-t border-brand-border bg-brand-bg">
          <div className="w-full max-w-4xl mx-auto px-4 py-3 space-y-3">
            {/* Anclas solo si estamos en Home */}
            {isHome ? <Navbar onNavigate={closeMenu} /> : null}

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                onClick={() => {
                  closeMenu()
                  navigate("/login")
                }}
                className="bg-brand-primary hover:bg-brand-secondary w-full"
              >
                Login
              </Button>

              <Button
                type="button"
                onClick={() => {
                  closeMenu()
                  navigate("/registro")
                }}
                className="bg-brand-muted text-brand-text border border-brand-border hover:bg-brand-surface w-full"
              >
                Registro
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
