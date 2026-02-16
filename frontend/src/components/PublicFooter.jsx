import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { FiPhone } from "react-icons/fi"

/**
 * Footer público de la aplicación.
 * Incluye información legal básica y nota académica.
 */
export default function PublicFooter({onNavigate}) {
  return (
    <footer className="mt-12  bg-brand-footer ">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-24">
        {/* ENLACES */}

        <nav  aria-label="Proyecto">
          <ul className="space-y-2">
            <li>
              <h3 className="text-white/100 hover:text-white text-xl font-semibold py-2">
                  Proyecto
              </h3>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="#" onClick={(e) => e.preventDefault()}>
                  Sobre el proyecto 
              </a>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="#" onClick={(e) => e.preventDefault()}>
                  Objetivo
              </a>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="#" onClick={(e) => e.preventDefault()}>
                  Contacto
              </a>
            </li>
          </ul>
          </nav>

          <nav  aria-label="Legal">
          <ul className="space-y-2">
            <li>
              <h3 className="text-white/100 hover:text-white text-xl font-semibold py-2">
                  Legal
              </h3>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="#" onClick={(e) => e.preventDefault()}>
                  Aviso legal
              </a>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="#" onClick={(e) => e.preventDefault()}>
                  Política de privacidad
              </a>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="#" onClick={(e) => e.preventDefault()}>
                  Terminos de uso
              </a>
            </li>
          </ul>
          </nav>

          <nav  aria-label="Recursos">
          <ul className="space-y-2">
            <li>
              <h3 className="text-white/100 hover:text-white text-xl font-semibold py-2">
                  Recursos
              </h3>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="https://www.boe.es/biblioteca_juridica/abrir_pdf.php?id=PUB-DT-2025-139"
                  target="_blank" rel="noreferrer">
                  Estatutos de los trabajadores
              </a>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-7766"
                  target="_blank" rel="noreferrer">
                  Convenios colectivos
              </a>
            </li>
            <li>
              <a className="text-white/80 hover:text-white" 
                  href="https://administracion.gob.es/pag_Home/en/atencionCiudadana/calendarios/laboral.html"
                  target="_blank" rel="noreferrer">
                  Calendarios Laborales
              </a>
            </li>
          </ul>
          </nav>

          <address aria-label="Recursos">
          <ul className="space-y-2">
            <li>
              <h3 className="text-white/100 hover:text-white text-xl font-semibold py-2">
                  Información
              </h3>
            </li>
            <li>
              <p className="text-white/80 hover:text-white ">
                  R/San Clemente s/n
              </p>
            </li>
            <li>
              <p className="text-white/80 hover:text-white">
                  15705 - Santiago de Compostela
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2 text-white/80">
              <FiPhone className="h-4 w-4" aria-hidden="true" />
              <a href="tel:+34881867501" className="hover:text-white">
                (+34) 881 867 501
                </a>    
              </div>
            </li>
          </ul>
        </address>
      </div>
        <div className="flex flex-row pt-10 gap-8 justify-center md:justify-end text-white">
          <a href="#" onClick={(e)=>e.preventDefault()} aria-label="Facebook"
            className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer">
            <FaFacebookF className="h-6 w-6"/>
          </a>
          <a href="#" onClick={(e)=>e.preventDefault()} aria-label="Instagram"
            className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer">
            <FaInstagram className="h-6 w-6"/>
          </a>
          <a href="#" onClick={(e)=>e.preventDefault()} aria-label="Linkedin"
            className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer">
            <FaLinkedinIn className="h-6 w-6" />
          </a>
          <a href="#" onClick={(e)=>e.preventDefault()} aria-label="X"
            className=" hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer">
            <FaXTwitter className="h-6 w-6 " />
          </a>
        </div>

        {/* SEPARACIÓN */}

        <div className="my-8">
          <div className="h-px bg-white/20 mx-auto" />
        </div>



        {/* AUTOR */}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <p className="leading-6 text-white/80 font-medium">
            Proyecto académico (demo)
          </p>
          
          <p className="text-white/80 leading-6 font-medium">
            © {new Date().getFullYear()} David Docampo Trabazo
          </p>
        </div>

      </div>
    </footer>
  )
}

