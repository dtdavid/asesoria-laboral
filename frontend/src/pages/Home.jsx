import Button from "../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { FaBuilding, FaUsers, FaClipboardList, FaLock } from "react-icons/fa"
import { FaGavel, FaBook, FaIdCard, FaExternalLinkAlt } from "react-icons/fa"
import { FaLayerGroup, FaRegClock, FaSearch } from "react-icons/fa"
import { FaUserCheck, FaRegBuilding, FaTasks } from "react-icons/fa"
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"

/**
 * Home (landing pública)
 * Presenta el proyecto y guía al usuario a Login/Registro.
 * Incluye secciones con id para navegación por anclas desde el Navbar.
 */
export default function Home() {
  const navigate = useNavigate()

  // Navegación programática: CTA a registro
  const goRegister = () => {
    navigate("/registro")
  }

  // Contenedor consistente para todas las secciones (alineado con PublicLayout)
  const container = "w-full max-w-7xl mx-auto px-4"

  // Cards consistentes (borde + hover sutil). Sin “caja dentro de caja”.
  const card =
    "rounded-xl border border-brand-border bg-white p-6 transition-shadow hover:shadow-sm"

  // Wrapper visual para cada sección: una “tarjeta de sección” sutil (sin borde duro)
  // Regla: fondo global único + secciones como tarjetas alternando blanco/surface.
  const sectionBase = "rounded-2xl shadow-sm px-6 py-12 sm:px-10 sm:py-16 md:py-20"

  const sectionWhite = `${sectionBase} bg-white`
  const sectionSurface = `${sectionBase} bg-brand-surface`

  return (
    <div className="bg-brand-bg">
      {/* HERO: presentación rápida + CTAs */}
      <section className="py-10" id="top">
        <div className={container}>
          <div className={`${sectionWhite} space-y-6 text-center`}>
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-semibold text-brand-text">
                Asesoría laboral (demo)
              </h1>
              <p className="text-sm md:text-base text-brand-muted max-w-2xl mx-auto">
                Aplicación web para organizar empresas, trabajadores e incidencias
                laborales en un entorno único. Proyecto académico orientado a un caso real.
              </p>
            </div>

            {/* CTAs: acciones principales */}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                onClick={goRegister}
                className="sm:min-w-[160px] sm:w-auto"
              >
                Crear cuenta
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/login")}
                className="sm:min-w-[160px] sm:w-auto"
              >
                Acceder
              </Button>
            </div>

            {/* Separador */}

            <div className="mx-auto h-px w-full max-w-4xl bg-brand-border/60" />

            {/* Imagen hero */}
            <img
              src="/hero.jpg"
              alt="Entorno de trabajo en asesoría"
              className="mx-auto w-full max-w-4xl h-52 sm:h-64 object-cover rounded-2xl border border-brand-border/70 shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="py-10 scroll-mt-24" id="problemas">
        <div className={container}>
          <div className={`${sectionSurface} space-y-6`}>
            <header className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-brand-text">
                Qué problemas resuelve
              </h2>
              <p className="text-sm text-brand-muted max-w-2xl mx-auto">
                Centraliza la información y reduce el trabajo manual. Facilita la comunicación
                y permite un seguimiento eficiente de incidencias laborales.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-3">

              <article className={card}>
                <div className="flex items-start gap-3">
                  <FaLayerGroup className="mt-0.5 text-2xl md:text-3xl text-brand-secondary" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-brand-text">Información dispersa</h3>
                    <p className="text-sm text-brand-muted">
                      Empresas, trabajadores y gestiones organizadas en un mismo sitio.
                    </p>
                  </div>
                </div>
              </article>

              <article className={card}>
                <div className="flex items-start gap-3">
                  <FaRegClock className="mt-0.5 text-2xl md:text-3xl text-brand-secondary" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-brand-text">Seguimiento de incidencias</h3>
                    <p className="text-sm text-brand-muted">
                      Registro y control de altas, bajas, vacaciones e IT.
                    </p>
                  </div>
                </div>
              </article>

              <article className={card}>
                <div className="flex items-start gap-3">
                  <FaSearch className="mt-0.5 text-2xl md:text-3xl text-brand-secondary" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-brand-text">Consulta rápida</h3>
                    <p className="text-sm text-brand-muted">
                      Acceso sencillo a datos clave para el trabajo diario.
                    </p>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="py-10 scroll-mt-24" id="funcionalidades">
        <div className={container}>
          <div className={`${sectionWhite} space-y-6`}>
            <header className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-brand-text">Qué permite hacer</h2>
              <p className="text-sm text-brand-muted">
                Funcionalidades planteadas para una asesoría laboral.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">

              {/* Gestión de empresas */}
            <div className={card}>
              <div className="flex items-start gap-3">
                <FaBuilding className="mt-0.5 text-2xl md:text-3xl text-brand-secondary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-brand-text">Gestión de empresas</p>
                  <p className="text-sm text-brand-muted">
                    Alta y consulta de clientes/empresas.
                  </p>
                </div>
              </div>
            </div>

            {/* Gestión de trabajadores */}
            <div className={card}>
              <div className="flex items-start gap-3">
                <FaUsers className="mt-0.5 text-2xl md:text-3xl text-brand-secondary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-brand-text">Gestión de trabajadores</p>
                  <p className="text-sm text-brand-muted">
                    Ficha y estado laboral por empresa.
                  </p>
                </div>
              </div>
            </div>

            {/* Incidencias laborales */}
            <div className={card}>
              <div className="flex items-start gap-3">
                <FaClipboardList className="mt-0.5 text-2xl md:text-3xl text-brand-secondary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-brand-text">Incidencias laborales</p>
                  <p className="text-sm text-brand-muted">
                    Vacaciones, IT, variaciones de datos.
                  </p>
                </div>
              </div>
            </div>

            {/* Panel privado */}
            <div className={card}>
              <div className="flex items-start gap-3">
                <FaLock className="mt-0.5 text-2xl md:text-3xl text-brand-secondary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-brand-text">Panel privado</p>
                  <p className="text-sm text-brand-muted">
                    Dashboard con accesos rápidos.
                  </p>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-10 scroll-mt-24" id="como-funciona">

        <div className={container}>

          <div className={`${sectionSurface} space-y-6`}>

            <header className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-brand-text">Cómo funciona</h2>
              <p className="text-sm text-brand-muted">Flujo básico de uso del sistema.</p>
            </header>

            <ol className="grid gap-4 md:grid-cols-3">
              <li className={card}>
                <div className="flex items-center gap-2 text-sm font-medium text-brand-muted">
                  <FaUserCheck aria-hidden="true" />
                  <span>Paso 1</span>
                </div>
                <p className="font-semibold text-brand-text">Crear cuenta o iniciar sesión</p>
                <p className="text-sm text-brand-muted">Accede al área privada.</p>
              </li>

              <li className={card}>
                <div className="flex items-center gap-2 text-sm font-medium text-brand-muted">
                  <FaRegBuilding aria-hidden="true" />
                  <span>Paso 2</span>
                </div>
                <p className="font-semibold text-brand-text">Registrar empresa y trabajadores</p>
                <p className="text-sm text-brand-muted">Estructura la información.</p>
              </li>

              <li className={card}>
                <div className="flex items-center gap-2 text-sm font-medium text-brand-muted">
                  <FaTasks aria-hidden="true" />
                  <span>Paso 3</span>
                </div>
                <p className="font-semibold text-brand-text">Gestionar incidencias</p>
                <p className="text-sm text-brand-muted">Lleva el seguimiento y estado.</p>
              </li>
            </ol>
            
          </div>

        </div>

      </section>

      {/* RECURSOS */}
      <section className="py-10 scroll-mt-24" id="recursos">
        <div className={container}>
          <div className={`${sectionWhite} space-y-6`}>
            <header className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-brand-text">Recursos</h2>
              <p className="text-sm text-brand-muted">
                Enlaces útiles (se ampliará en futuros prototipos).
              </p>
            </header>

            <div className={card}>
              <div className="space-y-3 text-sm">
                <a
                  href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary"
                >
                  <FaBook className="shrink-0" aria-hidden="true" />
                  <span className="underline">Estatuto de los Trabajadores (BOE)</span>
                  <FaExternalLinkAlt className="ml-auto shrink-0 opacity-60" aria-hidden="true" />
                </a>

                <a
                  href="https://www.boe.es/buscar/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary"
                >
                  <FaGavel className="shrink-0" aria-hidden="true" />
                  <span className="underline">Buscar convenios colectivos (BOE)</span>
                  <FaExternalLinkAlt className="ml-auto shrink-0 opacity-60" aria-hidden="true" />
                </a>

                <a
                  href="https://portal.seg-social.gob.es/wps/portal/importass/importass/inicio"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary"
                >
                  <FaIdCard className="shrink-0" aria-hidden="true" />
                  <span className="underline">Import@ss (Seguridad Social)</span>
                  <FaExternalLinkAlt className="ml-auto shrink-0 opacity-60" aria-hidden="true" />
                </a>

                <a
                  href="https://sede.sepe.gob.es/portalSede/es/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary"
                >
                  <FaIdCard className="shrink-0" aria-hidden="true" />
                  <span className="underline">SEPE – Sede electrónica</span>
                  <FaExternalLinkAlt className="ml-auto shrink-0 opacity-60" aria-hidden="true" />
                </a>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-10 scroll-mt-24" id="contacto">
        <div className={container}>
          <div className={`${sectionWhite} space-y-6`}>
            <header className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-brand-text">Contacto</h2>
              <p className="text-sm text-brand-muted">
                Datos de contacto (entorno académico / demo).
              </p>
            </header>

            <div className={card}>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-0.5 text-brand-secondary" aria-hidden="true" />
                  <p className="text-brand-text">
                    R/ San Clemente s/n, 15705 – Santiago de Compostela
                  </p>
                </div>

                <a
                  href="mailto:ies.sanclemente@edu.xunta.gal"
                  className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary"
                >
                  <FaEnvelope aria-hidden="true" />
                  <span className="underline">ies.sanclemente@edu.xunta.gal</span>
                </a>

                <a
                  href="tel:+34881867501"
                  className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary"
                >
                  <FaPhone aria-hidden="true" />
                  <span className="underline">(+34) 881 867 501</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA FINAL */}
      <section className="py-10 scroll-mt-24" id="cta">
        <div className={container}>
          <div className={`${sectionSurface} text-center space-y-3`}>
            <h2 className="text-2xl font-semibold text-brand-text">¿Empezamos?</h2>
            <p className="text-sm text-brand-muted">
              Accede al prototipo y revisa el panel privado.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                variant="primary"
                onClick={goRegister}
                className="sm:min-w-[160px] sm:w-auto"
              >
                Registro
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/login")}
                className="sm:min-w-[160px] sm:w-auto"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}






