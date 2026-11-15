import { redirect } from "next/navigation";

// La comparacion de departamentos vivira en /focos/comparar; mientras tanto, a /focos
export default function Comparar() {
  redirect("/focos#estacionalidad");
}
