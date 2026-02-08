import { NavLink } from 'react-router-dom'


export default function Navbar({onNavigate}) {
  return (
    
        <ul className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-6">
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
