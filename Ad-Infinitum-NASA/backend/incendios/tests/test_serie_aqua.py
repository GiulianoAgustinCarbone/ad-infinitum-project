from datetime import date

from incendios import serie_aqua


def test_meses_entre_cruza_el_anio():
    assert serie_aqua.meses_entre("2024-11", "2025-02") == ["2024-11", "2024-12", "2025-01", "2025-02"]


def test_ultimo_mes_completo_en_enero_retrocede_al_anio_anterior():
    assert serie_aqua.ultimo_mes_completo(date(2026, 1, 15)) == "2025-12"
    assert serie_aqua.ultimo_mes_completo(date(2026, 11, 15)) == "2026-10"