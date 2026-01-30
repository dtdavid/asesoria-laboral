import { NavLink } from 'react-router-dom'


export default function Navbar({onNavigate}) {
  return (
    
        <ul>
            <li>
              <NavLink to="/" onClick={onNavigate}>
              Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={onNavigate}>
              Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/registro" onClick={onNavigate} >
              Registro
              </NavLink>
            </li>
        </ul>
    
  )
}
