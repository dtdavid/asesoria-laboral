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

  // toggleMenu alterna abrir/cerrar el panel móvil
  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  // Solo mostramos anclas cuando estamos en Home
  const isHome = location.pathname === "/"

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 gap-3">
        {/* Marca: link a Home */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.svg"
            alt="Consultoría Gestión Laboral"
            className="h-9 sm:h-10 md:h-14 w-auto"
          />
        </Link>

        {/* Navegación informativa (solo en Home) */}
        <nav className="hidden md:block" aria-label="Navegación pública">
          {isHome ? <Navbar onNavigate={closeMenu} /> : null}
        </nav>

        {/* Acciones (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            type="button"
            variant="primary"
            onClick={() => navigate("/login")}
            className="px-5"
          >
            Login
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/registro")}
            className="px-5"
          >
            Registro
          </Button>
        </div>

        {/* Botón móvil */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-white text-brand-text shadow-sm transition-colors hover:bg-brand-surface"
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <GiHamburgerMenu aria-hidden="true" />
        </button>
      </div>

      {/* Panel móvil */}
      {isOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-brand-border bg-white/95 backdrop-blur"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-5 space-y-5">
            {/* Anclas solo si estamos en Home */}
            {isHome ? <Navbar onNavigate={closeMenu} /> : null}

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  closeMenu()
                  navigate("/login")
                }}
                className="w-full"
              >
                Login
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  closeMenu()
                  navigate("/registro")
                }}
                className="w-full"
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


