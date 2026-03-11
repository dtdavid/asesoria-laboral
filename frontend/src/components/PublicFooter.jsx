import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { FaXTwitter, FaYoutube } from "react-icons/fa6"
import { FiPhone } from "react-icons/fi"

/**
 * Footer público de la aplicación.
 * Incluye información legal básica y nota académica.
 */
export default function PublicFooter() {
  return (
    <footer className="mt-12 bg-brand-footer">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-24">
          {/* ENLACES PROYECTO */}
          <nav aria-label="Proyecto">
            <ul className="space-y-2">
              <li>
                <h3 className="h-10 flex items-center text-white text-xl font-semibold">Proyecto</h3>
              </li>

              {/* Si aún no tienes secciones con id, déjalo con preventDefault */}
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline"
                  href="https://gitlab.iessanclemente.net/dawd/a25daviddt"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sobre el proyecto
                </a>
              </li>

              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline"
                  href="/#funcionalidades"
                >
                  Objetivo
                </a>
              </li>

              <li>
                <a href="/#contacto" className="text-white/80 hover:text-white hover:underline">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          {/* ENLACES LEGAL */}
          <nav aria-label="Legal">
            <ul className="space-y-2">
              <li>
                <h3 className="h-10 flex items-center text-white text-xl font-semibold">Legal</h3>
              </li>

              <li>
                <span className="text-white/80">Aviso legal (demo)</span>
              </li>
              <li>
                <span className="text-white/80">Política de privacidad (demo)</span>
              </li>
              <li>
                <span className="text-white/80">Términos de uso (demo)</span>
              </li>
            </ul>
          </nav>

          {/* ENLACES RECURSOS */}
          <nav aria-label="Recursos">
            <ul className="space-y-2">
              <li>
                <h3 className="h-10 flex items-center text-white text-xl font-semibold">Recursos</h3>
              </li>

              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline whitespace-nowrap"
                  href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430"
                  target="_blank"
                  rel="noreferrer"
                >
                  Estatuto de los trabajadores (BOE)
                </a>
              </li>

              <li>
                {/* BOE genérico para no caer en 404 */}
                <a
                  className="text-white/80 hover:text-white hover:underline"
                  href="https://www.boe.es/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Convenios colectivos (BOE)
                </a>
              </li>

              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline"
                  href="https://administracion.gob.es/pag_Home/en/atencionCiudadana/calendarios/laboral.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Calendarios laborales
                </a>
              </li>
            </ul>
          </nav>

          {/* INFO CONTACTO */}
          <address aria-label="Información" className="not-italic">
            <div className="flex h-full flex-col space-y-2">
              <ul className="space-y-2">
                <li>
                  <h3 className="h-10 flex items-center text-white text-xl font-semibold">Información</h3>
                </li>

                <li>
                  <p className="text-white/80">R/San Clemente s/n</p>
                </li>

                <li>
                  <p className="text-white/80">15705 - Santiago de Compostela</p>
                </li>

                <li>
                  <div className="flex items-center gap-2 text-white/80">
                    <FiPhone className="h-4 w-4" aria-hidden="true" />
                    <a href="tel:+34881867501" className="hover:text-white hover:underline">
                      (+34) 881 867 501
                    </a>
                  </div>
                </li>

                <li>
                  <a
                    className="text-white/80 hover:text-white hover:underline"
                    href="mailto:ies.sanclemente@edu.xunta.gal"
                  >
                    ies.sanclemente@edu.xunta.gal
                  </a>
                </li>
              </ul>
            </div>
          </address>
        </div>

        {/* REDES */}
        <div className="mt-auto flex gap-6 pt-6 text-white justify-center md:justify-end">
          <a
            href="https://www.facebook.com/iessanclemente/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer"
          >
            <FaFacebookF className="h-6 w-6" />
          </a>

          <a
            href="https://www.instagram.com/iessanclemente/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer"
          >
            <FaInstagram className="h-6 w-6" />
          </a>

          <a
            href="https://www.youtube.com/@sanclementetv"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer"
          >
            <FaYoutube className="h-6 w-6" />
          </a>

          <a
            href="https://x.com/IESSanClemente"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer"
          >
            <FaXTwitter className="h-6 w-6" />
          </a>
        </div>

        {/* SEPARACIÓN */}
        <div className="my-8">
          <div className="h-px bg-white/20 mx-auto" />
        </div>

        {/* AUTOR */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <p className="leading-6 text-white/80 font-medium">Proyecto académico (demo)</p>
          <p className="text-white/80 leading-6 font-medium">
            © {new Date().getFullYear()} David Docampo Trabazo
          </p>
        </div>
      </div>
    </footer>
  )
}

