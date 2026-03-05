import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-bg relative overflow-hidden">
      {/* MÓVIL: imagen arriba (hero) */}
      <div className="md:hidden">
        <img
          src="/img_404.jpg"
          alt=""
          className="h-56 w-full object-cover object-center"
        />
        {/* overlay suave para que el corte no sea brusco */}
        <div className="-mt-10 h-10 bg-gradient-to-b from-transparent to-brand-bg" />
      </div>

      {/* DESKTOP: background a pantalla completa */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/img_404.jpg)" }}
        aria-hidden="true"
      />
      {/* capa para legibilidad en desktop */}
      <div className="hidden md:block absolute inset-0 bg-white/10" aria-hidden="true" />

      {/* Contenido (móvil y desktop) */}
      <div className="relative flex items-center justify-center px-4 py-10 md:min-h-screen">
        <div className="w-full max-w-3xl rounded-2xl bg-white/75 p-6 sm:p-10 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Error 404
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-brand-text">
            Página no encontrada
          </h1>

          <p className="mt-3 text-sm sm:text-base text-brand-muted">
            La dirección que has escrito no existe o la página ha sido movida.
            Puedes volver al inicio o regresar a la página anterior.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate("/")}>Ir a Home</Button>
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Volver atrás
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
