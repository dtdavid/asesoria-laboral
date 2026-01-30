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
    <>
      <header>
        <div className="header-nav">
            <div className="header-brand">
                <IoLogoAlipay aria-hidden="true" />
                <h1 className='brand'>Name</h1>
            </div>
            <button
              type='button'
              className="menu-button"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded = {isOpen}
              aria-controls="main-nav"
            >
                <GiHamburgerMenu aria-hidden="true"/>
            </button>  
        </div>

        {isOpen && (
          <nav id="main-nav" className='mobile-nav'>
              <Navbar onNavigate={closeMenu}/>
          </nav>
        )}
      </header>
    </>
  )
}
