"""
Experiencia Visual Científica 3D: La Transformada Z como Extensión Geométrica de Fourier
========================================================================================
Modela la señal discreta causal x[n] = a^n * cos(w0 * n) * u[n] y su topología en el
plano complejo Z mediante:
  1. Plataforma interactiva del plano complejo con coordenadas polares.
  2. Región de Convergencia (ROC |z| > |a|) translúcida vs. zona de divergencia.
  3. Polos como pozos gravitacionales y ceros como fuentes de repulsión (Potencial de Laplace
     y campo vectorial 3D de gradiente).
  4. Superficie espectral |X(z)| con sombreado Fresnel e iluminación especular.
  5. Cilindros concéntricos de evaluación radial (z = r * e^{j*w}) y curvas de corte.
  6. Órbita luminosa del Círculo Unitario (r = 1, Transformada de Fourier DTFT).
  7. Pasarela temporal 3D que conecta visualmente x[n] con el dominio Z.

Autor: Diseño de Visualización Científica en Ingeniería
"""

import os
from dataclasses import dataclass
from typing import Dict, List, Tuple
import numpy as np
import plotly.graph_objects as go


# ======================================================================================
# 1. CONFIGURACIÓN DE PARÁMETROS CIENTÍFICOS Y ESTÉTICOS
# ======================================================================================
@dataclass(frozen=True)
class ZTransformConfig:
    """Parámetros matemáticos y geométricos de la simulación."""
    a_default: float = 0.78          # Radio de los polos por defecto (sistema estable < 1)
    omega_0: float = np.pi / 3.0     # Frecuencia natural discreta (60 grados)
    r_max: float = 1.65              # Radio máximo del plano complejo renderizado
    grid_radial: int = 110           # Resolución radial de las superficies
    grid_angular: int = 180          # Resolución angular de las superficies
    n_samples: int = 22              # Número de muestras discretas de x[n] a visualizar
    mag_cap: float = 4.2             # Techo suave para truncar singularidades de |X(z)|
    well_depth: float = -3.2         # Profundidad máxima de los pozos gravitacionales
    eval_radii: Tuple[float, ...] = (0.86, 1.00, 1.30)  # Cilindros r de evaluación


# ======================================================================================
# 2. MOTOR MATEMÁTICO DE LA TRANSFORMADA Z Y TEORÍA DE POTENCIAL
# ======================================================================================
class SignalMathematics:
    """Núcleo analítico para x[n] = a^n cos(w0 n) u[n] y su topología en el dominio Z."""

    @staticmethod
    def discrete_signal(n: np.ndarray, a: float, omega_0: float) -> np.ndarray:
        """Evalúa la secuencia temporal causal x[n] = a^n cos(omega_0 * n)."""
        return (a ** n) * np.cos(omega_0 * n)

    @staticmethod
    def poles_and_zeros(a: float, omega_0: float) -> Tuple[np.ndarray, np.ndarray]:
        """
        Retorna las coordenadas complejas exactas de los polos y ceros.
        X(z) = z * (z - a*cos(w0)) / ((z - a*e^{j*w0}) * (z - a*e^{-j*w0}))
        """
        zeros = np.array([0.0 + 0.0j, a * np.cos(omega_0) + 0.0j])
        poles = np.array([
            a * np.exp(1j * omega_0),
            a * np.exp(-1j * omega_0)
        ])
        return poles, zeros

    @staticmethod
    def evaluate_xz(z: np.ndarray, a: float, omega_0: float, eps: float = 1e-3) -> np.ndarray:
        """Evalúa la función racional compleja X(z) regularizando las singularidades."""
        numerator = z * (z - a * np.cos(omega_0))
        p1 = a * np.exp(1j * omega_0)
        p2 = a * np.exp(-1j * omega_0)
        denom = (z - p1) * (z - p2)
        # Regularización suave para evitar división exacta por cero en la malla
        denom_safe = np.where(np.abs(denom) < eps, eps * np.exp(1j * np.angle(denom)), denom)
        return numerator / denom_safe

    @staticmethod
    def magnitude_surface(z: np.ndarray, a: float, omega_0: float, cap: float) -> np.ndarray:
        """Calcula la superficie de magnitud |X(z)| con saturación suave en los polos."""
        xz = SignalMathematics.evaluate_xz(z, a, omega_0)
        mag = np.abs(xz)
        # Compresión hiperbólica suave cerca del límite superior para preservar estética 3D
        return cap * np.tanh(mag / cap)

    @staticmethod
    def gravitational_potential(
        z: np.ndarray, a: float, omega_0: float, well_depth: float
    ) -> np.ndarray:
        """
        Calcula el potencial gravitacional/electrostático logarítmico:
            Phi(z) = sum(ln|z - p_k|) - sum(ln|z - z_i|)
        - Cerca de los Polos (p_k): Phi(z) -> -infinito (Pozos gravitacionales profundos).
        - Cerca de los Ceros (z_i): Phi(z) -> +pico (Fuentes de repulsión locales).
        """
        poles, zeros = SignalMathematics.poles_and_zeros(a, omega_0)
        eps = 0.045  # Radio de suavizado del núcleo gravitacional

        # Atracción gravitacional de los polos (hunde la tela del plano complejo)
        pole_potential = sum(np.log(np.abs(z - p) + eps) for p in poles)
        # Repulsión de los ceros (eleva domos locales de energía potencial)
        zero_potential = sum(np.log(np.abs(z - zr) + eps) for zr in zeros)

        raw_phi = 0.85 * (pole_potential - 0.65 * zero_potential)
        # Desplazamiento bajo el plano z=0 para que actúe como subestructura gravitacional
        shifted_phi = np.clip(raw_phi - 0.35, well_depth, 0.75)
        return shifted_phi

    @staticmethod
    def repulsion_attraction_field(
        x_grid: np.ndarray, y_grid: np.ndarray, a: float, omega_0: float
    ) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
        """
        Calcula el campo vectorial 3D de fuerza F = -grad(Phi), donde las líneas de flujo
        emergen de los ceros (fuentes de repulsión) y caen hacia los polos (pozos).
        """
        z = x_grid + 1j * y_grid
        poles, zeros = SignalMathematics.poles_and_zeros(a, omega_0)
        eps2 = 0.03

        fx = np.zeros_like(x_grid)
        fy = np.zeros_like(y_grid)

        # Ceros: Fuentes de repulsión (+r / |r|^2)
        for zr in zeros:
            dx = x_grid - zr.real
            dy = y_grid - zr.imag
            dist2 = dx**2 + dy**2 + eps2
            fx += 0.75 * dx / dist2
            fy += 0.75 * dy / dist2

        # Polos: Pozos gravitacionales (-r / |r|^2)
        for p in poles:
            dx = x_grid - p.real
            dy = y_grid - p.imag
            dist2 = dx**2 + dy**2 + eps2
            fx -= 1.25 * dx / dist2
            fy -= 1.25 * dy / dist2

        # Componente vertical que se hunde al acercarse a los polos
        fz = np.zeros_like(fx)
        for p in poles:
            dist_p = np.hypot(x_grid - p.real, y_grid - p.imag)
            fz -= 1.4 * np.exp(-(dist_p**2) / 0.08)

        # Normalización suave para visualización uniforme de conos
        norm = np.sqrt(fx**2 + fy**2 + fz**2) + 1e-6
        scale = np.tanh(norm * 0.4) / norm
        return fx * scale, fy * scale, fz * scale


# ======================================================================================
# 3. CONSTRUCTOR GEOMÉTRICO DE LA ESCENA 3D
# ======================================================================================
class SceneGeometryBuilder:
    """Construye cada capa geométrica tridimensional como trazas modulares de Plotly."""

    def __init__(self, config: ZTransformConfig):
        self.cfg = config
        r_lin = np.linspace(0.01, config.r_max, config.grid_radial)
        theta_lin = np.linspace(-np.pi, np.pi, config.grid_angular)
        self.R, self.THETA = np.meshgrid(r_lin, theta_lin)
        self.X = self.R * np.cos(self.THETA)
        self.Y = self.R * np.sin(self.THETA)
        self.Z_complex = self.X + 1j * self.Y

    def build_complex_plane_platform(self) -> List[go.Scatter3d]:
        """Crea la plataforma polar interactiva en el nivel Z = 0."""
        traces = []
        theta_ring = np.linspace(0, 2 * np.pi, 160)

        # Anillos radiales de referencia
        for r_val in [0.4, 0.8, 1.2, 1.6]:
            traces.append(
                go.Scatter3d(
                    x=r_val * np.cos(theta_ring),
                    y=r_val * np.sin(theta_ring),
                    z=np.zeros_like(theta_ring),
                    mode="lines",
                    line=dict(color="rgba(140, 170, 210, 0.22)", width=2, dash="dot"),
                    name=f"Radio r = {r_val}",
                    showlegend=False,
                    hoverinfo="skip",
                )
            )

        # Rayos angulares de fase cada 30 grados
        for angle_deg in range(0, 360, 30):
            ang = np.deg2rad(angle_deg)
            traces.append(
                go.Scatter3d(
                    x=[0, self.cfg.r_max * np.cos(ang)],
                    y=[0, self.cfg.r_max * np.sin(ang)],
                    z=[0, 0],
                    mode="lines",
                    line=dict(color="rgba(140, 170, 210, 0.18)", width=1.5),
                    showlegend=False,
                    hoverinfo="skip",
                )
            )

        # Ejes principales Real e Imaginario destacados
        axis_limit = self.cfg.r_max * 1.05
        traces.append(
            go.Scatter3d(
                x=[-axis_limit, axis_limit, None, 0, 0],
                y=[0, 0, None, -axis_limit, axis_limit],
                z=[0, 0, None, 0, 0],
                mode="lines",
                line=dict(color="rgba(200, 225, 255, 0.55)", width=4),
                name="Ejes Re(z) / Im(z)",
                showlegend=False,
                hoverinfo="skip",
            )
        )
        return traces

    def build_roc_zones(self, a: float) -> List[go.Surface]:
        """
        Construye la Región de Convergencia (ROC: |z| > |a|) como un anillo translúcido
        esmeralda y la zona interior divergente (|z| <= |a|) en tono carmesí tenue.
        """
        theta = np.linspace(0, 2 * np.pi, 120)

        # 1. Zona de Convergencia (ROC): |a| < |z| <= r_max
        r_roc = np.linspace(a, self.cfg.r_max, 25)
        R_roc, T_roc = np.meshgrid(r_roc, theta)
        X_roc = R_roc * np.cos(T_roc)
        Y_roc = R_roc * np.sin(T_roc)
        Z_roc = np.full_like(X_roc, 0.008)

        roc_surface = go.Surface(
            x=X_roc,
            y=Y_roc,
            z=Z_roc,
            surfacecolor=R_roc,
            colorscale=[[0.0, "rgba(0, 255, 170, 0.45)"], [1.0, "rgba(0, 160, 255, 0.15)"]],
            opacity=0.32,
            showscale=False,
            name=f"ROC Convergente (|z| > {a:.2f})",
            showlegend=True,
            hovertemplate=(
                "<b>Región de Convergencia (ROC)</b><br>"
                "r = %{surfacecolor:.2f} > |a|<br>"
                "La serie Z converge absolutamente<extra></extra>"
            ),
        )

        # 2. Zona Interior Divergente: 0 <= |z| < |a|
        r_div = np.linspace(0.0, a, 15)
        R_div, T_div = np.meshgrid(r_div, theta)
        X_div = R_div * np.cos(T_div)
        Y_div = R_div * np.sin(T_div)
        Z_div = np.full_like(X_div, 0.004)

        div_surface = go.Surface(
            x=X_div,
            y=Y_div,
            z=Z_div,
            surfacecolor=R_div,
            colorscale=[[0.0, "rgba(255, 50, 80, 0.15)"], [1.0, "rgba(255, 30, 60, 0.38)"]],
            opacity=0.25,
            showscale=False,
            name=f"Interior Divergente (|z| ≤ {a:.2f})",
            showlegend=True,
            hovertemplate=(
                "<b>Zona Fuera de la ROC</b><br>"
                "r = %{surfacecolor:.2f} ≤ |a|<br>"
                "La suma infinita diverge<extra></extra>"
            ),
        )
        return [roc_surface, div_surface]

    def build_spectral_and_gravity_surfaces(
        self, a: float
    ) -> Tuple[go.Surface, go.Surface, go.Cone, List[go.Scatter3d]]:
        """
        Genera:
        1. La superficie superior de Magnitud |X(z)|.
        2. La subestructura inferior de Pozos Gravitacionales (Polos) y Repulsión (Ceros).
        3. El campo vectorial 3D de flujo de repulsión/atracción.
        4. Los marcadores luminosos de Polos (×) y Ceros (○).
        """
        omega_0 = self.cfg.omega_0
        mag_z = SignalMathematics.magnitude_surface(
            self.Z_complex, a, omega_0, self.cfg.mag_cap
        )
        phi_z = SignalMathematics.gravitational_potential(
            self.Z_complex, a, omega_0, self.cfg.well_depth
        )
        phase_z = np.angle(SignalMathematics.evaluate_xz(self.Z_complex, a, omega_0))

        # Superficie superior: Magnitud |X(z)| coloreada por energía y sombreado Fresnel
        mag_surface = go.Surface(
            x=self.X,
            y=self.Y,
            z=mag_z,
            surfacecolor=mag_z,
            colorscale="Plasma",
            opacity=0.72,
            showscale=True,
            colorbar=dict(
                title=dict(text="|X(z)| Magnitud", font=dict(color="#E2E8F0", size=12)),
                tickfont=dict(color="#CBD5E1"),
                len=0.55,
                x=0.96,
                y=0.55,
            ),
            lighting=dict(
                ambient=0.45,
                diffuse=0.75,
                specular=0.90,
                roughness=0.20,
                fresnel=0.65,
            ),
            lightposition=dict(x=120, y=200, z=300),
            name="Superficie Espectral |X(z)|",
            showlegend=True,
            customdata=np.dstack((self.R, np.rad2deg(self.THETA), np.rad2deg(phase_z))),
            hovertemplate=(
                "<b> Paisaje Espectral X(z)</b><br>"
                "Re(z): %{x:.2f} | Im(z): %{y:.2f}<br>"
                "Radio r: %{customdata[0]:.2f} | Ángulo ω: %{customdata[1]:.1f}°<br>"
                "<b>|X(z)|: %{z:.2f}</b> | Fase: %{customdata[2]:.1f}°<extra></extra>"
            ),
        )

        # Superficie inferior: Pozos Gravitacionales (Polos) y Domos de Repulsión (Ceros)
        gravity_surface = go.Surface(
            x=self.X,
            y=self.Y,
            z=phi_z,
            surfacecolor=phi_z,
            colorscale=[
                [0.0, "#050014"],   # Núcleo profundo del pozo gravitacional (Polo)
                [0.25, "#5B0E91"],  # Curvatura intensa del embudo
                [0.55, "#0E4B68"],  # Tejido medio del plano
                [0.82, "#00B4D8"],  # Pendiente de repulsión
                [1.0, "#90E0EF"],   # Cúpula de fuente de repulsión (Cero)
            ],
            opacity=0.68,
            showscale=False,
            lighting=dict(ambient=0.5, diffuse=0.8, specular=0.6, roughness=0.35),
            contours=dict(
                z=dict(
                    show=True,
                    usecolormap=True,
                    project_z=False,
                    width=2,
                )
            ),
            name="Pozos Gravitacionales Φ(z) = -ln|X(z)|",
            showlegend=True,
            hovertemplate=(
                "<b>Tejido Gravitacional Complejo</b><br>"
                "Re(z): %{x:.2f} | Im(z): %{y:.2f}<br>"
                "Potencial Φ(z): %{z:.2f}<extra></extra>"
            ),
        )

        # Campo vectorial 3D: Repulsión desde ceros -> Atracción hacia pozos de polos
        grid_vec = np.linspace(-1.25, 1.25, 13)
        Xg, Yg = np.meshgrid(grid_vec, grid_vec)
        mask = (Xg**2 + Yg**2) <= 1.35**2
        Xv, Yv = Xg[mask], Yg[mask]
        Zv = np.full_like(Xv, -0.06)
        U, V, W = SignalMathematics.repulsion_attraction_field(Xv, Yv, a, omega_0)

        vector_cones = go.Cone(
            x=Xv,
            y=Yv,
            z=Zv,
            u=U,
            v=V,
            w=W,
            sizemode="scaled",
            sizeref=0.32,
            anchor="tail",
            colorscale=[[0.0, "#00F5D4"], [0.5, "#7B2CBF"], [1.0, "#FF007F"]],
            showscale=False,
            opacity=0.82,
            name="Flujo: Repulsión (Ceros) → Atracción (Polos)",
            showlegend=True,
            hoverinfo="skip",
        )

        # Marcadores singulares de Polos y Ceros en el plano Z = 0
        poles, zeros = SignalMathematics.poles_and_zeros(a, omega_0)
        singularities = [
            go.Scatter3d(
                x=poles.real,
                y=poles.imag,
                z=[0.04, 0.04],
                mode="markers+text",
                marker=dict(
                    size=9,
                    symbol="x",
                    color="#FF2A85",
                    line=dict(color="#FFFFFF", width=2),
                ),
                text=["Polo p₁ (Pozo)", "Polo p₂ (Pozo)"],
                textposition="top center",
                textfont=dict(color="#FF75B5", size=11),
                name="Polos (Pozos Gravitacionales)",
                hovertemplate=(
                    "<b>Polo Singular (Pozo Gravitacional)</b><br>"
                    "z = %{x:.2f} + j(%{y:.2f})<br>"
                    "Radio r = |a| = " + f"{a:.2f}<extra></extra>"
                ),
            ),
            go.Scatter3d(
                x=zeros.real,
                y=zeros.imag,
                z=[0.05, 0.05],
                mode="markers+text",
                marker=dict(
                    size=10,
                    symbol="circle",
                    color="#00F5D4",
                    line=dict(color="#051923", width=2),
                ),
                text=["Cero z₁ (Origen)", "Cero z₂ (Repulsor)"],
                textposition="bottom center",
                textfont=dict(color="#56CFE1", size=11),
                name="Ceros (Fuentes de Repulsión)",
                hovertemplate=(
                    "<b>Cero del Sistema (Fuente de Repulsión)</b><br>"
                    "z = %{x:.2f} + j(%{y:.2f})<br>"
                    "Anula la transferencia: |X(z)| = 0<extra></extra>"
                ),
            ),
        ]

        return mag_surface, gravity_surface, vector_cones, singularities

    def build_unit_circle_and_cylinders(
        self, a: float
    ) -> Tuple[List[go.Scatter3d], List[go.Surface], List[go.Scatter3d]]:
        """
        Construye:
        1. El Círculo Unitario (|z|=1) como una órbita luminosa multicapa (efecto neón)
           tanto en el plano complejo como sobre la superficie espectral (DTFT).
        2. Cilindros concéntricos translúcidos para distintos valores de r y sus curvas
           de evaluación |X(r e^{j*w})|.
        """
        omega_0 = self.cfg.omega_0
        omega = np.linspace(-np.pi, np.pi, 300)

        # --- A. ÓRBITA LUMINOSA DEL CÍRCULO UNITARIO (r = 1, DTFT) ---
        z_unit = np.exp(1j * omega)
        x_unit, y_unit = np.cos(omega), np.sin(omega)
        dtft_mag = SignalMathematics.magnitude_surface(
            z_unit, a, omega_0, self.cfg.mag_cap
        )

        unit_circle_traces = [
            # Halo externo en el plano base Z = 0
            go.Scatter3d(
                x=x_unit,
                y=y_unit,
                z=np.full_like(omega, 0.015),
                mode="lines",
                line=dict(color="rgba(255, 214, 10, 0.28)", width=14),
                name="Halo Círculo Unitario",
                showlegend=False,
                hoverinfo="skip",
            ),
            # Núcleo brillante en el plano base Z = 0
            go.Scatter3d(
                x=x_unit,
                y=y_unit,
                z=np.full_like(omega, 0.02),
                mode="lines",
                line=dict(color="#FFD60A", width=5),
                name="Círculo Unitario |z| = 1 (Órbita Base)",
                hovertemplate="<b>Órbita Unitaria |z| = 1</b><br>ω = %{x:.2f}, %{y:.2f}<extra></extra>",
            ),
            # Halo luminoso de la DTFT en 3D |X(e^{j*w})|
            go.Scatter3d(
                x=x_unit,
                y=y_unit,
                z=dtft_mag,
                mode="lines",
                line=dict(color="rgba(0, 245, 212, 0.35)", width=15),
                showlegend=False,
                hoverinfo="skip",
            ),
            # Curva principal de la Transformada de Fourier (DTFT) sobre r = 1
            go.Scatter3d(
                x=x_unit,
                y=y_unit,
                z=dtft_mag,
                mode="lines",
                line=dict(color="#00F5D4", width=6),
                name="Transformada de Fourier DTFT |X(e^{jω})|",
                hovertemplate=(
                    "<b>DTFT sobre el Círculo Unitario (r = 1)</b><br>"
                    "Re: %{x:.2f} | Im: %{y:.2f}<br>"
                    "<b>|X(e^{jω})|: %{z:.2f}</b><extra></extra>"
                ),
            ),
        ]

        # --- B. CILINDROS CONCÉNTRICOS DE EVALUACIÓN RADIAL (z = r * e^{j*w}) ---
        cylinder_surfaces = []
        cylinder_curves = []

        # Radios dinámicos: uno cerca de los polos, el unitario (r=1) y uno exterior
        r_near_pole = max(0.35, min(1.45, a + 0.08))
        radii_spec = [
            (r_near_pole, "rgba(255, 90, 150, 0.25)", "#FF5D8F", f"Cilindro Crítico r = {r_near_pole:.2f}"),
            (1.00, "rgba(0, 245, 212, 0.24)", "#00F5D4", "Cilindro Unitario r = 1.00 (Fourier)"),
            (1.32, "rgba(114, 9, 183, 0.20)", "#B5179E", "Cilindro Exterior r = 1.32 (Amortiguado)"),
        ]

        theta_cyl = np.linspace(-np.pi, np.pi, 140)
        v_norm = np.linspace(0.0, 1.0, 22)
        T_c, V_c = np.meshgrid(theta_cyl, v_norm)

        for r_val, surf_color, line_color, label in radii_spec:
            z_ring = r_val * np.exp(1j * theta_cyl)
            mag_ring = SignalMathematics.magnitude_surface(
                z_ring, a, omega_0, self.cfg.mag_cap
            )
            # La pared del cilindro sube desde el plano z=0 hasta la curva |X(r e^{j*w})|
            X_cyl = r_val * np.cos(T_c)
            Y_cyl = r_val * np.sin(T_c)
            Z_cyl = V_c * mag_ring[np.newaxis, :]

            cylinder_surfaces.append(
                go.Surface(
                    x=X_cyl,
                    y=Y_cyl,
                    z=Z_cyl,
                    surfacecolor= np.ones_like(Z_cyl) * r_val,
                    colorscale=[[0.0, surf_color], [1.0, surf_color]],
                    opacity=0.28,
                    showscale=False,
                    name=label,
                    showlegend=True,
                    hoverinfo="skip",
                )
            )

            # Si no es r=1 (que ya tiene la órbita neón), añadimos su cresta espectral
            if not np.isclose(r_val, 1.0):
                cylinder_curves.append(
                    go.Scatter3d(
                        x=r_val * np.cos(theta_cyl),
                        y=r_val * np.sin(theta_cyl),
                        z=mag_ring,
                        mode="lines",
                        line=dict(color=line_color, width=4, dash="solid"),
                        name=f"Corte Espectral |X({r_val:.2f}·e^{{jω}})|",
                        hovertemplate=(
                            f"<b>Evaluación en Radio r = {r_val:.2f}</b><br>"
                            "Transformada de Fourier de x[n]·r⁻ⁿ<br>"
                            "<b>|X(r·e^{jω})|: %{z:.2f}</b><extra></extra>"
                        ),
                    )
                )

        return unit_circle_traces, cylinder_surfaces, cylinder_curves

    def build_discrete_signal_bridge(self, a: float) -> List[go.Scatter3d]:
        """
        Construye una 'Pasarela Temporal 3D' al costado del plano complejo donde la
        señal discreta x[n] = a^n cos(w0 n) emerge como pulsos verticales y proyecta
        filamentos luminosos de transformación z^{-n} hacia el Círculo Unitario.
        """
        n = np.arange(self.cfg.n_samples)
        omega_0 = self.cfg.omega_0
        x_n = SignalMathematics.discrete_signal(n, a, omega_0)

        # Ubicamos la pasarela temporal a lo largo de Y = -2.05, desplegando n en el eje X
        x_rail = np.linspace(-1.55, 1.55, self.cfg.n_samples)
        y_rail = np.full_like(x_rail, -2.05)
        z_base = np.zeros_like(x_rail)
        # Escalamos la altura visual para que conviva armónicamente con |X(z)|
        z_heights = x_n * 1.15

        # Construcción de tallos discretos (stems) en un solo vector con separadores None
        stem_x, stem_y, stem_z = [], [], []
        for xi, yi, zi in zip(x_rail, y_rail, z_heights):
            stem_x.extend([xi, xi, None])
            stem_y.extend([yi, yi, None])
            stem_z.extend([0.0, zi, None])

        # Filamentos de acoplamiento temporal -> frecuencial (mapean n hacia e^{j * w0 * n})
        ray_x, ray_y, ray_z = [], [], []
        z_unit_w0 = SignalMathematics.magnitude_surface(
            np.exp(1j * omega_0 * n), a, omega_0, self.cfg.mag_cap
        )
        for idx in range(0, self.cfg.n_samples, 2):
            target_ang = -omega_0 * n[idx]
            tx = np.cos(target_ang)
            ty = np.sin(target_ang)
            tz = z_unit_w0[idx] * 0.45
            ray_x.extend([x_rail[idx], tx, None])
            ray_y.extend([y_rail[idx], ty, None])
            ray_z.extend([z_heights[idx], tz, None])

        bridge_traces = [
            # Riel base del eje de tiempo discreto n
            go.Scatter3d(
                x=[x_rail[0] - 0.15, x_rail[-1] + 0.15],
                y=[-2.05, -2.05],
                z=[0.0, 0.0],
                mode="lines",
                line=dict(color="#94A3B8", width=5),
                name="Eje Temporal Discreto n",
                showlegend=False,
                hoverinfo="skip",
            ),
            # Tallos verticales de cada muestra x[n]
            go.Scatter3d(
                x=stem_x,
                y=stem_y,
                z=stem_z,
                mode="lines",
                line=dict(color="#F72585", width=5),
                name="Tallos Discretos x[n]",
                showlegend=False,
                hoverinfo="skip",
            ),
            # Esferas luminosas en la cresta de cada muestra x[n]
            go.Scatter3d(
                x=x_rail,
                y=y_rail,
                z=z_heights,
                mode="markers",
                marker=dict(
                    size=6,
                    color=x_n,
                    colorscale="RdBu",
                    cmin=-1.0,
                    cmax=1.0,
                    line=dict(color="#FFFFFF", width=1.5),
                ),
                customdata=np.column_stack((n, x_n)),
                name="Señal x[n] = aⁿ cos(ω₀n)",
                hovertemplate=(
                    "<b>Señal Discreta Temporal</b><br>"
                    "Muestra n = %{customdata[0]:.0f}<br>"
                    "<b>x[n] = %{customdata[1]:.4f}</b><extra></extra>"
                ),
            ),
            # Filamentos de proyección hacia el dominio Z (suma ponderada por z^{-n})
            go.Scatter3d(
                x=ray_x,
                y=ray_y,
                z=ray_z,
                mode="lines",
                line=dict(color="rgba(247, 37, 133, 0.28)", width=2, dash="dot"),
                name="Acoplamiento x[n]·z⁻ⁿ → X(z)",
                hoverinfo="skip",
            ),
        ]
        return bridge_traces


# ======================================================================================
# 4. ORQUESTADOR DE EXPERIENCIA VISUAL Y CÁMARA INTERACTIVA
# ======================================================================================
class ZTransformVisualizer:
    """Ensambla la escena 3D completa, iluminación, controles de usuario y deslizador."""

    def __init__(self, config: ZTransformConfig = ZTransformConfig()):
        self.cfg = config
        self.builder = SceneGeometryBuilder(config)

    def _assemble_traces_for_a(self, a_val: float) -> List:
        """Genera la lista ordenada de trazas 3D para un valor específico del parámetro 'a'."""
        roc_traces = self.builder.build_roc_zones(a_val)
        mag_surf, grav_surf, cones, singularities = (
            self.builder.build_spectral_and_gravity_surfaces(a_val)
        )
        unit_traces, cyl_surfs, cyl_curves = (
            self.builder.build_unit_circle_and_cylinders(a_val)
        )
        signal_bridge = self.builder.build_discrete_signal_bridge(a_val)

        return (
            roc_traces
            + [mag_surf, grav_surf, cones]
            + singularities
            + unit_traces
            + cyl_surfs
            + cyl_curves
            + signal_bridge
        )

    def create_figure(self) -> go.Figure:
        """Construye la figura interactiva con controles de cámara, modos y parámetro 'a'."""
        fig = go.Figure()

        # 1. Plataforma base fija (independiente de 'a')
        base_platform = self.builder.build_complex_plane_platform()
        for tr in base_platform:
            fig.add_trace(tr)
        n_base = len(base_platform)

        # 2. Trazas dinámicas para el valor inicial a_default
        initial_dynamic = self._assemble_traces_for_a(self.cfg.a_default)
        for tr in initial_dynamic:
            fig.add_trace(tr)

        # 3. Construcción de Frames para explorar cómo el radio de los polos 'a'
        # afecta la estabilidad, los pozos gravitacionales y la DTFT en tiempo real
        a_values = [0.55, 0.78, 0.92, 1.06]
        frames = []
        slider_steps = []

        for a_step in a_values:
            step_traces = base_platform + self._assemble_traces_for_a(a_step)
            stability_label = (
                "ESTABLE (ROC incluye |z|=1)"
                if a_step < 1.0
                else "INESTABLE (Polos fuera de |z|=1)"
            )
            frame_name = f"a_{a_step:.2f}"
            frames.append(go.Frame(data=step_traces, name=frame_name))

            slider_steps.append(
                dict(
                    method="animate",
                    args=[
                        [frame_name],
                        dict(
                            mode="immediate",
                            frame=dict(duration=350, redraw=True),
                            transition=dict(duration=200),
                        ),
                    ],
                    label=f"a = {a_step:.2f} ({'Estable' if a_step < 1 else 'Inestable'})",
                )
            )

        fig.frames = frames

        # 4. Configuración estética espacial, iluminación y controles de cámara
        fig.update_layout(
            title=dict(
                text=(
                    "<b>Geometría 3D de la Transformada Z y Extensión de Fourier</b><br>"
                    "<span style='font-size:13px; color:#94A3B8;'>"
                    "x[n] = aⁿ cos(ω₀n)u[n]  |  Polos (Pozos Gravitacionales): p₁,₂ = a·e^{±jω₀}  "
                    "|  Ceros (Fuentes de Repulsión): z₁ = 0, z₂ = a·cos(ω₀)</span>"
                ),
                x=0.03,
                y=0.96,
                font=dict(color="#F8FAFC", size=20, family="Segoe UI, Roboto, sans-serif"),
            ),
            paper_bgcolor="#070B19",
            plot_bgcolor="#070B19",
            font=dict(color="#E2E8F0", family="Segoe UI, Roboto, sans-serif"),
            margin=dict(l=0, r=0, t=75, b=0),
            legend=dict(
                x=0.01,
                y=0.86,
                bgcolor="rgba(15, 23, 42, 0.78)",
                bordercolor="rgba(148, 163, 184, 0.25)",
                borderwidth=1,
                font=dict(size=11, color="#E2E8F0"),
            ),
            scene=dict(
                bgcolor="#070B19",
                xaxis=dict(
                    title="Re(z) — Parte Real [σ]",
                    range=[-1.85, 1.85],
                    gridcolor="rgba(148, 163, 184, 0.12)",
                    zerolinecolor="rgba(255, 255, 255, 0.3)",
                    showbackground=False,
                ),
                yaxis=dict(
                    title="Im(z) — Parte Imaginaria [jΩ]",
                    range=[-2.30, 1.85],
                    gridcolor="rgba(148, 163, 184, 0.12)",
                    zerolinecolor="rgba(255, 255, 255, 0.3)",
                    showbackground=False,
                ),
                zaxis=dict(
                    title="Pozos Φ(z)  ◀──  Plano Z=0  ──▶  Magnitud |X(z)|",
                    range=[self.cfg.well_depth, self.cfg.mag_cap + 0.3],
                    gridcolor="rgba(148, 163, 184, 0.12)",
                    zerolinecolor="rgba(0, 245, 212, 0.4)",
                    showbackground=False,
                ),
                aspectmode="manual",
                aspectratio=dict(x=1.25, y=1.35, z=1.05),
                camera=dict(
                    eye=dict(x=1.65, y=-1.85, z=1.15),
                    center=dict(x=0.0, y=-0.1, z=-0.05),
                    up=dict(x=0, y=0, z=1),
                ),
            ),
            # Botones interactivos de coreografía de cámara
            updatemenus=[
                dict(
                    type="buttons",
                    direction="right",
                    x=0.01,
                    y=0.08,
                    bgcolor="rgba(15, 23, 42, 0.85)",
                    bordercolor="rgba(56, 189, 248, 0.4)",
                    font=dict(color="#F8FAFC", size=11),
                    buttons=[
                        dict(
                            label="Perspectiva Orbital",
                            method="relayout",
                            args=[
                                {
                                    "scene.camera": dict(
                                        eye=dict(x=1.65, y=-1.85, z=1.15),
                                        center=dict(x=0, y=-0.1, z=-0.05),
                                    )
                                }
                            ],
                        ),
                        dict(
                            label="Vista Subterránea (Pozos Gravitacionales)",
                            method="relayout",
                            args=[
                                {
                                    "scene.camera": dict(
                                        eye=dict(x=1.45, y=1.45, z=-0.95),
                                        center=dict(x=0, y=0, z=-0.4),
                                    )
                                }
                            ],
                        ),
                        dict(
                            label="Mapa Cenital (Polos, Ceros y ROC)",
                            method="relayout",
                            args=[
                                {
                                    "scene.camera": dict(
                                        eye=dict(x=0.01, y=-0.01, z=2.55),
                                        center=dict(x=0, y=0, z=0),
                                    )
                                }
                            ],
                        ),
                        dict(
                            label="Enfoque Pasarela x[n] → DTFT",
                            method="relayout",
                            args=[
                                {
                                    "scene.camera": dict(
                                        eye=dict(x=0.0, y=-2.55, z=0.65),
                                        center=dict(x=0, y=-0.3, z=0.1),
                                    )
                                }
                            ],
                        ),
                    ],
                )
            ],
            # Deslizador inferior para variar el radio 'a' de los polos en vivo
            sliders=[
                dict(
                    active=1,
                    yanchor="top",
                    xanchor="left",
                    currentvalue=dict(
                        font=dict(size=13, color="#38BDF8"),
                        prefix="Dinámica Radial de Polos: ",
                        visible=True,
                        xanchor="left",
                    ),
                    transition=dict(duration=250),
                    pad=dict(b=10, t=10),
                    len=0.55,
                    x=0.40,
                    y=0.09,
                    bgcolor="rgba(15, 23, 42, 0.8)",
                    bordercolor="rgba(56, 189, 248, 0.3)",
                    font=dict(color="#CBD5E1", size=11),
                    steps=slider_steps,
                )
            ],
        )

        return fig


# ======================================================================================
# 5. PUNTO DE ENTRADA DE EJECUCIÓN
# ======================================================================================
def main(output_html: str = "transformada_z_experiencia_3d.html", auto_open: bool = False) -> str:
    print("Construyendo topología 3D de la Transformada Z...")
    visualizer = ZTransformVisualizer()
    fig = visualizer.create_figure()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    target_path = os.path.join(script_dir, output_html)
    
    fig.write_html(target_path, include_plotlyjs="cdn", full_html=True)
    print(f"Escena exportada exitosamente en '{target_path}'.")
    if auto_open:
        fig.show()
    return target_path


if __name__ == "__main__":
    import sys
    auto_open = "--show" in sys.argv
    main(auto_open=auto_open)
