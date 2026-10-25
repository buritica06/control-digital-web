"""
Generador Científico 3D de Ecuaciones en Diferencias, Descomposición Libre/Forzada y Estabilidad en el Plano Z (Semana 4)
Módulo: MEC36 - Control II | Institución Universitaria de Barranquilla (IUB)
Paleta: config/framework_iub (beamerthemeiub.sty)
Genera 'ecuaciones_diferencias_semana04_3d.html' interactivo mediante Plotly WebGL.
"""

import os
import json
import numpy as np


def generar_html_plotly_semana04(output_path=None):
    if output_path is None:
        output_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "ecuaciones_diferencias_semana04_3d.html",
        )

    # Caso de estudio Semana 4: Servomecanismo con condiciones iniciales no nulas
    # y[k] - 1.3 y[k-1] + 0.4 y[k-2] = u[k], y[-1]=2, y[-2]=1, u[k]=1(k)
    # Polos: p1 = 0.8, p2 = 0.5, y polo de entrada en z = 1.0
    p1 = 1.0 + 0.0j
    p2 = 0.8 + 0.0j
    p3 = 0.5 + 0.0j

    r_vals = np.linspace(0.02, 1.35, 75)
    theta_vals = np.linspace(0, 2 * np.pi, 110)
    R, THETA = np.meshgrid(r_vals, theta_vals)
    X = R * np.cos(THETA)
    Y = R * np.sin(THETA)
    Z_complex = X + 1j * Y

    eps = 0.06
    denom = (Z_complex - p1) * (Z_complex - p2) * (Z_complex - p3)
    denom_safe = np.where(np.abs(denom) < eps**2, eps**2, denom)
    num = Z_complex * (3.2 * (Z_complex**2) - 3.0 * Z_complex + 0.8)
    Yz = num / denom_safe
    mag = 4.0 * np.tanh(np.abs(Yz) * 0.18 / 4.0)

    ang = np.linspace(0, 2 * np.pi, 200)
    ux = np.cos(ang)
    uy = np.sin(ang)

    iub_colorscale = [
        [0.0, "#121023"],   # iubOscuro
        [0.25, "#00ADE7"],  # iubAzulClaro
        [0.52, "#3B9C6D"],  # iubVerde
        [0.78, "#FFDF2D"],  # iubAmarillo
        [1.0, "#E39037"],   # iubNaranja
    ]

    traces = [
        {
            "type": "surface",
            "x": np.round(X, 4).tolist(),
            "y": np.round(Y, 4).tolist(),
            "z": np.round(mag, 4).tolist(),
            "colorscale": iub_colorscale,
            "opacity": 0.86,
            "name": "|Y(z)| = |Y_libre(z) + Y_forzada(z)|",
            "colorbar": {"title": "|Y(z)|", "len": 0.65, "tickfont": {"color": "#FFFFFF"}},
        },
        {
            "type": "scatter3d",
            "x": np.round(ux, 4).tolist(),
            "y": np.round(uy, 4).tolist(),
            "z": (np.zeros_like(ux) + 0.05).tolist(),
            "mode": "lines",
            "line": {"color": "#FFDF2D", "width": 7},
            "name": "Círculo Unitario |z| = 1 (Frontera de Estabilidad)",
        },
        {
            "type": "scatter3d",
            "x": [1.0, 0.8, 0.5],
            "y": [0.0, 0.0, 0.0],
            "z": [0.18, 0.18, 0.18],
            "mode": "markers+text",
            "marker": {"size": 9, "color": "#F87171", "symbol": "x"},
            "text": [
                "Polo Escalón z=1.0 (A = 10.0)",
                "Polo Natural p₁=0.8 (B = -7.4667)",
                "Polo Natural p₂=0.5 (C = +0.6667)",
            ],
            "textposition": "top center",
            "name": "Polos de Y(z) (Modos p_i^k)",
        },
    ]

    layout = {
        "paper_bgcolor": "#121023",
        "plot_bgcolor": "#121023",
        "font": {"color": "#FFFFFF"},
        "scene": {
            "xaxis": {"title": "Re(z)", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#FFDF2D"},
            "yaxis": {"title": "Im(z)", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#FFDF2D"},
            "zaxis": {"title": "Magnitud |Y(z)|", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#00ADE7"},
            "camera": {"eye": {"x": 1.55, "y": -1.55, "z": 1.15}},
        },
        "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
        "legend": {"x": 0.02, "y": 0.94, "bgcolor": "rgba(18,16,35,0.92)", "bordercolor": "#FFDF2D", "borderwidth": 1},
    }

    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visor 3D — Semana 4: Ecuaciones en Diferencias y Respuesta LTI | MEC36 Control II | IUB</title>
  <script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
  <style>
    body {{ margin: 0; background-color: #121023; color: #FFFFFF; font-family: 'Helvetica Neue', Arial, sans-serif; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }}
    header {{ padding: 12px 22px; background: #0B0A16; border-bottom: 2px solid #FFDF2D; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }}
    .title {{ font-weight: 900; font-size: 16px; color: #FFDF2D; }}
    .sub {{ font-size: 12px; color: #00ADE7; }}
    .btn-back {{ padding: 7px 14px; border-radius: 8px; background: #FFDF2D; color: #121023; font-weight: 800; text-decoration: none; font-size: 12px; }}
    #plot3d {{ flex: 1; width: 100%; }}
  </style>
</head>
<body>
  <header>
    <div>
      <div class="title">MEC36 — Control II · Semana 4: Superficie 3D |Y(z)| de Ecuación en Diferencias con Condiciones Iniciales</div>
      <div class="sub">Institución Universitaria de Barranquilla (IUB) · y[k] - 1.3y[k-1] + 0.4y[k-2] = u[k], y[-1]=2, y[-2]=1 → y[k] = 10 - 7.4667(0.8)^k + 0.6667(0.5)^k</div>
    </div>
    <a href="index.html" class="btn-back">← Volver a la Plataforma Interactiva</a>
  </header>
  <div id="plot3d"></div>
  <script>
    const traces = {json.dumps(traces)};
    const layout = {json.dumps(layout)};
    Plotly.newPlot('plot3d', traces, layout, {{ responsive: true, displaylogo: false }});
  </script>
</body>
</html>"""

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[OK] Visor 3D autónomo generado en: {output_path}")


if __name__ == "__main__":
    generar_html_plotly_semana04()
