/**
 * Botón reutilizable con variantes:
 * - primary: acción principal (CTA)
 * - secondary: acción secundaria (outline/neutral)
 * - ghost: enlace/botón mínimo
 *
 * Incluye estados accesibles:
 * - focus-visible:ring para teclado
 * - disabled con opacidad + cursor
 */
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  // Clases base (se aplican siempre)
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium " +
    "transition-colors duration-200 " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-brand-secondary focus-visible:ring-offset-2 " +
    "active:translate-y-[1px]"

  // Estilos cuando está deshabilitado: disabled:pointer-events-none
  const disabled =
    "disabled:opacity-70 disabled:saturate-50 disabled:cursor-not-allowed disabled:pointer-events-none"

  // Variantes visuales (según diseño UI/UX)
  const variants = {
    // Primario: sólido, con hover más oscuro (refuerza jerarquía)
    primary:
      "bg-brand-primary text-white hover:bg-brand-primaryHover shadow-sm",

    // Secundario: outline limpio, con hover sutil (no debe parecer disabled)
    secondary:
      "border border-brand-border bg-white text-brand-text hover:bg-brand-surface shadow-sm",

    // Ghost: mínimo, útil para acciones poco prioritarias
    ghost:
      "text-brand-text hover:bg-brand-surface",
  }

  return (
    <button
      {...props}
      className={[base, disabled, variants[variant], className].join(" ")}
    >
      {children}
    </button>
  )
}



