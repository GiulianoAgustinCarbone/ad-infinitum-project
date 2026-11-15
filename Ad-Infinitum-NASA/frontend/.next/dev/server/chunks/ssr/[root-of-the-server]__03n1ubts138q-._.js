module.exports = [
"[externals]/next/dist/server/app-render/module-loading/track-module-loading.external.js [external] (next/dist/server/app-render/module-loading/track-module-loading.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/module-loading/track-module-loading.external.js", () => require("next/dist/server/app-render/module-loading/track-module-loading.external.js"));

module.exports = mod;
}),
"[project]/src/components/explorador/Explorador.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "ayuda": "Explorador-module__X_24wG__ayuda",
  "casilla": "Explorador-module__X_24wG__casilla",
  "deslizador": "Explorador-module__X_24wG__deslizador",
  "etiquetaDepto": "Explorador-module__X_24wG__etiquetaDepto",
  "explorador": "Explorador-module__X_24wG__explorador",
  "gradiente": "Explorador-module__X_24wG__gradiente",
  "gradienteEjes": "Explorador-module__X_24wG__gradienteEjes",
  "grupo": "Explorador-module__X_24wG__grupo",
  "lectura": "Explorador-module__X_24wG__lectura",
  "leyenda": "Explorador-module__X_24wG__leyenda",
  "leyendaTitulo": "Explorador-module__X_24wG__leyendaTitulo",
  "mapa": "Explorador-module__X_24wG__mapa",
  "mapaCargando": "Explorador-module__X_24wG__mapaCargando",
  "muestra": "Explorador-module__X_24wG__muestra",
  "muestraAgua": "Explorador-module__X_24wG__muestraAgua",
  "panel": "Explorador-module__X_24wG__panel",
  "resultado": "Explorador-module__X_24wG__resultado",
  "resultadoNumero": "Explorador-module__X_24wG__resultadoNumero",
  "segmentado": "Explorador-module__X_24wG__segmentado",
  "selector": "Explorador-module__X_24wG__selector",
  "zonaMapa": "Explorador-module__X_24wG__zonaMapa",
});
}),
"[project]/src/components/explorador/Explorador.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Explorador",
    ()=>Explorador
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/track-dynamic-import.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/focos.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/focos/escala.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formato.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/explorador/Explorador.module.css [app-ssr] (css module)");
;
"use client";
;
;
;
;
;
;
;
;
const MapaFocos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/explorador/MapaFocos.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapaCargando,
            children: "Preparando el mapa…"
        }, void 0, false, {
            fileName: "[project]/src/components/explorador/Explorador.tsx",
            lineNumber: 14,
            columnNumber: 18
        }, ("TURBOPACK compile-time value", void 0))
});
const MS_POR_MES = 700;
const NOMBRE_SATELITE = {
    TERRA: "Terra",
    AQUA: "Aqua",
    SNPP: "Suomi NPP",
    NOAA20: "NOAA-20"
};
function contar(f, filtro, indiceAqua) {
    const c = f.columnas;
    let n = 0;
    for(let i = 0; i < f.n; i++){
        if (filtro.anio !== null && c.anio[i] !== filtro.anio) continue;
        if (filtro.mes !== null && c.mes[i] !== filtro.mes) continue;
        if (filtro.depto !== null && c.depto[i] !== filtro.depto) continue;
        if (filtro.soloAqua && c.sat[i] !== indiceAqua) continue;
        n++;
    }
    return n;
}
function describirPeriodo(anio, mes) {
    if (anio === null && mes === null) return "de todo el registro";
    if (anio === null) return `de todos los meses de ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nombreMes"])(mes)}`;
    if (mes === null) return `de ${anio}`;
    return `de ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nombreMes"])(mes)} de ${anio}`;
}
function Explorador({ inicial } = {}) {
    const [datos, setDatos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [vista, setVista] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("calor");
    const [soloAqua, setSoloAqua] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [depto, setDepto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [todosLosAnios, setTodosLosAnios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!inicial);
    const [momento, setMomento] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(inicial ?? {
        anio: 2009,
        mes: 0
    });
    const { anio, mes } = momento;
    const setAnio = (a)=>setMomento((p)=>({
                ...p,
                anio: a
            }));
    const setMes = (m)=>setMomento((p)=>({
                ...p,
                mes: m
            }));
    const [quiereReproducir, setReproduciendo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lectura, setLectura] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const seccion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cargar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
        Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fuenteFocos"].getFocos(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fuenteFocos"].getDepartamentos(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fuenteFocos"].getEmbalses()
        ]).then(([focos, departamentos, embalses])=>setDatos({
                focos,
                departamentos,
                embalses
            })).catch((e)=>setError(e.message));
    }, []);
    // Carga diferida: los datos se piden cuando el explorador se acerca a la pantalla
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = seccion.current;
        if (!el) return;
        const obs = new IntersectionObserver((e)=>{
            if (!e[0].isIntersecting) return;
            obs.disconnect();
            cargar();
        }, {
            rootMargin: "400px"
        });
        obs.observe(el);
        return ()=>obs.disconnect();
    }, [
        cargar
    ]);
    const rango = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!datos) return {
            a0: 2002,
            a1: 2024,
            m1: 12
        };
        const [a0] = datos.focos.fechaMin.split("-").map(Number);
        const [a1, m1] = datos.focos.fechaMax.split("-").map(Number);
        return {
            a0,
            a1,
            m1
        };
    }, [
        datos
    ]);
    const indiceAqua = datos?.focos.satelites.indexOf("AQUA") ?? 1;
    const filtro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            anio: todosLosAnios ? null : anio,
            mes: mes === 0 ? null : mes,
            depto,
            soloAqua
        }), [
        todosLosAnios,
        anio,
        mes,
        depto,
        soloAqua
    ]);
    const cantidad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>datos ? contar(datos.focos, filtro, indiceAqua) : 0, [
        datos,
        filtro,
        indiceAqua
    ]);
    // Al llegar al ultimo mes con datos la reproduccion se detiene sola
    const enFinal = !todosLosAnios && anio === rango.a1 && mes >= rango.m1;
    const reproduciendo = quiereReproducir && !enFinal;
    // Reproducir: avanza mes a mes hasta el ultimo mes con datos
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!reproduciendo) return;
        const t = window.setInterval(()=>{
            setMomento((p)=>{
                const mesSig = p.mes >= 12 ? 1 : p.mes + 1;
                const anioSig = p.mes >= 12 ? p.anio + 1 : p.anio;
                if (anioSig > rango.a1 || anioSig === rango.a1 && mesSig > rango.m1) return p;
                return {
                    anio: anioSig,
                    mes: mesSig
                };
            });
        }, MS_POR_MES);
        return ()=>window.clearInterval(t);
    }, [
        reproduciendo,
        rango
    ]);
    const alternarReproduccion = ()=>{
        if (reproduciendo) {
            setReproduciendo(false);
            return;
        }
        if (todosLosAnios || enFinal) setMomento({
            anio: rango.a0,
            mes: 1
        });
        else if (mes === 0) setMes(1);
        setTodosLosAnios(false);
        setReproduciendo(true);
    };
    const elegirDepto = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((i)=>setDepto((actual)=>actual === i ? null : i), []);
    const textoLectura = (()=>{
        if (!datos || !lectura) return null;
        if (lectura.tipo === "depto") {
            const i = datos.focos.departamentos.indexOf(lectura.nombre);
            const n = i >= 0 ? contar(datos.focos, {
                ...filtro,
                depto: i
            }, indiceAqua) : 0;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: lectura.nombre
                    }, void 0, false, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(n),
                            " ",
                            n === 1 ? "foco" : "focos",
                            " ",
                            describirPeriodo(filtro.anio, filtro.mes)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/explorador/Explorador.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this);
        }
        const c = datos.focos.columnas;
        const i = lectura.indice;
        const sat = datos.focos.satelites[c.sat[i]];
        const pw = c.power[i];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: [
                        c.dia[i],
                        " de ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nombreMes"])(c.mes[i]),
                        " de ",
                        c.anio[i]
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: datos.focos.departamentos[c.depto[i]]
                }, void 0, false, {
                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "Satélite ",
                        NOMBRE_SATELITE[sat] ?? sat,
                        " (",
                        datos.focos.sensores[c.sat[i]],
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "Potencia: ",
                        pw === null ? "sin dato confiable" : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decimal"])(pw, 1)} MW`
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this),
                c.confianza[i] !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "Confianza de la detección: ",
                        c.confianza[i],
                        " %"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                    lineNumber: 154,
                    columnNumber: 37
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/explorador/Explorador.tsx",
            lineNumber: 145,
            columnNumber: 7
        }, this);
    })();
    const periodo = describirPeriodo(filtro.anio, filtro.mes);
    const lugar = depto === null || !datos ? "en toda la provincia" : `en ${datos.focos.departamentos[depto]}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: seccion,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].explorador,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].zonaMapa,
                children: [
                    datos ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MapaFocos, {
                        focos: datos.focos,
                        departamentos: datos.departamentos,
                        embalses: datos.embalses,
                        filtro: filtro,
                        vista: vista,
                        cantidad: cantidad,
                        indiceAqua: indiceAqua,
                        onLectura: setLectura,
                        onElegirDepto: elegirDepto
                    }, void 0, false, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapaCargando,
                        children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "No se pudieron cargar los focos: ",
                                        error
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                    lineNumber: 181,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "boton",
                                    onClick: cargar,
                                    children: "Reintentar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                            lineNumber: 180,
                            columnNumber: 15
                        }, this) : "Cargando los focos de calor…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lectura,
                        "aria-live": "polite",
                        children: textoLectura ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ayuda,
                            children: "Pasá el cursor o tocá un foco o un departamento para leer sus datos."
                        }, void 0, false, {
                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/explorador/Explorador.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].panel,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultado,
                        "aria-live": "polite",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultadoNumero,
                                children: datos ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(cantidad) : "…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    cantidad === 1 ? "foco" : "focos",
                                    " ",
                                    periodo,
                                    " ",
                                    lugar,
                                    soloAqua ? ", solo satélite Aqua" : "",
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grupo,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                children: "Vista"
                            }, void 0, false, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].segmentado,
                                children: [
                                    [
                                        "puntos",
                                        "Puntos"
                                    ],
                                    [
                                        "calor",
                                        "Mapa de calor"
                                    ]
                                ].map(([valor, texto])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "vista",
                                                value: valor,
                                                checked: vista === valor,
                                                onChange: ()=>setVista(valor)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: texto
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, valor, true, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grupo,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                children: "Período"
                            }, void 0, false, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].casilla,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: todosLosAnios,
                                        onChange: (e)=>{
                                            setReproduciendo(false);
                                            setTodosLosAnios(e.target.checked);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Todos los años"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].deslizador,
                                "data-inactivo": todosLosAnios,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Año ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("output", {
                                                children: todosLosAnios ? `${rango.a0} a ${rango.a1}` : anio
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                lineNumber: 239,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: rango.a0,
                                        max: rango.a1,
                                        step: 1,
                                        value: anio,
                                        "aria-valuetext": todosLosAnios ? "todos los años" : String(anio),
                                        onChange: (e)=>{
                                            setReproduciendo(false);
                                            setTodosLosAnios(false);
                                            setAnio(Number(e.target.value));
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].deslizador,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Mes ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("output", {
                                                children: mes === 0 ? "todo el año" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["capitalizar"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nombreMes"])(mes))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                lineNumber: 257,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: 0,
                                        max: 12,
                                        step: 1,
                                        value: mes,
                                        "aria-valuetext": mes === 0 ? "todo el año" : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MESES"][mes - 1],
                                        onChange: (e)=>{
                                            setReproduciendo(false);
                                            setMes(Number(e.target.value));
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "boton",
                                onClick: alternarReproduccion,
                                "aria-pressed": reproduciendo,
                                disabled: !datos,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "14",
                                        height: "14",
                                        viewBox: "0 0 14 14",
                                        "aria-hidden": "true",
                                        children: reproduciendo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M3 2h3v10H3zM8 2h3v10H8z",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                                            lineNumber: 275,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M3 1.5v11l9-5.5z",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this),
                                    reproduciendo ? "Pausar" : "Reproducir mes a mes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grupo,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                children: "Dónde y con qué satélites"
                            }, void 0, false, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selector,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Departamento"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: depto ?? "",
                                        onChange: (e)=>setDepto(e.target.value === "" ? null : Number(e.target.value)),
                                        disabled: !datos,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Toda la provincia"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            datos?.focos.departamentos.map((nombre, i)=>({
                                                    nombre,
                                                    i
                                                })).sort((a, b)=>a.nombre.localeCompare(b.nombre, "es")).map(({ nombre, i })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: i,
                                                    children: nombre
                                                }, nombre, false, {
                                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].casilla,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: soloAqua,
                                        onChange: (e)=>setSoloAqua(e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 305,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Solo satélite Aqua (la serie que se puede comparar entre años)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].leyenda,
                        children: vista === "puntos" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].leyendaTitulo,
                                    children: "Potencia del foco (energía que emite, en megavatios)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CLASES_POTENCIA"].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].muestra,
                                                        style: {
                                                            background: c.color
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 21
                                                    }, this),
                                                    c.etiqueta
                                                ]
                                            }, c.etiqueta, true, {
                                                fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                lineNumber: 316,
                                                columnNumber: 19
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].muestra,
                                                    style: {
                                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIN_DATO"]
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 19
                                                }, this),
                                                "sin dato confiable"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                                            lineNumber: 321,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].muestraAgua
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 19
                                                }, this),
                                                "embalse"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                                            lineNumber: 325,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                    lineNumber: 314,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].leyendaTitulo,
                                    children: "Concentración de focos, ponderada por su potencia"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                    lineNumber: 333,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].gradiente
                                }, void 0, false, {
                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                    lineNumber: 334,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$explorador$2f$Explorador$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].gradienteEjes,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "menor"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "mayor"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                                            lineNumber: 337,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "nota",
                                    children: "Muestra dónde se agrupan los focos, no la superficie quemada. Los focos sin potencia confiable pesan como uno de 30 MW."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/explorador/Explorador.tsx",
                                    lineNumber: 339,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/explorador/Explorador.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/explorador/Explorador.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/explorador/Explorador.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/explorador/Explorador.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/graficos/BarrasMes.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarrasMes",
    ()=>BarrasMes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formato.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/focos/escala.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Globo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/graficos/Globo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$useAncho$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/graficos/useAncho.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/graficos/Graficos.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
const AL = 260;
const M = {
    arriba: 24,
    derecha: 8,
    abajo: 28,
    izquierda: 40
};
function ticks(max) {
    const paso = max > 150 ? 50 : max > 60 ? 20 : 10;
    return Array.from({
        length: Math.floor(max / paso) + 1
    }, (_, i)=>i * paso);
}
function textoMes(clave) {
    const [a, m] = clave.split("-").map(Number);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mesAnio"])(a, m);
}
function BarrasMes({ estacionalidad, mesPico, desde, hasta }) {
    const { globo, mostrar, ocultar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Globo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobo"])();
    const { ref, ancho: AN } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$useAncho$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAncho"])(600);
    const max = Math.max(...estacionalidad.map((e)=>e.promedio));
    const tope = Math.ceil(max / 50) * 50;
    const ancho = AN - M.izquierda - M.derecha;
    const alto = AL - M.arriba - M.abajo;
    const banda = ancho / 12;
    const y = (v)=>M.arriba + alto - v / tope * alto;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].figura,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].titulo,
                        children: "Focos por mes, promedio de todos los años"
                    }, void 0, false, {
                        fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitulo,
                        children: [
                            "Satélite Aqua, de ",
                            textoMes(desde),
                            " a ",
                            textoMes(hasta),
                            ". Los meses sin dato no cuentan."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ref,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lienzo,
                onMouseLeave: ocultar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].svg,
                        viewBox: `0 0 ${AN} ${AL}`,
                        role: "group",
                        "aria-label": `Promedio de focos por mes. El máximo es ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nombreMes"])(mesPico)}.`,
                        children: [
                            ticks(tope).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grilla,
                                            x1: M.izquierda,
                                            x2: AN - M.derecha,
                                            y1: y(t),
                                            y2: y(t)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].eje,
                                            x: M.izquierda - 8,
                                            y: y(t) + 4,
                                            textAnchor: "end",
                                            children: t
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, t, true, {
                                    fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this)),
                            estacionalidad.map((e, i)=>{
                                const x = M.izquierda + i * banda + banda * 0.15;
                                const w = banda * 0.7;
                                const h = Math.max(1, e.promedio / tope * alto);
                                const leer = ()=>mostrar({
                                        x: (x + w / 2) / AN * 100,
                                        y: y(e.promedio) / AL * 100,
                                        contenido: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["capitalizar"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nombreMes"])(e.mes))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 21
                                                }, this),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decimal"])(e.promedio, 1),
                                                " focos en promedio (",
                                                e.anios,
                                                " años con dato). Máximo: ",
                                                e.maximo,
                                                " en ",
                                                e.anioMaximo,
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                            lineNumber: 60,
                                            columnNumber: 19
                                        }, this)
                                    });
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].marca,
                                    tabIndex: 0,
                                    onMouseEnter: leer,
                                    onFocus: leer,
                                    onBlur: ocultar,
                                    "aria-label": `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nombreMes"])(e.mes)}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decimal"])(e.promedio, 1)} focos en promedio`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: M.izquierda + i * banda,
                                            y: M.arriba,
                                            width: banda,
                                            height: alto,
                                            fill: "transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                            lineNumber: 77,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resalte,
                                            d: `M${x},${y(0)} V${y(0) - h + 4} q0,-4 4,-4 h${w - 8} q4,0 4,4 V${y(0)} Z`,
                                            fill: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FUEGO"][2]
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].eje,
                                            x: x + w / 2,
                                            y: AL - 8,
                                            textAnchor: "middle",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MESES_CORTOS"][i]
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, this),
                                        e.mes === mesPico && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                            x: x + w / 2,
                                            y: y(e.promedio) - 8,
                                            textAnchor: "middle",
                                            fill: "currentColor",
                                            fontSize: "13",
                                            fontWeight: "700",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decimal"])(e.promedio, 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                            lineNumber: 87,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, e.mes, true, {
                                    fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    globo
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/graficos/BarrasMes.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/graficos/BarrasMes.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/graficos/Globo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGlobo",
    ()=>useGlobo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/graficos/Graficos.module.css [app-ssr] (css module)");
"use client";
;
;
;
function useGlobo() {
    const [globo, setGlobo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const nodo = globo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].globo,
        style: {
            left: `${globo.x}%`,
            top: `${globo.y}%`
        },
        role: "status",
        children: globo.contenido
    }, void 0, false, {
        fileName: "[project]/src/components/graficos/Globo.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this) : null;
    return {
        globo: nodo,
        mostrar: setGlobo,
        ocultar: ()=>setGlobo(null)
    };
}
}),
"[project]/src/components/graficos/Graficos.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "anio": "Graficos-module__sjx_Ea__anio",
  "barra": "Graficos-module__sjx_Ea__barra",
  "celda": "Graficos-module__sjx_Ea__celda",
  "eje": "Graficos-module__sjx_Ea__eje",
  "encabezado": "Graficos-module__sjx_Ea__encabezado",
  "figura": "Graficos-module__sjx_Ea__figura",
  "fuera": "Graficos-module__sjx_Ea__fuera",
  "globo": "Graficos-module__sjx_Ea__globo",
  "grilla": "Graficos-module__sjx_Ea__grilla",
  "leyenda": "Graficos-module__sjx_Ea__leyenda",
  "lienzo": "Graficos-module__sjx_Ea__lienzo",
  "marca": "Graficos-module__sjx_Ea__marca",
  "matriz": "Graficos-module__sjx_Ea__matriz",
  "muestra": "Graficos-module__sjx_Ea__muestra",
  "ranking": "Graficos-module__sjx_Ea__ranking",
  "resalte": "Graficos-module__sjx_Ea__resalte",
  "sinDato": "Graficos-module__sjx_Ea__sinDato",
  "subtitulo": "Graficos-module__sjx_Ea__subtitulo",
  "svg": "Graficos-module__sjx_Ea__svg",
  "tabla": "Graficos-module__sjx_Ea__tabla",
  "tablaScroll": "Graficos-module__sjx_Ea__tablaScroll",
  "titulo": "Graficos-module__sjx_Ea__titulo",
  "valor": "Graficos-module__sjx_Ea__valor",
});
}),
"[project]/src/components/graficos/MatrizAnioMes.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatrizAnioMes",
    ()=>MatrizAnioMes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/focos/escala.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formato.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Globo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/graficos/Globo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/graficos/Graficos.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
function MatrizAnioMes({ matriz }) {
    const { globo, mostrar, ocultar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Globo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobo"])();
    const anios = [
        ...new Set(matriz.map((c)=>c.anio))
    ];
    const filas = anios.length;
    const sinDato = matriz.filter((c)=>c.estado === "sin-dato");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].figura,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].titulo,
                        children: "Cada año, mes por mes"
                    }, void 0, false, {
                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitulo,
                        children: "Cantidad de focos detectados por el satélite Aqua. Las celdas rayadas son meses sin dato en la fuente, que no se cuentan como cero."
                    }, void 0, false, {
                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lienzo,
                onMouseLeave: ocultar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].matriz,
                        role: "img",
                        "aria-label": "Matriz de focos por año y mes. La tabla equivalente está debajo.",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MESES_CORTOS"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].encabezado,
                                    children: m
                                }, m, false, {
                                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this)),
                            anios.map((a, fila)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Fila, {
                                    anio: a,
                                    fila: fila,
                                    filas: filas,
                                    celdas: matriz.filter((c)=>c.anio === a),
                                    mostrar: mostrar
                                }, a, false, {
                                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    globo
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].leyenda,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].muestra,
                                style: {
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CERO"]
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            "sin focos"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CLASES_CONTEO"].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].muestra,
                                    style: {
                                        background: c.color
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                c.etiqueta
                            ]
                        }, c.etiqueta, true, {
                            fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].muestra} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sinDato}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            "sin dato (",
                            sinDato.length,
                            " meses)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].muestra} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fuera}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            "fuera del registro"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tabla,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                        children: "Ver como tabla"
                    }, void 0, false, {
                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tablaScroll,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
                                    className: "sr-only",
                                    children: "Focos por año y mes, satélite Aqua"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                scope: "col",
                                                children: "Año"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, this),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MESES_CORTOS"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "col",
                                                    children: m
                                                }, m, false, {
                                                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: anios.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "row",
                                                    children: a
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 19
                                                }, this),
                                                matriz.filter((c)=>c.anio === a).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: c.estado === "dato" ? c.valor : c.estado === "sin-dato" ? "s/d" : "—"
                                                    }, c.mes, false, {
                                                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, a, true, {
                                            fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
function Fila({ anio, fila, filas, celdas, mostrar }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].anio,
                children: anio
            }, void 0, false, {
                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            celdas.map((c)=>{
                const clase = c.estado === "sin-dato" ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].celda} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sinDato}` : c.estado === "fuera" ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].celda} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fuera}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].celda;
                const fondo = c.estado === "dato" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorConteo"])(c.valor ?? 0) : undefined;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: clase,
                    style: fondo ? {
                        background: fondo
                    } : undefined,
                    onMouseEnter: ()=>mostrar({
                            // Posicion aproximada en la grilla: 13 columnas, primera para el anio
                            x: (c.mes + 0.5) / 13 * 100 + 2,
                            y: (fila + 1) / (filas + 1) * 100,
                            contenido: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["capitalizar"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mesAnio"])(anio, c.mes))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                        lineNumber: 120,
                                        columnNumber: 21
                                    }, this),
                                    c.estado === "dato" ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(c.valor ?? 0)} ${c.valor === 1 ? "foco" : "focos"}` : c.estado === "sin-dato" ? "Sin dato en la fuente" : "Fuera del período registrado"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                                lineNumber: 119,
                                columnNumber: 19
                            }, this)
                        })
                }, c.mes, false, {
                    fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/graficos/MatrizAnioMes.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/graficos/SerieAnual.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SerieAnual",
    ()=>SerieAnual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/focos/escala.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formato.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Globo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/graficos/Globo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$useAncho$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/graficos/useAncho.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/graficos/Graficos.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
const AL = 300;
const M = {
    arriba: 20,
    derecha: 16,
    abajo: 30,
    izquierda: 48
};
function SerieAnual({ anual, tendencia }) {
    const { globo, mostrar, ocultar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Globo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGlobo"])();
    const { ref, ancho: AN } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$useAncho$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAncho"])(720);
    const a0 = anual[0].anio;
    const a1 = anual[anual.length - 1].anio;
    const max = Math.max(...anual.map((d)=>d.total));
    const tope = Math.ceil(max / 500) * 500;
    const ancho = AN - M.izquierda - M.derecha;
    const alto = AL - M.arriba - M.abajo;
    const x = (a)=>M.izquierda + (a - a0) / (a1 - a0) * ancho;
    const y = (v)=>M.arriba + alto - Math.max(0, v) / tope * alto;
    // Recta de Sen: la misma pendiente que se informa como cambio por decada
    const recta = (a)=>tendencia.ordenadaSen + tendencia.senAnual * a;
    const linea = anual.map((d, i)=>`${i ? "L" : "M"}${x(d.anio)},${y(d.total)}`).join(" ");
    const pasoY = tope > 2000 ? 500 : 250;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lienzo,
        onMouseLeave: ocultar,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].svg,
                viewBox: `0 0 ${AN} ${AL}`,
                role: "group",
                "aria-label": `Focos por año de ${a0} a ${a1} con recta de tendencia`,
                children: [
                    Array.from({
                        length: tope / pasoY + 1
                    }, (_, i)=>i * pasoY).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grilla,
                                    x1: M.izquierda,
                                    x2: AN - M.derecha,
                                    y1: y(t),
                                    y2: y(t)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].eje,
                                    x: M.izquierda - 8,
                                    y: y(t) + 4,
                                    textAnchor: "end",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(t)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, t, true, {
                            fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)),
                    anual.filter((d)=>d.anio % 4 === a0 % 4 || d.anio === a1).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].eje,
                            x: x(d.anio),
                            y: AL - 8,
                            textAnchor: "middle",
                            children: d.anio
                        }, d.anio, false, {
                            fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: linea,
                        fill: "none",
                        stroke: "#b8c0c8",
                        strokeWidth: "2",
                        strokeLinejoin: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: x(a0),
                        y1: y(recta(a0)),
                        x2: x(a1),
                        y2: y(recta(a1)),
                        stroke: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FUEGO"][3],
                        strokeWidth: "2.5",
                        strokeDasharray: "7 5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    anual.map((d)=>{
                        const leer = ()=>mostrar({
                                x: x(d.anio) / AN * 100,
                                y: y(d.total) / AL * 100,
                                contenido: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: d.anio
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                                            lineNumber: 66,
                                            columnNumber: 19
                                        }, this),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(d.total),
                                        " focos",
                                        d.mesesSinDato > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 23
                                                }, this),
                                                "Incluye ",
                                                d.mesesSinDato,
                                                " ",
                                                d.mesesSinDato === 1 ? "mes" : "meses",
                                                " sin dato"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                                            lineNumber: 69,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                                    lineNumber: 65,
                                    columnNumber: 17
                                }, this)
                            });
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].marca,
                            tabIndex: 0,
                            onMouseEnter: leer,
                            onFocus: leer,
                            onBlur: ocultar,
                            "aria-label": `${d.anio}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(d.total)} focos${d.mesesSinDato ? `, con ${d.mesesSinDato} meses sin dato` : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: x(d.anio) - ancho / (a1 - a0) / 2,
                                    y: M.arriba,
                                    width: ancho / (a1 - a0),
                                    height: alto,
                                    fill: "transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$graficos$2f$Graficos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resalte,
                                    cx: x(d.anio),
                                    cy: y(d.total),
                                    r: "5",
                                    fill: d.mesesSinDato ? "#13202d" : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CENIZA"],
                                    stroke: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$focos$2f$escala$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CENIZA"],
                                    strokeWidth: "2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, d.anio, true, {
                            fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/graficos/SerieAnual.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            globo
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/graficos/SerieAnual.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/graficos/useAncho.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAncho",
    ()=>useAncho
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useAncho(inicial) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ancho, setAncho] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(inicial);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([e])=>setAncho(Math.max(280, Math.round(e.contentRect.width))));
        ro.observe(el);
        return ()=>ro.disconnect();
    }, []);
    return {
        ref,
        ancho
    };
}
}),
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
                b.fillText(`${-lat}° S`, 14, y + 4);
            }
            for(let lon = -67; lon <= -65; lon++){
                const x = proy.x(lon);
                if (x < 30 || x > ancho - 30) continue;
                b.beginPath();
                b.moveTo(x, alto);
                b.lineTo(x, alto - 10);
                b.stroke();
                b.fillText(`${-lon}° O`, x - 14, alto - 14);
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
            if (textoMes.current) textoMes.current.textContent = "2002 a 2024";
            if (textoCuenta.current) textoCuenta.current.textContent = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formato$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entero"])(datos.total)} focos`;
        };
        const medir = ()=>{
            const r = cv.getBoundingClientRect();
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
            if (quieto) estadoFinal();
            else {
                for(let k = 0; k <= mesDibujado; k++)sumarCeniza(k);
                dibujar(mesDibujado);
            }
        };
        const ro = new ResizeObserver(medir);
        ro.observe(cv);
        medir();
        if (quieto) return ()=>ro.disconnect();
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
                if (textoMes.current) textoMes.current.textContent = "2002 a 2024";
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
        quieto
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
                        "aria-label": "Mapa de San Luis con sus nueve departamentos. Los focos de calor detectados por satélite aparecen mes a mes desde enero de 2002 hasta octubre de 2024 y dejan una marca acumulada."
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    !datos && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].estado,
                        children: "Cargando 22 años de focos…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 298,
                        columnNumber: 30
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].estado,
                        children: "No se pudieron cargar los focos. Recargá la página para intentar de nuevo."
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lectura,
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                ref: textoMes,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mes,
                                children: " "
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                ref: textoCuenta,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cuenta,
                                children: " "
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 308,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                lineNumber: 291,
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
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ejes,
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "2002"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "2013"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "2024"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$hero$2f$HeroFocos$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].controles,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                className: "nota",
                                children: "Cada barra es un mes: altura según la cantidad de focos."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            !quieto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "boton",
                                onClick: ()=>setPausado((p)=>!p),
                                "aria-pressed": pausado,
                                children: pausado ? "Reanudar" : "Pausar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                                lineNumber: 323,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroFocos.tsx",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroFocos.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/hero/HeroFocos.tsx",
        lineNumber: 290,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/sitio/Descargas.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "error": "Descargas-module__lYZOLG__error",
  "lista": "Descargas-module__lYZOLG__lista",
});
}),
"[project]/src/components/sitio/Descargas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Descargas",
    ()=>Descargas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/focos.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exportar$2f$csv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exportar/csv.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Descargas$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/sitio/Descargas.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
const ATRIBUCION = "Datos: CONAE / Gobierno de San Luis";
function anual(resumen) {
    const { anual: serie, tendencia: t } = resumen.aqua;
    const filas = [
        [
            "anio",
            "focos_aqua",
            "meses_sin_dato",
            "tendencia_sen",
            "tendencia_minimos_cuadrados"
        ],
        ...serie.map((d)=>[
                d.anio,
                d.total,
                d.mesesSinDato,
                Math.round((t.ordenadaSen + t.senAnual * d.anio) * 10) / 10,
                Math.round((t.ordenada + t.pendienteAnual * d.anio) * 10) / 10
            ]),
        [],
        [
            "# Mann-Kendall p",
            Math.round(t.p * 10000) / 10000
        ],
        [
            "# Pendiente de Sen (focos por decada)",
            Math.round(t.senAnual * 100) / 10
        ],
        [
            "# Significativa (p < 0.05)",
            t.significativa ? "si" : "no"
        ],
        [
            `# ${ATRIBUCION}. Satelite Aqua (MODIS). Descargado ${resumen.descargado}.`
        ]
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exportar$2f$csv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["descargar"])(`san-luis_focos-anuales-aqua_${t.desde}-${t.hasta}.csv`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exportar$2f$csv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aCsv"])(filas), "text/csv;charset=utf-8");
}
async function mensual(resumen) {
    const serie = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$focos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fuenteFocos"].getSerieMensual();
    const nombres = serie.departamentos.map((d)=>d.nombre);
    const filas = [
        [
            "mes",
            ...nombres,
            "total_provincia"
        ],
        ...serie.meses.map((m, i)=>{
            const valores = serie.departamentos.map((d)=>d.conteos[i]);
            const total = valores.some((v)=>v === null) ? null : valores.reduce((s, v)=>s + (v ?? 0), 0);
            return [
                m,
                ...valores,
                total
            ];
        }),
        [],
        [
            "# Celdas vacias: mes sin dato en la fuente (no es cero)."
        ],
        [
            `# ${ATRIBUCION}. Conteos del satelite Aqua (MODIS). Descargado ${resumen.descargado}.`
        ]
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exportar$2f$csv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["descargar"])(`san-luis_focos-mensuales-por-departamento_${serie.meses[0]}_${serie.meses.at(-1)}.csv`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exportar$2f$csv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aCsv"])(filas), "text/csv;charset=utf-8");
}
function Descargas({ resumen }) {
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "descargas",
        className: "seccion seccion-alterna",
        "aria-labelledby": "titulo-descargas",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "contenedor",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "seccion-cabeza",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "titulo-descargas",
                            children: "Descargas"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sitio/Descargas.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Los mismos números que ves en el sitio, para abrir en una planilla o en Python. Cada archivo incluye la fuente y avisa qué meses no tienen dato."
                        }, void 0, false, {
                            fileName: "[project]/src/components/sitio/Descargas.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sitio/Descargas.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Descargas$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].lista,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: "Focos por año"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sitio/Descargas.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "Serie anual de Aqua ",
                                                resumen.aqua.tendencia.desde,
                                                " a ",
                                                resumen.aqua.tendencia.hasta,
                                                ", con la recta de tendencia, el valor p y la pendiente de Sen."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sitio/Descargas.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sitio/Descargas.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "boton boton-principal",
                                    onClick: ()=>anual(resumen),
                                    children: "Descargar CSV"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sitio/Descargas.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sitio/Descargas.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: "Focos por mes y departamento"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sitio/Descargas.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "Los ",
                                                resumen.aqua.ranking.length,
                                                " departamentos, mes por mes. Las celdas vacías son meses sin dato."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sitio/Descargas.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sitio/Descargas.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "boton boton-principal",
                                    onClick: ()=>mensual(resumen).catch((e)=>setError(e.message)),
                                    children: "Descargar CSV"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sitio/Descargas.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sitio/Descargas.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sitio/Descargas.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "alert",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sitio$2f$Descargas$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].error,
                    children: [
                        "No se pudo generar el archivo: ",
                        error,
                        ". Probá de nuevo en unos segundos."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sitio/Descargas.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sitio/Descargas.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sitio/Descargas.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
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
    getSerieMensual: ()=>pedir("departamentos.mensual.json"),
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
"[project]/src/lib/exportar/csv.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// CSV estandar (coma como separador, punto decimal) con BOM para que Excel lea las tildes
__turbopack_context__.s([
    "aCsv",
    ()=>aCsv,
    "descargar",
    ()=>descargar
]);
function escapar(v) {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function aCsv(filas) {
    return "﻿" + filas.map((f)=>f.map(escapar).join(",")).join("\r\n") + "\r\n";
}
function descargar(nombre, contenido, tipo) {
    const url = URL.createObjectURL(new Blob([
        contenido
    ], {
        type: tipo
    }));
    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__03n1ubts138q-._.js.map