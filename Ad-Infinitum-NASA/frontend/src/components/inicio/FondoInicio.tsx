import type { ReactNode } from "react";
import estilos from "./FondoInicio.module.css";

// Espacio reservado para el fondo de la pagina de inicio.
// Ocupa la primera pantalla detras de la barra de navegacion (que es transparente) y del hero.
// Para cambiarlo, pasar una imagen o un video como hijo, por ejemplo:
//   <FondoInicio><img src="/fondo/san-luis.webp" alt="" /></FondoInicio>
// El contenido se recorta y se cubre con un degradado hacia el color de fondo para mantener el contraste del texto.
// Sin hijos se muestra un resplandor suave con la escala de fuego.
export function FondoInicio({ children, extendido = false }: { children?: ReactNode; extendido?: boolean }) {
  return (
    <div className={`${estilos.fondo} ${extendido ? estilos.extendido : ""}`} aria-hidden="true">
      <div className={estilos.capa} data-fondo>
        {children ?? <div className={estilos.resplandor} />}
      </div>
      <div className={estilos.velo} />
    </div>
  );
}
