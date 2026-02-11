import { NavLink } from 'react-router-dom'


export default function Navbar({onNavigate}) {
  // Clases base compartidas para evitar duplicación en enlaces del menú(desktop y mobile)
  const base = "text-sm font-medium hover:underline"

  return (
    
        <ul className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-6">

          {/* Enlaces ancla: desplazan dentro de la landing(Home). onNavigate cierra el menú movil tras hacer click */}
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
            
        </ul>
    
  )
}
