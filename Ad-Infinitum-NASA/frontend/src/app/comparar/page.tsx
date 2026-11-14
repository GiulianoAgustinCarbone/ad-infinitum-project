import { redirect } from "next/navigation";

// La comparacion de sectores ahora vive en la pagina principal
export default function Comparar() {
  redirect("/#estacionalidad");
}
