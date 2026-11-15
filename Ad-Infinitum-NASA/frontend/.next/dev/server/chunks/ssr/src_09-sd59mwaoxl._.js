module.exports = [
"[project]/src/components/hero/HeroFocos.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "controles": "HeroFocos-module__AJUPnW__controles",
  "cuenta": "HeroFocos-module__AJUPnW__cuenta",
  "ejes": "HeroFocos-module__AJUPnW__ejes",
  "estado": "HeroFocos-module__AJUPnW__estado",
  "figura": "HeroFocos-module__AJUPnW__figura",
  "lectura": "HeroFocos-module__AJUPnW__lectura",
  "lienzo": "HeroFocos-module__AJUPnW__lienzo",
  "marco": "HeroFocos-module__AJUPnW__marco",
  "mes": "HeroFocos-module__AJUPnW__mes",
  "pie": "HeroFocos-module__AJUPnW__pie",
  "tira": "HeroFocos-module__AJUPnW__tira",
});
}),
"[project]/src/components/hero/HeroFocos.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroFocos",
    ()=>HeroFocos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/focos.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/focos/escala.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$proyeccion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/focos/proyeccion.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formato.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/hero/HeroFocos.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
;
const MS_POR_MES = 85;
const PAUSA_FINAL_MS = 4000;
const ESTELA = 4;
function anillosDe(geo) {
    const anillos = [];
    for (const f of geo.features){
        if (f.geometry.type === "Polygon") anillos.push(f.geometry.coordinates[0]);
        else for (const p of f.geometry.coordinates)anillos.push(p[0]);
    }
    return anillos;
}
function HeroFocos() {
    const lienzo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tira = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textoMes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textoCuenta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [datos, setDatos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pausado, setPausado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quieto, setQuieto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activa, setActiva] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const animar = !quieto || activa;
    const pausadoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const actualizar = ()=>setQuieto(mq.matches);
        actualizar();
        mq.addEventListener("change", actualizar);
        return ()=>mq.removeEventListener("change", actualizar);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        pausadoRef.current = pausado;
    }, [
        pausado
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let vivo = true;
        Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fuenteFocos"].getFocos(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fuenteFocos"].getDepartamentos()
        ]).then(([focos, deptos])=>{
            if (!vivo) return;
            const c = focos.columnas;
            const [a0, m0] = focos.fechaMin.split("-").map(Number);
            const [a1, m1] = focos.fechaMax.split("-").map(Number);
            const meses = (a1 - a0) * 12 + (m1 - m0) + 1;
            const porMes = Array.from({
                length: meses
            }, ()=>[]);
            for(let i = 0; i < focos.n; i++){
                porMes[(c.anio[i] - a0) * 12 + (c.mes[i] - m0)]?.push(i);
            }
            setDatos({
                anillos: anillosDe(deptos),
                lon: c.lon,
                lat: c.lat,
                power: c.power,
                porMes,
                mes0: {
                    anio: a0,
                    mes: m0
                },
                anioDesde: a0,
                anioHasta: a1,
                mesHasta: m1,
                total: focos.n
            });
        }).catch(()=>vivo && setError(true));
        return ()=>{
            vivo = false;
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const cv = lienzo.current;
        const cvTira = tira.current;
        if (!datos || !cv || !cvTira) return;
        const ctx = cv.getContext("2d");
        const ctxTira = cvTira.getContext("2d");
        if (!ctx || !ctxTira) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const base = document.createElement("canvas");
        const ceniza = document.createElement("canvas");
        let ancho = 0;
        let alto = 0;
        let anchoTira = 0;
        let altoTira = 0;
        let proy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$proyeccion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ajustarProyeccion"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$proyeccion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cajaDe"])(datos.anillos), 1, 1, 0);
        const maxMes = Math.max(...datos.porMes.map((m)=>m.length));
        let mesDibujado = -1;
        const fecha = (k)=>{
            const t = datos.mes0.mes - 1 + k;
            return {
                anio: datos.mes0.anio + Math.floor(t / 12),
                mes: t % 12 + 1
            };
        };
        const dibujarBase = ()=>{
            base.width = ceniza.width = cv.width;
            base.height = ceniza.height = cv.height;
            const b = base.getContext("2d");
            b.setTransform(dpr, 0, 0, dpr, 0, 0);
            b.lineJoin = "round";
            for (const anillo of datos.anillos){
                b.beginPath();
                anillo.forEach(([lon, lat], i)=>i ? b.lineTo(proy.x(lon), proy.y(lat)) : b.moveTo(proy.x(lon), proy.y(lat)));
                b.closePath();
                b.fillStyle = "#1b2a3a";
                b.fill();
                b.strokeStyle = "#4a6077";
                b.lineWidth = 1;
                b.stroke();
            }
            // Marcas de coordenadas cada grado sobre el borde, como en una carta
            const fuente = getComputedStyle(document.body).fontFamily;
            b.font = `12px ${fuente}`;
            b.fillStyle = "#95a1ad";
            b.strokeStyle = "#2d4054";
            for(let lat = -32; lat >= -36; lat--){
                const y = proy.y(lat);
                if (y < 14 || y > alto - 6) continue;
                b.beginPath();
                b.moveTo(0, y);
                b.lineTo(10, y);
                b.stroke();
                b.fillText(`${-lat}Â° S`, 14, y + 4);
            }
            for(let lon = -67; lon <= -65; lon++){
                const x = proy.x(lon);
                if (x < 30 || x > ancho - 30) continue;
                b.beginPath();
                b.moveTo(x, alto);
                b.lineTo(x, alto - 10);
                b.stroke();
                b.fillText(`${-lon}Â° O`, x - 14, alto - 14);
            }
        };
        const punto = (c, i, r)=>{
            c.beginPath();
            c.arc(proy.x(datos.lon[i]), proy.y(datos.lat[i]), r, 0, Math.PI * 2);
            c.fill();
        };
        const sumarCeniza = (k)=>{
            const c = ceniza.getContext("2d");
            c.setTransform(dpr, 0, 0, dpr, 0, 0);
            c.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FUEGO"][0];
            c.globalAlpha = 0.32;
            for (const i of datos.porMes[k])punto(c, i, 1.1);
            c.globalAlpha = 1;
        };
        const dibujarTira = (k)=>{
            ctxTira.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctxTira.clearRect(0, 0, anchoTira, altoTira);
            const n = datos.porMes.length;
            const w = anchoTira / n;
            for(let j = 0; j < n; j++){
                const h = Math.max(1, Math.sqrt(datos.porMes[j].length) / Math.sqrt(maxMes) * (altoTira - 4));
                ctxTira.fillStyle = j <= k ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FUEGO"][2] : "#2d4054";
                ctxTira.fillRect(j * w, altoTira - h, Math.max(1, w - 0.6), h);
            }
            if (k >= 0 && k < n) {
                ctxTira.fillStyle = "#ece8df";
                ctxTira.fillRect(k * w - 0.5, 0, 1.5, altoTira);
            }
        };
        const dibujar = (k)=>{
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, cv.width, cv.height);
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(ceniza, 0, 0);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // Estela: el mes actual brilla y los anteriores se apagan
            for(let e = ESTELA - 1; e >= 0; e--){
                const j = k - e;
                if (j < 0 || j >= datos.porMes.length) continue;
                ctx.globalAlpha = e === 0 ? 1 : 0.55 / e;
                for (const i of datos.porMes[j]){
                    ctx.fillStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorPotencia"])(datos.power[i]);
                    punto(ctx, i, e === 0 ? 2.6 : 1.8);
                }
            }
            ctx.globalAlpha = 1;
            dibujarTira(k);
            if (k >= 0 && k < datos.porMes.length) {
                const f = fecha(k);
                if (textoMes.current) textoMes.current.textContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mesAnio"])(f.anio, f.mes);
                if (textoCuenta.current) {
                    const n = datos.porMes[k].length;
                    textoCuenta.current.textContent = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(n)} ${n === 1 ? "foco" : "focos"}`;
                }
            }
        };
        const estadoFinal = ()=>{
            const c = ceniza.getContext("2d");
            c.setTransform(1, 0, 0, 1, 0, 0);
            c.clearRect(0, 0, ceniza.width, ceniza.height);
            datos.porMes.forEach((_, k)=>sumarCeniza(k));
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, cv.width, cv.height);
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(ceniza, 0, 0);
            dibujarTira(datos.porMes.length - 1);
            if (textoMes.current) textoMes.current.textContent = `${datos.anioDesde} a ${datos.anioHasta}`;
            if (textoCuenta.current) textoCuenta.current.textContent = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(datos.total)} focos`;
        };
        const medir = ()=>{
            const r = cv.getBoundingClientRect();
            // Al salir de la pagina el lienzo mide 0: no hay nada que dibujar
            if (r.width < 1 || r.height < 1) return;
            ancho = r.width;
            alto = r.height;
            cv.width = Math.round(ancho * dpr);
            cv.height = Math.round(alto * dpr);
            const rt = cvTira.getBoundingClientRect();
            anchoTira = rt.width;
            altoTira = rt.height;
            cvTira.width = Math.round(anchoTira * dpr);
            cvTira.height = Math.round(altoTira * dpr);
            proy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$proyeccion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ajustarProyeccion"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$proyeccion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cajaDe"])(datos.anillos), ancho, alto, Math.min(48, ancho * 0.08));
            dibujarBase();
            // Reconstruye la ceniza hasta el mes que se estaba mostrando
            if (!animar) estadoFinal();
            else {
                for(let k = 0; k <= mesDibujado; k++)sumarCeniza(k);
                dibujar(mesDibujado);
            }
        };
        const ro = new ResizeObserver(medir);
        ro.observe(cv);
        medir();
        if (!animar) return ()=>ro.disconnect();
        let raf = 0;
        let acumulado = 0;
        let ultimo = performance.now();
        const n = datos.porMes.length;
        const paso = (ahora)=>{
            const dt = ahora - ultimo;
            ultimo = ahora;
            if (!pausadoRef.current && document.visibilityState === "visible") acumulado += dt;
            const k = Math.floor(acumulado / MS_POR_MES);
            if (k < n) {
                while(mesDibujado < k){
                    mesDibujado++;
                    sumarCeniza(mesDibujado);
                }
                dibujar(k);
            } else if (acumulado > n * MS_POR_MES + PAUSA_FINAL_MS) {
                // Reinicia el recorrido
                acumulado = 0;
                mesDibujado = -1;
                const c = ceniza.getContext("2d");
                c.setTransform(1, 0, 0, 1, 0, 0);
                c.clearRect(0, 0, ceniza.width, ceniza.height);
            } else if (mesDibujado === n - 1 && k === n) {
                dibujar(n + ESTELA);
                if (textoMes.current) textoMes.current.textContent = `${datos.anioDesde} a ${datos.anioHasta}`;
                if (textoCuenta.current) textoCuenta.current.textContent = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(datos.total)} focos`;
            }
            raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
        return ()=>{
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [
        datos,
        animar
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].figura,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].marco,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: lienzo,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lienzo,
                        role: "img",
                        "aria-label": datos ? `Mapa de San Luis con sus nueve departamentos. Los focos de calor detectados por satélite aparecen mes a mes desde enero de ${datos.anioDesde} hasta ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mesAnio"])(datos.anioHasta, datos.mesHasta)} y dejan una marca acumulada.` : "Mapa de San Luis con sus nueve departamentos. Los focos de calor detectados por satélite aparecen mes a mes y dejan una marca acumulada."
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    !datos && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].estado,
                        children: "Cargando los focos de calor…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 312,
                        columnNumber: 30
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].estado,
                        children: "No se pudieron cargar los focos. RecargÃ¡ la pÃ¡gina para intentar de nuevo."
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 314,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lectura,
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                ref: textoMes,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mes,
                                children: "Â "
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                ref: textoCuenta,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cuenta,
                                children: "Â "
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pie,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: tira,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tira,
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ejes,
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: datos?.anioDesde
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: datos ? Math.round((datos.anioDesde + datos.anioHasta) / 2) : ""
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: datos?.anioHasta
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].controles,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                className: "nota",
                                children: "Cada barra es un mes: altura segÃºn la cantidad de focos."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            animar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "boton",
                                onClick: ()=>setPausado((p)=>!p),
                                "aria-pressed": pausado,
                                children: pausado ? "Reanudar" : "Pausar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "boton",
                                onClick: ()=>setActiva(true),
                                children: "Reproducir animaciÃ³n"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 341,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/hero/HeroFocos.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/inicio/AnimacionesInicio.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimacionesInicio",
    ()=>AnimacionesInicio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function AnimacionesInicio() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
        const mm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo("[data-entrada]", {
                autoAlpha: 0,
                y: 28
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.09,
                delay: 0.05
            });
            for (const el of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].utils.toArray("[data-revelar]")){
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(el, {
                    autoAlpha: 0,
                    y: 36
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        once: true
                    }
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to("[data-fondo]", {
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                    start: 0,
                    end: ()=>window.innerHeight,
                    scrub: true
                }
            });
        });
        return ()=>mm.revert();
    }, []);
    return null;
}
}),
"[project]/src/components/sitio/EstadoDato.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "compacta": "EstadoDato-module__FVInsG__compacta",
  "icono": "EstadoDato-module__FVInsG__icono",
  "insignia": "EstadoDato-module__FVInsG__insignia",
});
}),
"[project]/src/components/sitio/EstadoDato.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EstadoDato",
    ()=>EstadoDato
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$EstadoDato$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/sitio/EstadoDato.module.css [app-ssr] (css module)");
;
;
const TEXTO = {
    real: "Datos reales",
    ilustrativo: "Datos ilustrativos",
    proximamente: "Próximamente"
};
function EstadoDato({ estado, compacta = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$EstadoDato$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].insignia} ${compacta ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$EstadoDato$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].compacta : ""}`,
        "data-estado": estado,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 12 12",
                width: "12",
                height: "12",
                "aria-hidden": "true",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$EstadoDato$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icono,
                children: [
                    estado === "real" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "6",
                        cy: "6",
                        r: "4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sitio/EstadoDato.tsx",
                        lineNumber: 16,
                        columnNumber: 31
                    }, this),
                    estado === "ilustrativo" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M6 1.5 11 10.5H1Z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sitio/EstadoDato.tsx",
                        lineNumber: 17,
                        columnNumber: 38
                    }, this),
                    estado === "proximamente" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "6",
                                cy: "6",
                                r: "4.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sitio/EstadoDato.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M6 3.5V6l1.8 1.2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sitio/EstadoDato.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sitio/EstadoDato.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sitio/EstadoDato.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            TEXTO[estado]
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sitio/EstadoDato.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/sitio/Navegacion.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "barra": "Navegacion-module__ULB14q__barra",
  "inactivo": "Navegacion-module__ULB14q__inactivo",
  "interior": "Navegacion-module__ULB14q__interior",
  "marca": "Navegacion-module__ULB14q__marca",
  "marcaCentro": "Navegacion-module__ULB14q__marcaCentro",
  "menu": "Navegacion-module__ULB14q__menu",
  "nav": "Navegacion-module__ULB14q__nav",
});
}),
"[project]/src/components/sitio/Navegacion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navegacion",
    ()=>Navegacion,
    "SECCIONES",
    ()=>SECCIONES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$EstadoDato$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/sitio/EstadoDato.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Navegacion$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/sitio/Navegacion.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
;
;
const SECCIONES = [
    {
        texto: "Focos de calor",
        href: "/focos"
    },
    {
        texto: "Sequía y diques",
        href: null
    },
    {
        texto: "Método",
        href: null
    },
    {
        texto: "Datos",
        href: null
    }
];
function Navegacion() {
    const ruta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [abierta, setAbierta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [solida, setSolida] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Transparente arriba de todo; al hacer scroll la barra toma fondo
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
        const disparador = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
            start: 12,
            end: "max",
            onToggle: (s)=>setSolida(s.isActive)
        });
        return ()=>disparador.kill();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!abierta) return;
        const cerrar = (e)=>e.key === "Escape" && setAbierta(false);
        window.addEventListener("keydown", cerrar);
        return ()=>window.removeEventListener("keydown", cerrar);
    }, [
        abierta
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Navegacion$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].barra,
        "data-solida": solida || abierta,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `contenedor ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Navegacion$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].interior}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Navegacion$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].marca,
                    "aria-current": ruta === "/" ? "page" : undefined,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            width: "22",
                            height: "22",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sitio/Navegacion.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "12",
                                    cy: "12",
                                    r: "3.2",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Navegacion$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].marcaCentro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sitio/Navegacion.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 2v4M12 18v4M2 12h4M18 12h4",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sitio/Navegacion.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sitio/Navegacion.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Detective de Tendencias"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sitio/Navegacion.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sitio/Navegacion.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Navegacion$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].menu,
                    "aria-expanded": abierta,
                    "aria-controls": "menu-secciones",
                    onClick: ()=>setAbierta((v)=>!v),
                    children: abierta ? "Cerrar" : "Menú"
                }, void 0, false, {
                    fileName: "[project]/src/components/sitio/Navegacion.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    id: "menu-secciones",
                    "aria-label": "Principal",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Navegacion$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nav,
                    "data-abierta": abierta,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: SECCIONES.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: s.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: s.href,
                                    "aria-current": ruta === s.href ? "page" : undefined,
                                    onClick: ()=>setAbierta(false),
                                    children: s.texto
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sitio/Navegacion.tsx",
                                    lineNumber: 69,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Navegacion$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inactivo,
                                    "aria-disabled": "true",
                                    children: [
                                        s.texto,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$EstadoDato$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EstadoDato"], {
                                            estado: "proximamente",
                                            compacta: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sitio/Navegacion.tsx",
                                            lineNumber: 79,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sitio/Navegacion.tsx",
                                    lineNumber: 77,
                                    columnNumber: 19
                                }, this)
                            }, s.texto, false, {
                                fileName: "[project]/src/components/sitio/Navegacion.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/sitio/Navegacion.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sitio/Navegacion.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sitio/Navegacion.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sitio/Navegacion.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/data/focos.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EXTENSION_SAN_LUIS",
    ()=>EXTENSION_SAN_LUIS,
    "ErrorFocos",
    ()=>ErrorFocos,
    "fuenteFocos",
    ()=>fuenteFocos,
    "grillaDeFocos",
    ()=>grillaDeFocos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$serie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/serie.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$tipos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/tipos.ts [app-ssr] (ecmascript)");
;
;
// Fuente con datos reales: focos de calor de CONAE / Gobierno de San Luis,
// descargados una vez por backend/scripts/descargar_datos.mjs y copiados a
// public/datos/ por scripts/preparar-datos.mts. Se leen como archivos estaticos.
const BASE = "/datos";
class ErrorFocos extends Error {
}
const cache = new Map();
function pedir(archivo) {
    let p = cache.get(archivo);
    if (!p) {
        p = fetch(`${BASE}/${archivo}`).then((r)=>{
            if (!r.ok) throw new ErrorFocos(`No se pudo leer ${archivo} (HTTP ${r.status})`);
            return r.json();
        }).catch((error)=>{
            // Si falla se descarta para permitir reintentar
            cache.delete(archivo);
            throw error;
        });
        cache.set(archivo, p);
    }
    return p;
}
const EXTENSION_SAN_LUIS = {
    oeste: -67.5,
    este: -64.8,
    sur: -36.1,
    norte: -31.8
};
const LADO = 0.1;
function grillaDeFocos(focos) {
    const { oeste, este, sur, norte } = EXTENSION_SAN_LUIS;
    const nx = Math.round((este - oeste) / LADO);
    const ny = Math.round((norte - sur) / LADO);
    const conteos = new Map();
    const c = focos.columnas;
    for(let i = 0; i < focos.n; i++){
        const ix = Math.floor((c.lon[i] - oeste) / LADO);
        const iy = Math.floor((norte - c.lat[i]) / LADO);
        if (ix < 0 || ix >= nx || iy < 0 || iy >= ny) continue;
        const id = iy * nx + ix;
        const porAnio = conteos.get(id) ?? new Map();
        porAnio.set(c.anio[i], (porAnio.get(c.anio[i]) ?? 0) + 1);
        conteos.set(id, porAnio);
    }
    const features = [];
    for (const [id, porAnio] of conteos){
        const ix = id % nx;
        const iy = Math.floor(id / nx);
        const o = oeste + ix * LADO;
        const n = norte - iy * LADO;
        const propiedades = {
            id: `f${ix}-${iy}`
        };
        for (const anio of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$tipos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANIOS"])propiedades[(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$tipos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["claveAnio"])(anio)] = porAnio.get(anio) ?? 0;
        features.push({
            type: "Feature",
            id,
            properties: propiedades,
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [
                            o,
                            n
                        ],
                        [
                            o + LADO,
                            n
                        ],
                        [
                            o + LADO,
                            n - LADO
                        ],
                        [
                            o,
                            n - LADO
                        ],
                        [
                            o,
                            n
                        ]
                    ]
                ]
            }
        });
    }
    return {
        type: "FeatureCollection",
        features
    };
}
let grilla = null;
const fuenteFocos = {
    ilustrativo: false,
    getFocos: ()=>pedir("focos.json"),
    getDepartamentos: ()=>pedir("departamentos.geojson"),
    getSerieMensual: ()=>pedir("serie-aqua.json"),
    getEmbalses: ()=>pedir("embalses.geojson"),
    getGrilla () {
        grilla ??= this.getFocos().then(grillaDeFocos).catch((e)=>{
            grilla = null;
            throw e;
        });
        return grilla;
    },
    async getSerieSector (sector) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$serie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serieDesdeGrilla"])(await this.getGrilla(), sector);
    }
};
}),
"[project]/src/lib/data/serie.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "celdasEnSector",
    ()=>celdasEnSector,
    "centroCelda",
    ()=>centroCelda,
    "normalizarSector",
    ()=>normalizarSector,
    "serieDesdeGrilla",
    ()=>serieDesdeGrilla
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$tipos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/tipos.ts [app-ssr] (ecmascript)");
;
function centroCelda(celda) {
    let oeste = Infinity;
    let este = -Infinity;
    let sur = Infinity;
    let norte = -Infinity;
    for (const [lon, lat] of celda.geometry.coordinates[0]){
        oeste = Math.min(oeste, lon);
        este = Math.max(este, lon);
        sur = Math.min(sur, lat);
        norte = Math.max(norte, lat);
    }
    return [
        (oeste + este) / 2,
        (sur + norte) / 2
    ];
}
function normalizarSector([a, b, c, d]) {
    return [
        Math.min(a, c),
        Math.min(b, d),
        Math.max(a, c),
        Math.max(b, d)
    ];
}
function celdasEnSector(grilla, sector) {
    const [oeste, sur, este, norte] = normalizarSector(sector);
    return grilla.features.filter((celda)=>{
        const [lon, lat] = centroCelda(celda);
        return lon >= oeste && lon <= este && lat >= sur && lat <= norte;
    });
}
function serieDesdeGrilla(grilla, sector) {
    const celdas = celdasEnSector(grilla, sector);
    const years = [];
    const values = [];
    for (const anio of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$tipos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANIOS"]){
        const clave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$tipos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["claveAnio"])(anio);
        let suma = 0;
        let n = 0;
        for (const celda of celdas){
            const v = celda.properties[clave];
            if (Number.isFinite(v)) {
                suma += v;
                n++;
            }
        }
        if (n > 0) {
            years.push(anio);
            values.push(suma / n);
        }
    }
    return {
        years,
        values
    };
}
}),
"[project]/src/lib/data/tipos.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANIOS",
    ()=>ANIOS,
    "ANIO_FIN",
    ()=>ANIO_FIN,
    "ANIO_INICIO",
    ()=>ANIO_INICIO,
    "claveAnio",
    ()=>claveAnio
]);
const ANIO_INICIO = 2005;
const ANIO_FIN = 2024;
const ANIOS = Array.from({
    length: ANIO_FIN - ANIO_INICIO + 1
}, (_, i)=>ANIO_INICIO + i);
function claveAnio(anio) {
    return `t${anio}`;
}
}),
"[project]/src/lib/focos/escala.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Escalas de color compartidas por mapa, graficos y canvas (mismos valores que globals.css)
__turbopack_context__.s([
    "AGUA",
    ()=>AGUA,
    "CENIZA",
    ()=>CENIZA,
    "CERO",
    ()=>CERO,
    "CLASES_CONTEO",
    ()=>CLASES_CONTEO,
    "CLASES_POTENCIA",
    ()=>CLASES_POTENCIA,
    "CORTES_CONTEO",
    ()=>CORTES_CONTEO,
    "CORTES_POTENCIA",
    ()=>CORTES_POTENCIA,
    "FUEGO",
    ()=>FUEGO,
    "SIN_DATO",
    ()=>SIN_DATO,
    "colorConteo",
    ()=>colorConteo,
    "colorPotencia",
    ()=>colorPotencia,
    "tintaSobre",
    ()=>tintaSobre
]);
const FUEGO = [
    "#9b5bb5",
    "#d9507f",
    "#f07f4f",
    "#f8b44e",
    "#fcebb0"
];
const SIN_DATO = "#8d99a6";
const CERO = "#22344a";
const CENIZA = "#ece8df";
const AGUA = "#5e9cc9";
const CORTES_POTENCIA = [
    10,
    30,
    100,
    300
];
const CLASES_POTENCIA = [
    {
        etiqueta: "menos de 10 MW",
        color: FUEGO[0]
    },
    {
        etiqueta: "10 a 30 MW",
        color: FUEGO[1]
    },
    {
        etiqueta: "30 a 100 MW",
        color: FUEGO[2]
    },
    {
        etiqueta: "100 a 300 MW",
        color: FUEGO[3]
    },
    {
        etiqueta: "300 MW o más",
        color: FUEGO[4]
    }
];
const CORTES_CONTEO = [
    10,
    30,
    80,
    200
];
const CLASES_CONTEO = [
    {
        etiqueta: "1 a 9",
        color: FUEGO[0]
    },
    {
        etiqueta: "10 a 29",
        color: FUEGO[1]
    },
    {
        etiqueta: "30 a 79",
        color: FUEGO[2]
    },
    {
        etiqueta: "80 a 199",
        color: FUEGO[3]
    },
    {
        etiqueta: "200 o más",
        color: FUEGO[4]
    }
];
function colorConteo(v) {
    if (v <= 0) return CERO;
    let i = 0;
    while(i < CORTES_CONTEO.length && v >= CORTES_CONTEO[i])i++;
    return FUEGO[i];
}
function colorPotencia(p) {
    if (p === null) return SIN_DATO;
    let i = 0;
    while(i < CORTES_POTENCIA.length && p >= CORTES_POTENCIA[i])i++;
    return FUEGO[i];
}
function tintaSobre(color) {
    return color === FUEGO[0] || color === CERO || color === FUEGO[1] ? CENIZA : "#13202d";
}
}),
"[project]/src/lib/focos/proyeccion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ajustarProyeccion",
    ()=>ajustarProyeccion,
    "cajaDe",
    ()=>cajaDe
]);
function cajaDe(anillos) {
    const caja = {
        oeste: Infinity,
        este: -Infinity,
        sur: Infinity,
        norte: -Infinity
    };
    for (const anillo of anillos){
        for (const [lon, lat] of anillo){
            caja.oeste = Math.min(caja.oeste, lon);
            caja.este = Math.max(caja.este, lon);
            caja.sur = Math.min(caja.sur, lat);
            caja.norte = Math.max(caja.norte, lat);
        }
    }
    return caja;
}
function ajustarProyeccion(caja, ancho, alto, margen) {
    const latMedia = (caja.sur + caja.norte) / 2 * (Math.PI / 180);
    const k = Math.cos(latMedia);
    const anchoGeo = (caja.este - caja.oeste) * k;
    const altoGeo = caja.norte - caja.sur;
    const escala = Math.min((ancho - 2 * margen) / anchoGeo, (alto - 2 * margen) / altoGeo);
    const dx = (ancho - anchoGeo * escala) / 2;
    const dy = (alto - altoGeo * escala) / 2;
    return {
        x: (lon)=>dx + (lon - caja.oeste) * k * escala,
        y: (lat)=>dy + (caja.norte - lat) * escala,
        escala
    };
}
}),
"[project]/src/lib/formato.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Formatos en espanol de Argentina
__turbopack_context__.s([
    "MESES",
    ()=>MESES,
    "MESES_CORTOS",
    ()=>MESES_CORTOS,
    "capitalizar",
    ()=>capitalizar,
    "conSigno",
    ()=>conSigno,
    "decimal",
    ()=>decimal,
    "entero",
    ()=>entero,
    "fechaLarga",
    ()=>fechaLarga,
    "fmt",
    ()=>fmt,
    "fmtLat",
    ()=>fmtLat,
    "fmtLon",
    ()=>fmtLon,
    "fmtSigno",
    ()=>fmtSigno,
    "mesAnio",
    ()=>mesAnio,
    "nombreMes",
    ()=>nombreMes,
    "valorP",
    ()=>valorP
]);
const MESES = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
];
const MESES_CORTOS = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
];
function nombreMes(mes) {
    return MESES[mes - 1] ?? "";
}
function capitalizar(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function entero(v) {
    return Math.round(v).toLocaleString("es-AR");
}
function decimal(v, d = 1) {
    return v.toLocaleString("es-AR", {
        minimumFractionDigits: d,
        maximumFractionDigits: d
    });
}
function conSigno(v, d = 1) {
    return (v > 0 ? "+" : v < 0 ? "−" : "") + decimal(Math.abs(v), d);
}
function valorP(p) {
    return p < 0.001 ? "p < 0,001" : `p = ${decimal(p, 3)}`;
}
function mesAnio(anio, mes) {
    return `${nombreMes(mes)} de ${anio}`;
}
function fechaLarga(iso) {
    const [a, m, d] = iso.split("-").map(Number);
    return `${d} de ${nombreMes(m)} de ${a}`;
}
function fmt(x, decimales) {
    return x.toFixed(decimales).replace(".", ",").replace(/^-/, "−");
}
function fmtSigno(x, decimales) {
    const redondeado = Number(x.toFixed(decimales));
    return (redondeado > 0 ? "+" : redondeado < 0 ? "−" : "") + fmt(Math.abs(x), decimales);
}
function fmtLon(lon) {
    return `${fmt(Math.abs(lon), 1)}° ${lon < 0 ? "O" : "E"}`;
}
function fmtLat(lat) {
    return `${fmt(Math.abs(lat), 1)}° ${lat < 0 ? "S" : "N"}`;
}
}),
];

//# sourceMappingURL=src_09-sd59mwaoxl._.js.map