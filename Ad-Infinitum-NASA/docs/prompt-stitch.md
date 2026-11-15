# Prompt para Google Stitch - Detective de Tendencias

Design a responsive web app called "Detective de Tendencias" (Trend Detective). It lets students and the general public explore how climate conditions in a region changed over the years, compare two sectors, and download the results. All UI copy must be in Spanish. Data is shown as illustrative (include a small pill "Datos ilustrativos" in the header).

AUDIENCE AND TONE
Students, teachers and curious citizens, not scientists. Plain language, short sentences. Results are phrased as human sentences, for example "El sector A se calento 0,41 C por decada entre 2005 y 2024", followed by a significance badge ("Significativa" or "No concluyente").

VISUAL SYSTEM
Field-notebook look: warm paper background #F6F3EC, white surfaces, 1px borders #DDD7CA, 16px radius cards, ink #1C211F for primary text and primary buttons, terracotta #C8643A (text version #A24A22) as the accent for sector B and highlights, green #2F7D5B for positive or healthy states. Headings in Space Grotesk, body in Inter. Pill-shaped buttons with minimum height 44px. Lots of breathing room, no gradients except the map legend, no decorative icons, no emoji.

GLOBAL LAYOUT
Top bar: logo (circle with a small wavy trend line), app name, segmented control "Explorar | Comparar sectores", and the "Datos ilustrativos" pill. Below, a two-column layout on desktop: a left control panel (300px) and a main column with result cards. On mobile the panel collapses into a bottom sheet opened by a "Filtros" button.

SCREEN 1: EXPLORAR
Left panel sections:
1. Variable: segmented toggle "Temperatura | Anomalia" with a one-line helper text. Anomalia means the difference versus the 2005-2024 average of each cell.
2. Anos: a year slider (2005-2024) for the map with a "Reproducir anos" play/pause button, plus two sliders "Periodo desde" and "Periodo hasta" (minimum 5 years). Helper: the period drives the chart, trend and downloads.
3. Capas: checkboxes for Temperatura (with an opacity slider), Cuadricula y coordenadas, Sectores, Base del mapa.
4. Sectores: buttons "Dibujar A" and "Dibujar B", and "Restablecer sectores". Helper: drag on the map to draw a rectangle.
Main column:
- Result card: big headline sentence, subline with the p-value in words, then a square geographic map with a temperature heat layer (cells colored by value, sequential yellow-to-dark-red scale), lat/lon gridlines with labels, the selected sector drawn as a rectangle with a letter tag "A", a hover readout line (lon, lat, temperature, anomaly, year), and a horizontal color legend with min, mid and max labels in degrees C.
- Results card: 3 stat tiles (mean temperature of the period, trend in C per decade with significance badge, years analyzed), a line chart of annual mean temperature with a dashed linear trend line and a dashed vertical marker for the selected map year, and a scrollable annual table.
- Download bar: buttons "CSV", "Grafico PNG", "Word (.docx)" and a dark primary "Informe PDF". Helper: files reflect what you see.

SCREEN 2: COMPARAR SECTORES
Same panel. The map area becomes two maps side by side (stack on mobile), "Sector A" on the left and "Sector B" on the right, always on the same year and same color scale so they are directly comparable. Sector A is drawn with a solid ink outline, sector B with a dashed terracotta outline. The year slider and play button animate both maps together. Headline: "El sector A se calento X C por decada y el sector B Y C por decada", subline stating which one changes faster and by how much.
Results: 3 tiles (Sector A mean + trend + badge, Sector B mean + trend + badge, Difference B minus A in C). One chart with both series (ink for A, terracotta for B) plus dashed trend lines. Table columns: Ano, Sector A, Sector B, B menos A. Same download bar; the exported report includes both sectors, the difference and a method note (linear regression for rate of change, Mann-Kendall test for significance, p < 0,05).

STATES AND DETAILS
Empty, loading (skeleton for map and chart), error ("No pudimos cargar los datos de la API") and "sector muy pequeno" validation toast. Visible keyboard focus ring in terracotta, 4.5:1 text contrast, never rely on color alone (badges carry text, series have a line-style legend), map has an accessible label that includes the year. Respect reduced motion for the play animation.

DELIVERABLES
Desktop (1440px) and mobile (390px) versions of both screens, a component sheet (segmented control, slider, checkbox row, stat tile, badge, legend bar, download button group), and the two color scales: sequential for temperature and diverging for anomaly.
