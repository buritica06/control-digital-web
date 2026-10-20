"""
Generador Científico 3D de la Transformada Z Inversa, Contorno de Cauchy y Caso Brazo Robótico (Semana 3)
Módulo: MEC36 - Control II | Institución Universitaria de Barranquilla (IUB)
Paleta: config/framework_iub (beamerthemeiub.sty) + IUB Dark Yellow
Genera 'transformada_z_inversa_semana03_3d.html' interactivo mediante Plotly WebGL.
"""

import os
import json
import numpy as np


def generar_html_plotly_semana03(output_path=None):
    if output_path is None:
        output_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "transformada_z_inversa_semana03_3d.html"
        )

    # Caso de estudio Semana 3: Posicionamiento de Brazo Robótico
    # Y(z) = (0.3678 z^2 + 0.2642 z) / ((z - 1)(z^2 - 0.8 z + 0.36))
    p1 = 1.0 + 0.0j
    p2 = 0.4 + 1j * np.sqrt(0.36 - 0.16)  # 0.4 + j 0.4472136
    p3 = 0.4 - 1j * np.sqrt(0.36 - 0.16)  # 0.4 - j 0.4472136
    z0 = -0.2642 / 0.3678                 # -0.718325

    r_vals = np.linspace(0.02, 1.45, 80)
    theta_vals = np.linspace(0, 2 * np.pi, 120)
    R, THETA = np.meshgrid(r_vals, theta_vals)
    X = R * np.cos(THETA)
    Y = R * np.sin(THETA)
    Z_complex = X + 1j * Y

    eps = 0.055
    denom = (Z_complex - p1) * (Z_complex - p2) * (Z_complex - p3)
    denom_safe = np.where(np.abs(denom) < eps**2, eps**2, denom)
    num = 0.3678 * (Z_complex ** 2) + 0.2642 * Z_complex
    Yz = num / denom_safe
    mag = 4.2 * np.tanh(np.abs(Yz) * 0.55 / 4.2)

    ang = np.linspace(0, 2 * np.pi, 200)
    ux = np.cos(ang)
    uy = np.sin(ang)

    # Contorno cerrado de integración de Cauchy C (|z| = 1.18 > max|p_i| = 1.0)
    r_cauchy = 1.18
    cx = r_cauchy * np.cos(ang)
    cy = r_cauchy * np.sin(ang)
    cz_complex = cx + 1j * cy
    c_mag = 4.2 * np.tanh(
        np.abs((0.3678 * cz_complex**2 + 0.2642 * cz_complex) / ((cz_complex - p1) * (cz_complex - p2) * (cz_complex - p3))) * 0.55 / 4.2
    )

    # Círculo de radio r = 0.6 (módulo de polos complejos conjugados)
    r_poles = 0.6
    px_ring = r_poles * np.cos(ang)
    py_ring = r_poles * np.sin(ang)

    # Escala cromática oficial config/framework_iub (beamerthemeiub.sty)
    iub_colorscale = [
        [0.0, "#121023"],   # iubOscuro
        [0.25, "#00ADE7"],  # iubAzulClaro
        [0.52, "#3B9C6D"],  # iubVerde
        [0.78, "#FFDF2D"],  # iubAmarillo
        [1.0, "#E39037"]    # iubNaranja
    ]

    traces = [
        {
            "type": "surface",
            "x": np.round(X, 4).tolist(),
            "y": np.round(Y, 4).tolist(),
            "z": np.round(mag, 4).tolist(),
            "colorscale": iub_colorscale,
            "opacity": 0.86,
            "name": "|Y(z)| Brazo Robótico",
            "colorbar": {"title": "|Y(z)|", "len": 0.65, "tickfont": {"color": "#FFFFFF"}}
        },
        {
            "type": "scatter3d",
            "x": np.round(ux, 4).tolist(),
            "y": np.round(uy, 4).tolist(),
            "z": (np.zeros_like(ux) + 0.04).tolist(),
            "mode": "lines",
            "line": {"color": "#FFDF2D", "width": 7},
            "name": "Círculo Unitario |z| = 1 (#FFDF2D)"
        },
        {
            "type": "scatter3d",
            "x": np.round(cx, 4).tolist(),
            "y": np.round(cy, 4).tolist(),
            "z": np.round(c_mag + 0.06, 4).tolist(),
            "mode": "lines",
            "line": {"color": "#34D399", "width": 7},
            "name": "Contorno de Cauchy ∮_C (|z| = 1.18 > 1)"
        },
        {
            "type": "scatter3d",
            "x": np.round(px_ring, 4).tolist(),
            "y": np.round(py_ring, 4).tolist(),
            "z": (np.zeros_like(px_ring) + 0.04).tolist(),
            "mode": "lines",
            "line": {"color": "#00ADE7", "width": 5, "dash": "dash"},
            "name": "Radio Polos Conjugados r = 0.6 (#00ADE7)"
        },
        {
            "type": "scatter3d",
            "x": [1.0, 0.4, 0.4],
            "y": [0.0, round(float(np.imag(p2)), 4), round(float(np.imag(p3)), 4)],
            "z": [0.15, 0.15, 0.15],
            "mode": "markers+text",
            "marker": {"size": 9, "color": "#F87171", "symbol": "x"},
            "text": [
                "Polo z₁=1.0 (Residuo c₁=1.1286)",
                "Polo z₂=0.4+j0.4472 (r=0.6, θ=+48.19°)",
                "Polo z₃=0.4-j0.4472 (r=0.6, θ=-48.19°)"
            ],
            "textposition": "top center",
            "name": "Polos de Y(z) (#F87171)"
        },
        {
            "type": "scatter3d",
            "x": [0.0, round(z0, 4)],
            "y": [0.0, 0.0],
            "z": [0.15, 0.15],
            "mode": "markers+text",
            "marker": {"size": 8, "color": "#00ADE7", "symbol": "circle"},
            "text": ["Cero z=0", f"Cero z₀={z0:.4f}"],
            "textposition": "bottom center",
            "name": "Ceros de Y(z) (#00ADE7)"
        }
    ]

    layout = {
        "paper_bgcolor": "#121023",
        "plot_bgcolor": "#121023",
        "font": {"color": "#FFFFFF"},
        "scene": {
            "xaxis": {"title": "Re(z)", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#FFDF2D"},
            "yaxis": {"title": "Im(z)", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#FFDF2D"},
            "zaxis": {"title": "Magnitud |Y(z)|", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#00ADE7"},
            "camera": {"eye": {"x": 1.58, "y": -1.52, "z": 1.18}}
        },
        "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
        "legend": {"x": 0.02, "y": 0.94, "bgcolor": "rgba(18,16,35,0.92)", "bordercolor": "#FFDF2D", "borderwidth": 1}
    }

    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visor Científico Plotly 3D - Semana 3 Transformada Z Inversa | IUB</title>
  <script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
  <style>
    html, body {{ margin: 0; padding: 0; width: 100%; height: 100%; background: #121023; color: #FFFFFF; overflow: hidden; font-family: Helvetica, Arial, sans-serif; display: flex; flex-direction: column; }}
    header {{ height: 60px; background: #121023; border-bottom: 2px solid #FFDF2D; display: flex; align-items: center; justify-content: space-between; padding: 0 22px; box-sizing: border-box; }}
    .brand {{ display: flex; align-items: center; gap: 14px; }}
    .brand img {{ height: 38px; width: auto; }}
    .brand-title {{ font-weight: 800; font-size: 15px; color: #FFFFFF; }}
    .brand-sub {{ font-size: 12px; color: #FFDF2D; font-weight: 700; }}
    .back-btn {{ background: #FFDF2D; color: #121023; padding: 7px 15px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 12px; border: 1px solid #00ADE7; }}
    #plot {{ flex: 1; width: 100%; }}
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <img src="logos/logo_iub_blanco.png" alt="Logo IUB" onerror="this.src='logo_iub_blanco.png'" />
      <div>
        <div class="brand-title">MEC36 — Control II · Semana 3: Transformada Z Inversa, Contorno de Cauchy y Polos Complejos 3D</div>
        <div class="brand-sub">Institución Universitaria de Barranquilla · Paleta Oficial config/framework_iub (beamerthemeiub.sty)</div>
      </div>
    </div>
    <a href="index.html" class="back-btn">← Volver al Laboratorio Three.js 3D</a>
  </header>
  <div id="plot"></div>
  <script>
    const traces = {json.dumps(traces)};
    const layout = {json.dumps(layout)};
    Plotly.newPlot('plot', traces, layout, {{responsive: true}});
  </script>
</body>
</html>
"""
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[OK] Visor Plotly 3D Semana 3 con paleta IUB generado en: {output_path}")


if __name__ == "__main__":
    generar_html_plotly_semana03()
