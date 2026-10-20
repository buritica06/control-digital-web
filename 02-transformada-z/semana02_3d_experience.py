"""
Generador Científico 3D de la Transformada Z, ROC y Caso Servomecanismo (Semana 2)
Módulo: MEC36 - Control II | Institución Universitaria de Barranquilla (IUB)
Paleta: IUB Dark Yellow + config/framework_iub (beamerthemeiub.sty)
Genera 'transformada_z_semana02_3d.html' interactivo mediante Plotly WebGL.
"""

import os
import json
import numpy as np


def generar_html_plotly_semana02(output_path=None):
    if output_path is None:
        output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "transformada_z_semana02_3d.html")

    T = 0.1
    a1 = float(np.exp(-2.0 * T))  # 0.81873075
    a2 = float(np.exp(-5.0 * T))  # 0.60653066
    z0 = float(-(3.0 * a1 - 4.0 * a2))  # -0.02997028

    r_vals = np.linspace(0.02, 1.45, 75)
    theta_vals = np.linspace(0, 2 * np.pi, 110)
    R, THETA = np.meshgrid(r_vals, theta_vals)
    X = R * np.cos(THETA)
    Y = R * np.sin(THETA)
    Z_complex = X + 1j * Y

    eps = 0.045
    denom = (Z_complex - a1) * (Z_complex - a2)
    denom_safe = np.where(np.abs(denom) < eps, eps, denom)
    Ez = Z_complex * (Z_complex - z0) / denom_safe
    mag = 3.8 * np.tanh(np.abs(Ez) * 0.45 / 3.8)

    ang = np.linspace(0, 2 * np.pi, 180)
    ux = np.cos(ang)
    uy = np.sin(ang)
    uz_complex = ux + 1j * uy
    u_mag = 3.8 * np.tanh(np.abs(uz_complex * (uz_complex - z0) / ((uz_complex - a1) * (uz_complex - a2))) * 0.45 / 3.8)

    rx = a1 * np.cos(ang)
    ry = a1 * np.sin(ang)

    # Escala cromática con colores IUB Dark Yellow + framework_iub
    iub_colorscale = [
        [0.0, "#121023"],
        [0.25, "#00ADE7"],
        [0.50, "#34D399"],
        [0.78, "#FFDF2D"],
        [1.0, "#F87171"]
    ]

    traces = [
        {
            "type": "surface",
            "x": np.round(X, 4).tolist(),
            "y": np.round(Y, 4).tolist(),
            "z": np.round(mag, 4).tolist(),
            "colorscale": iub_colorscale,
            "opacity": 0.85,
            "name": "|E(z)| Servomecanismo",
            "colorbar": {"title": "|E(z)|", "len": 0.65, "tickfont": {"color": "#FFFFFF"}}
        },
        {
            "type": "scatter3d",
            "x": np.round(ux, 4).tolist(),
            "y": np.round(uy, 4).tolist(),
            "z": np.zeros_like(ux).tolist(),
            "mode": "lines",
            "line": {"color": "#FFDF2D", "width": 7},
            "name": "Círculo Unitario |z| = 1 (#FFDF2D)"
        },
        {
            "type": "scatter3d",
            "x": np.round(ux, 4).tolist(),
            "y": np.round(uy, 4).tolist(),
            "z": np.round(u_mag + 0.05, 4).tolist(),
            "mode": "lines",
            "line": {"color": "#38BDF8", "width": 7},
            "name": "Cresta DTFT |E(e^{jω})| (#38BDF8)"
        },
        {
            "type": "scatter3d",
            "x": np.round(rx, 4).tolist(),
            "y": np.round(ry, 4).tolist(),
            "z": (np.zeros_like(rx) + 0.03).tolist(),
            "mode": "lines",
            "line": {"color": "#34D399", "width": 5, "dash": "dash"},
            "name": f"Frontera ROC |z| > {a1:.4f} (#34D399)"
        },
        {
            "type": "scatter3d",
            "x": [round(a1, 4), round(a2, 4)],
            "y": [0.0, 0.0],
            "z": [0.12, 0.12],
            "mode": "markers+text",
            "marker": {"size": 8, "color": "#F87171", "symbol": "x"},
            "text": [f"Polo z₁={a1:.4f}", f"Polo z₂={a2:.4f}"],
            "textposition": "top center",
            "name": "Polos de E(z) (#F87171)"
        },
        {
            "type": "scatter3d",
            "x": [0.0, round(z0, 4)],
            "y": [0.0, 0.0],
            "z": [0.12, 0.12],
            "mode": "markers+text",
            "marker": {"size": 8, "color": "#38BDF8", "symbol": "circle"},
            "text": ["Cero z=0", f"Cero z₀={z0:.4f}"],
            "textposition": "bottom center",
            "name": "Ceros de E(z) (#38BDF8)"
        }
    ]

    layout = {
        "paper_bgcolor": "#121023",
        "plot_bgcolor": "#121023",
        "font": {"color": "#FFFFFF"},
        "scene": {
            "xaxis": {"title": "Re(z)", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#FFDF2D"},
            "yaxis": {"title": "Im(z)", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#FFDF2D"},
            "zaxis": {"title": "Magnitud |E(z)|", "backgroundcolor": "#121023", "gridcolor": "#2F2A54", "zerolinecolor": "#38BDF8"},
            "camera": {"eye": {"x": 1.55, "y": -1.55, "z": 1.15}}
        },
        "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
        "legend": {"x": 0.02, "y": 0.94, "bgcolor": "rgba(18,16,35,0.9)", "bordercolor": "#FFDF2D", "borderwidth": 1}
    }

    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visor Científico Plotly 3D - Semana 2 Transformada Z | IUB</title>
  <script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
  <style>
    html, body {{ margin: 0; padding: 0; width: 100%; height: 100%; background: #121023; color: #FFFFFF; overflow: hidden; font-family: Helvetica, Arial, sans-serif; display: flex; flex-direction: column; }}
    header {{ height: 56px; background: #121023; border-bottom: 2px solid #FFDF2D; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; box-sizing: border-box; }}
    .brand {{ display: flex; align-items: center; gap: 14px; }}
    .brand img {{ height: 36px; width: auto; }}
    .brand-title {{ font-weight: 800; font-size: 15px; color: #FFFFFF; }}
    .brand-sub {{ font-size: 12px; color: #FFDF2D; font-weight: 700; }}
    .back-btn {{ background: #FFDF2D; color: #121023; padding: 6px 14px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 12px; }}
    #plot {{ flex: 1; width: 100%; }}
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <img src="logos/logo_iub_blanco.png" alt="Logo IUB" onerror="this.src='logo_iub_blanco.png'" />
      <div>
        <div class="brand-title">MEC36 — Control II · Semana 2: Superficie 3D |E(z)|, Polos, Ceros y ROC</div>
        <div class="brand-sub">Institución Universitaria de Barranquilla · Paleta Oficial IUB Dark Yellow</div>
      </div>
    </div>
    <a href="index.html" class="back-btn">← Volver al Laboratorio Three.js</a>
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
    print(f"[OK] Visor Plotly 3D con paleta IUB generado en: {output_path}")


if __name__ == "__main__":
    generar_html_plotly_semana02()
