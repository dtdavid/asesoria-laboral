import { NavLink } from 'react-router-dom'

export default function Navbar({ onNavigate }) {
  // Clases base compartidas para evitar duplicación en enlaces del menú (desktop y mobile)
  const base =
    "relative text-sm font-medium text-brand-muted transition-colors duration-200 " +
    "hover:text-brand-text " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full " +
    "after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-secondary " +
    "after:transition-transform after:duration-200 hover:after:scale-x-100"

  return (
    <ul className="flex flex-col items-end gap-3 md:flex-row md:items-center md:gap-12">
      {/* Enlaces ancla: desplazan dentro de la landing (Home).
          onNavigate cierra el menú movil tras hacer click */}
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


