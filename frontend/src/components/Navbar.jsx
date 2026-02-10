import { NavLink } from 'react-router-dom'


export default function Navbar({onNavigate}) {

  const base = "text-sm font-medium hover:underline"

  return (
    
        <ul className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-6">
            <li>
              <a className={base} href="#problemas" onClick={onNavigate}>
                Problemas
              </a>
            </li>
            <li>
              <a className={base} href="#funcionalidades" onClick={onNavigate}>
                Funcionalidades
              </a>
            </li>
            <li>
              <a className={base} href="#como-funciona" onClick={onNavigate}>
                Cómo funciona
              </a>
            </li>
            <li>
              <a className={base} href="#recursos" onClick={onNavigate}>
                Recursos
              </a>
            </li>

            <li>
              <NavLink to="/"
               onClick={onNavigate}
               className={({ isActive }) =>
              `text-sm font-medium hover:underline ${isActive ? 'underline' : ''}`
              }
               >
              Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" 
              onClick={onNavigate}
              className={({ isActive }) =>
              `text-sm font-medium hover:underline ${isActive ? 'underline' : ''}`
              }
              >
              Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/registro" 
              onClick={onNavigate} 
              className={({ isActive }) =>
              `text-sm font-medium hover:underline ${isActive ? 'underline' : ''}`
              }
              >
              Registro
              </NavLink>
            </li>
        </ul>
    
  )
}
