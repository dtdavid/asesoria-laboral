import Button from "../components/ui/Button"
import { useNavigate } from "react-router-dom"

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
  const sectionBase =
    "rounded-2xl shadow-sm px-6 py-12 sm:px-10 sm:py-16"

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
                <h3 className="font-semibold text-brand-text">Información dispersa</h3>
                <p className="text-sm text-brand-muted">
                  Empresas, trabajadores y gestiones organizadas en un mismo sitio.
                </p>
              </article>

              <article className={card}>
                <h3 className="font-semibold text-brand-text">Seguimiento de incidencias</h3>
                <p className="text-sm text-brand-muted">
                  Registro y control de altas, bajas, vacaciones e IT.
                </p>
              </article>

              <article className={card}>
                <h3 className="font-semibold text-brand-text">Consulta rápida</h3>
                <p className="text-sm text-brand-muted">
                  Acceso sencillo a datos clave para el trabajo diario.
                </p>
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
              <div className={card}>
                <p className="font-semibold text-brand-text">Gestión de empresas</p>
                <p className="text-sm text-brand-muted">
                  Alta y consulta de clientes/empresas.
                </p>
              </div>

              <div className={card}>
                <p className="font-semibold text-brand-text">Gestión de trabajadores</p>
                <p className="text-sm text-brand-muted">
                  Ficha y estado laboral por empresa.
                </p>
              </div>

              <div className={card}>
                <p className="font-semibold text-brand-text">Incidencias laborales</p>
                <p className="text-sm text-brand-muted">
                  Vacaciones, IT, variaciones de datos.
                </p>
              </div>

              <div className={card}>
                <p className="font-semibold text-brand-text">Panel privado</p>
                <p className="text-sm text-brand-muted">
                  Dashboard con accesos rápidos.
                </p>
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
                <p className="text-sm font-medium text-brand-muted">Paso 1</p>
                <p className="font-semibold text-brand-text">Crear cuenta o iniciar sesión</p>
                <p className="text-sm text-brand-muted">Accede al área privada.</p>
              </li>

              <li className={card}>
                <p className="text-sm font-medium text-brand-muted">Paso 2</p>
                <p className="font-semibold text-brand-text">Registrar empresa y trabajadores</p>
                <p className="text-sm text-brand-muted">Estructura la información.</p>
              </li>

              <li className={card}>
                <p className="text-sm font-medium text-brand-muted">Paso 3</p>
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
              <ul className="list-disc pl-5 text-sm text-brand-text space-y-1">
                <li>Estatuto de los Trabajadores (pendiente de enlazar)</li>
                <li>Calendarios laborales (pendiente de enlazar)</li>
                <li>Convenios colectivos (futura mejora)</li>
              </ul>
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






