

export default function Button({className = "", ...props}) {
    //className: clases extras para añadir desde fuera
    //...props: recoge el resto de props (type, onClick, disable, children, etc...)

  return (
    <button

    {...props} // aquí se copia al <button> todo lo que venga en props

     className={

        //Estilo base del botón, se aplica siempre

        "inline-flex items-center justify-center rounded px-4 py-2 text-sm font medium " + 
        "bg-gray-700 text-white hover:bg-gray-800" + 

        // estilos cuando el botón está deshabilitado

        "disabled:opacity-50 disabled:cursor-not-allowed " +

        //Estilo adicional al usar el componente

        className
     }
    />
)
}
