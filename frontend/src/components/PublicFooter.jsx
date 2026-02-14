/**
 * Footer público de la aplicación.
 * Incluye información legal básica y nota académica.
 */
export default function PublicFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg">
      <div className="w-full max-w-4xl mx-auto px-4 py-6 text-sm text-brand-muted space-y-2">
        <p className="text-brand-text font-medium">Proyecto académico (demo)</p>
        <p>
          Aplicación web para la gestión interna de una asesoría laboral. Datos de prueba. No realiza trámites oficiales.
        </p>
        <p>© {new Date().getFullYear()} David Docampo Trabazo</p>
      </div>
    </footer>
  )
}
