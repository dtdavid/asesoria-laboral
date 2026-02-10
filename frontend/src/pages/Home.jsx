
import Button from "../components/ui/Button"
import {useNavigate} from "react-router-dom"


export default function Home() {

  const navigate = useNavigate()

  const goRegister = () => {
    navigate("/registro")
  }





  return (
    <div className=" space-y-16">

      {/* HERO */}
      <section className="space-y-6 text-center" id="top">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold">Asesoría laboral (Prototipo)</h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Aplicación web para organizar empresas, trabajadores e incidencias laborales en un entorno único. Proyecto académico orientado a un caso real.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={goRegister} className="sn:w-auto">
            Crear cuenta
          </Button>
          <Button
            onClick={() => navigate("/login")}
            className="sm:w-auto bg-gray-200 text-gray-900 hover:bg-gray-300"
          >
            Acceder
          </Button>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="space-y-6" id="problems">
        <header className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Qué problemas resuelve</h2>
          <p className="text-sm text-gray-600">
            Centraliza la información y reduce el trabajo manual. Facilita la comunicación entre empresas y trabajadores. Permite un seguimiento eficiente de las incidencias laborales.
          </p>
        </header>

        <div className="gridgap-4md:grid-cols-3">
          <article className="borderroundedp-4space-y-2">
            <h3 className="font-semibold">Información dispersa</h3>
            <p className="text-sm text-gray-600">
              Empresas, trabajadores y gestiones organizadas en un mismo sitio.
            </p>
          </article>

          <article className="borderroundedp-4space-y-2">
            <h3 className="font-semibold">Seguimiento de incidencias</h3>
            <p className="text-sm text-gray-600">
              Registro y control de altas, bajas, vacaciones e IT.
            </p>
          </article>

          <article className="borderroundedp-4space-y-2">
            <h3 className="font-semibold">Consulta rápida</h3>
            <p className="text-sm text-gray-600">
              Acceso sencillo a datos clave para el trabajo diario.
            </p>
          </article>
        </div>
      </section>

      {/* QUÉ PERMITE HACER */}
      <section className="space-y-6" id="funcionalidades">
        <header className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Qué permite hacer</h2>
          <p className="text-sm text-gray-600">
            Funcionalidades planteadas para una asesoría laboral.
          </p>
        </header>

        <div className="gridgap-4md:grid-cols-2">

          <div className="border rounded p-4 space-y-1">
            <p className="font-semibold">Gestión de empresas</p>
            <p className="text-sm text-gray-600">
              Alta y consulta de clientes / empresas.
            </p>
          </div>

          <div className="border rounded p-4 space-y-1">
            <p className="font-semibold">Gestión de trabajadores</p>
            <p className="text-sm text-gray-600">
              Ficha y estado laboral por empresa.
            </p>
          </div>

          <div className="border rounded p-4 space-y-1">
            <p className="font-semibold">Incidencias laborales</p>
            <p className="text-sm text-gray-600">
              Vacaciones, IT, variaciones de datos.
            </p>
          </div>

          <div className="border rounded p-4 space-y-1">
            <p className="font-semibold">Panel privado</p>
            <p className="text-sm text-gray-600">
              Dashboard con accesos rápidos.
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}

      <section id="como-funciona" className="space-y-6">
        <header className="text-centerspace-y-2">
          <h2 className="text-2xl font-semibold">Cómo funciona</h2>
          <p className="text-sm text-gray-600">
            Flujo básico del uso del sistema.
          </p>
        </header>

        <ol className="gridgap-4md:grid-cols-3">
          <li className="border rounded p-4 space-y-1">
            <p className="text-sm font-medium">Paso 1</p>
            <p className="font-semibold">Crear cuenta o iniciar sesión.</p>
            <p className="text-sm text-gray-600">Accede al área privada.</p>
          </li>

          <li className="border rounded p-4 space-y-1">
            <p className="text-sm font-medium">Paso 2</p>
            <p className="font-semibold">Registrar empresa y trabajadores.</p>
            <p className="text-sm text-gray-600">Estructura la información.</p>
          </li>

          <li className="border rounded p-4 space-y-1">
            <p className="text-sm font-medium">Paso 3</p>
            <p className="font-semibold">Gestionar incidencias.</p>
            <p className="text-sm text-gray-600">Lleva el seguimiento y estado.</p>
          </li>
        </ol>
      </section>

      {/* RECURSOS */}

        <section id="recursos" className="space-y-6">
          <header className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Recursos</h2>
            <p className="text-sm text-gray-600">
              Enlaces útiles (se ampliará en futuros prototipos).
            </p>
          </header>

          <div className="border rounded p-4 space-y-3">
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Estatuto de los Trabajadores (pendiente de enlazar)</li>
              <li>Calendarios laborales (pendiente de enlazar)</li>
              <li>Convenios colectivos (futura mejora)</li>
            </ul>
          </div>
        </section>

      {/* CTA FINAL */} 

      <section className="text-center space-y-3 border-t pt-10" id="cta">
        <h2 className="text-2xl font-semibold">¿Empezamos?</h2>
        <p className="text-sm text-gray-600">
          Accede al prototipo y revisa el panel privado.
        </p>

        <div className="flexflex-colsm:flex-rowgap-3justify-center">
          <Button onClick={goRegister} className="sm:w-auto"> 
            Registro
          </Button>
          <Button
            onClick={() => navigate("/login")}
            className="sm:w-auto bg-gray-200 text-gray-900 hover:bg-gray-300"
          >
            Login
          </Button>
        </div>
      </section>

    </div>
  )
}




