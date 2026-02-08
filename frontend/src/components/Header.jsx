import { useState } from 'react'
import Navbar from './Navbar.jsx'
import { GiHamburgerMenu } from "react-icons/gi"
import { IoLogoAlipay } from "react-icons/io5"

export default function Header() {
    // Estado para controlar si el menú está abierto o cerrado
    const[isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen((prev) => !prev)
    const closeMenu = () => setIsOpen (false) // en móvil: cerramos el menú al navegar

  return (
    
      <header className="border-b">
        <div className="w-full max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Brand */}
            <div className="flex items-center gap-2">
                <IoLogoAlipay className="text-4xl" aria-hidden="true" />
                <span className='text-lg font-semibold'>LOGO</span>
            </div>

          {/* Desktop nav */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <Navbar />
          </nav>

        {/* Mobile button */}
            <button
              type='button'
              className="md:hidden inline-flex items-center justify-center rounded border px-3 py-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded = {isOpen}
              aria-controls="mobile-nav"
            >
            <GiHamburgerMenu aria-hidden="true"/>
            </button>  
        </div>

        {/* Mobile nav panel */}
        {isOpen && (
          <nav id="mobile-nav" className='md:hidden border-t'>
            <div className="w-full max-w-4xl mx-auto px-4 py-3 flex justify-end">
              <Navbar onNavigate={closeMenu}/>
            </div>
          </nav>
        )}
      </header>
    
  )
}
