# Incendios confirmados en San Luis

Une los focos de calor de CONAE con las detecciones de NASA FIRMS y marca cuáles coinciden con área quemada
de NASA (MCD64A1 y VNP64A1). Los datos generados quedan en `backend/data/incendios/` (sin versionar).

## Pipeline

Requiere el entorno conda `incendios` (GDAL con drivers HDF4 y HDF5, `earthaccess`, `pyproj`, `shapely`,
`scipy`, `pyarrow`) y la clave `MAP_KEY` de FIRMS y las credenciales de Earthdata en `backend/.env`.

```
python -m incendios.descargar_areas_quemadas     # MCD64A1 y VNP64A1 (reanudable, ~1,5 GB)
python -m incendios.indice_quemados              # pixeles quemados por mes -> procesado/*.parquet
python -m incendios.descargar_firms              # FIRMS: meses faltantes de CONAE y desde 2024-10-02 (~750 llamadas)
python -m incendios.cruce                        # salida final y resumen
python -m incendios.serie_aqua                  # serie mensual de Aqua (CONAE + FIRMS) para tendencia y matriz
python -m pytest incendios/tests                 # pruebas de la logica de cruce
```

## Reglas

- **Base:** los focos de CONAE (2002 a 2024-10-01) se conservan tal cual.
- **Completado con FIRMS:** solo los 9 meses con datos faltantes en CONAE (2012-04, 2014-02, 2015-04, 2016-04,
  2016-05, 2017-05, 2020-04, 2020-06, 2021-06) y desde 2024-10-02 hasta hoy. Solo se agregan detecciones
  dentro de la provincia.
- **Duplicados:** una detección de FIRMS se descarta si CONAE tiene el mismo satélite, el mismo día y a menos de 1 km.
- **Incendio confirmado:** un pixel quemado (Burn Date > 0) a menos de 1 km del foco, en el mismo mes.
  `quemado = null` si el mes no tiene granulo de área quemada.
- **Departamento:** por polígono; si el punto está a menos de 1 km del borde, se asigna el departamento más cercano.

## Salida

`focos_confirmados.compact.json`, con el mismo esquema de `frontend/public/datos/focos.json` más columnas nuevas:

| Columna | Significado |
|---|---|
| `origen` | 0 = CONAE, 1 = FIRMS (índice en `origenes`) |
| `quemado` | `true`, `false` o `null` (no evaluable) |
| `sensor_quemado` | `MCD64A1`, `VNP64A1`, `MCD64A1+VNP64A1` o vacío |
| `distancia_quemado_m` | distancia al pixel quemado más cercano del mes |
| `confianza_viirs` | -1 n/a, 0 baja, 1 nominal, 2 alta (FIRMS VIIRS) |

Además: `resumen.json` (conteos por origen, año y sensor) y `validacion.json` (escenarios de sensibilidad).

## Resultados actuales

- 52.056 focos: 38.558 de CONAE y 13.498 de FIRMS (249 en los meses faltantes; 13.249 desde 2024-10-02).
- 51.699 evaluables; **34.269 confirmados como incendio (66,3 %)**; 357 no evaluables.
- Sensores de quemado: MCD64A1 y VNP64A1 juntos 19.427; solo MCD64A1 13.325; solo VNP64A1 1.517.

### Validación

- **Línea base al azar:** 20.000 puntos dentro de la provincia, con la misma distribución de fechas, coinciden en
  1,05 %. Los focos están unas 63 veces por encima.
- **Sensibilidad:**

| Escenario | Focos | Azar | Veces sobre azar |
|---|---|---|---|
| Base (1 km, mismo mes) | 66,3 % | 1,05 % | 63 |
| Radio 500 m | 58,5 % | 0,67 % | 87 |
| Radio 2 km | 71,0 % | 1,84 % | 39 |
| Solo MCD64A1 | 63,4 % | 0,99 % | 64 |
| Solo VNP64A1 (2012+) | 40,5 % | 0,37 % | 110 |
| Tolerancia ±1 mes | 67,8 % | 2,21 % | 31 |

- **Por origen:** CONAE 71,5 %, FIRMS 50,9 %.
- **Por periodo:** 2002–2011 63,8 %; 2012–2024 74,9 %; 2025–2026 52,0 %.
- **Por confianza:** la coincidencia sube con la confianza en ambas fuentes. MODIS (FIRMS): 33 % con confianza
  < 30 y 58 % con ≥ 80. VIIRS (FIRMS): 48 % baja, 50 % nominal, 67 % alta. CONAE: 48 % con confianza 50–80
  y 83 % con ≥ 80.
- **Filtro de QA:** no cambia el resultado con estos datos (todos los pixeles quemados tienen bits 0–1 válidos).

## Limitaciones

1. **No es una validación independiente.** MCD64A1 y VNP64A1 usan detecciones de fuego para ubicar los quemados.
   La coincidencia mide asociación, no que cada foco haya sido un incendio. La línea base al azar es la referencia.
2. **Incendios pequeños** pueden no quedar registrados en un pixel de 463 m. La tasa de confirmados es una cota inferior.
3. **Meses recientes:** la tasa de 2025–2026 es menor. Puede deberse a que el área quemada reciente se procesa con demora
   o a más detecciones de baja confianza. No se pudo verificar.
4. **Confirmación de incendio y no solo de calor:** un foco sin área quemada puede ser quema controlada, industria o
   fuego sin huella. No se distingue con estos datos.
5. **Licencia:** los focos de CONAE no declaran licencia (ver `frontend/README.md`). Los datos derivados heredan esa
   restricción; la salida no debe publicarse hasta confirmarla.
6. **Cobertura geográfica:** la consulta de FIRMS usa una caja rectangular; las detecciones fuera de la provincia se
   descartan con el polígono de `departamentos.geojson`.
