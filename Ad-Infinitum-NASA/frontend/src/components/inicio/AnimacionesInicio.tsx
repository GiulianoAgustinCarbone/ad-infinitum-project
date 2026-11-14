"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Animaciones de la pagina de inicio con GSAP.
// Solo corren sin "reducir movimiento"; con esa preferencia todo queda visible y quieto.
//   [data-entrada]  entrada escalonada del hero al cargar
//   [data-revelar]  aparece al entrar en pantalla
//   [data-fondo]    paralaje suave del fondo de la primera pantalla
export function AnimacionesInicio() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-entrada]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, delay: 0.05 },
      );

      for (const el of gsap.utils.toArray<HTMLElement>("[data-revelar]")) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      }

      gsap.to("[data-fondo]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true },
      });
    });
    return () => mm.revert();
  }, []);
  return null;
}
