"""
Escenas Oficiales de Manim Community Edition (Manim CE)
Asignatura: MEC36 - Control II (Sistemas de Control en Tiempo Discreto)
Tema: Ecuaciones en Diferencias, Transformada Z, Evolución Temporal y Estabilidad
Institución Universitaria de Barranquilla (IUB)

Uso directo con Manim CLI:
    manim -pqm scenes/manim/manim_scenes.py Scene01AlgebraicDevelopment
    manim -pqm scenes/manim/manim_scenes.py Scene02ZTransformShift
    manim -pqm scenes/manim/manim_scenes.py Scene03TimeEvolution
    manim -pqm scenes/manim/manim_scenes.py Scene04StabilityZPlane

O mediante el script de integración automatizado:
    python scenes/manim/render_manim_videos.py
"""

from manim import *
import numpy as np

# =============================================================================
# PALETA OFICIAL INSTITUCIONAL IUB (config/framework_iub/beamerthemeiub.sty)
# =============================================================================
IUB_OSCURO = "#121023"
IUB_PANEL = "#1A1732"
IUB_BORDE = "#2F2A54"
IUB_AMARILLO = "#FFDF2D"
IUB_AZUL = "#00ADE7"
IUB_NARANJA = "#E39037"
IUB_VERDE = "#3B9C6D"
IUB_BLANCO = "#FFFFFF"
IUB_GRIS = "#CBD5E1"
IUB_CORAL = "#F87171"


def build_iub_header(title_str: str, subtitle_str: str) -> VGroup:
    """Construye el encabezado institucional IUB sin superposición."""
    banner = Rectangle(
        width=14.2,
        height=1.05,
        fill_color=IUB_PANEL,
        fill_opacity=0.96,
        stroke_color=IUB_AMARILLO,
        stroke_width=2,
    ).to_edge(UP, buff=0.0)

    badge = RoundedRectangle(
        corner_radius=0.08,
        width=1.45,
        height=0.58,
        fill_color=IUB_AMARILLO,
        fill_opacity=1.0,
        stroke_width=0,
    ).move_to(banner.get_left() + RIGHT * 1.0)
    badge_txt = Text("IUB · MEC36", font="Consolas", weight=BOLD, font_size=16, color=IUB_OSCURO).move_to(badge)

    title = Text(title_str, font="Arial", weight=BOLD, font_size=23, color=IUB_AMARILLO)
    subtitle = Text(subtitle_str, font="Arial", font_size=15, color=IUB_AZUL)
    text_group = VGroup(title, subtitle).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
    text_group.next_to(badge, RIGHT, buff=0.35)

    return VGroup(banner, badge, badge_txt, text_group)


def build_equation_card(
    lines: list[tuple[str, str]],
    badge_label: str = "ECUACIÓN",
    border_color: str = IUB_AZUL,
    width: float = 12.4,
    font_size: int = 24,
) -> VGroup:
    """Crea una tarjeta de ecuación matemática con etiqueta superior estilo Beamer IUB."""
    text_objs = VGroup(
        *[Text(txt, font="Consolas", weight=BOLD, font_size=font_size, color=col) for txt, col in lines]
    ).arrange(DOWN, buff=0.18)

    height = max(1.05, text_objs.height + 0.55)
    box = RoundedRectangle(
        corner_radius=0.14,
        width=width,
        height=height,
        fill_color=IUB_PANEL,
        fill_opacity=0.95,
        stroke_color=border_color,
        stroke_width=2.5,
    )
    text_objs.move_to(box.get_center() + DOWN * 0.04)

    tag_bg = RoundedRectangle(
        corner_radius=0.06,
        width=max(1.8, len(badge_label) * 0.14 + 0.4),
        height=0.32,
        fill_color=border_color,
        fill_opacity=1.0,
        stroke_width=0,
    ).move_to(box.get_top() + LEFT * (width / 2 - 1.35))
    tag_txt = Text(badge_label, font="Arial", weight=BOLD, font_size=12, color=IUB_OSCURO).move_to(tag_bg)

    return VGroup(box, text_objs, tag_bg, tag_txt)


# =============================================================================
# ESCENA 1: DESARROLLO ALGEBRAICO Y ARQUITECTURA DE MEMORIA RECURSIVA
# =============================================================================
class Scene01AlgebraicDevelopment(Scene):
    def construct(self):
        self.camera.background_color = IUB_OSCURO
        header = build_iub_header(
            "Escena 1: Desarrollo Algebraico de Ecuaciones en Diferencias",
            "Del Lazo de Control Digital al Algoritmo Recursivo en el Microcontrolador",
        )
        self.add(header)

        # Paso 1: Bloques del lazo digital
        step_title = Text(
            "1. El procesador opera en instantes discretos t = k·T",
            font="Arial",
            weight=BOLD,
            font_size=20,
            color=IUB_BLANCO,
        ).next_to(header, DOWN, buff=0.32).to_edge(LEFT, buff=0.6)

        b_adc = RoundedRectangle(corner_radius=0.1, width=2.8, height=0.9, fill_color=IUB_PANEL, fill_opacity=1, stroke_color=IUB_AZUL, stroke_width=2)
        t_adc = VGroup(
            Text("Muestreador ADC", font="Arial", weight=BOLD, font_size=15, color=IUB_AZUL),
            Text("y(t) → y[k]", font="Consolas", font_size=14, color=IUB_BLANCO),
        ).arrange(DOWN, buff=0.08).move_to(b_adc)

        b_mcu = RoundedRectangle(corner_radius=0.1, width=4.3, height=0.9, fill_color=IUB_PANEL, fill_opacity=1, stroke_color=IUB_AMARILLO, stroke_width=2.5)
        t_mcu = VGroup(
            Text("CPU / Ecuación en Diferencias", font="Arial", weight=BOLD, font_size=15, color=IUB_AMARILLO),
            Text("Combina y[k-i] y u[k-j]", font="Consolas", font_size=14, color=IUB_BLANCO),
        ).arrange(DOWN, buff=0.08).move_to(b_mcu)

        b_zoh = RoundedRectangle(corner_radius=0.1, width=2.8, height=0.9, fill_color=IUB_PANEL, fill_opacity=1, stroke_color=IUB_VERDE, stroke_width=2)
        t_zoh = VGroup(
            Text("DAC + Retenedor ZOH", font="Arial", weight=BOLD, font_size=15, color=IUB_VERDE),
            Text("u[k] → u_h(t)", font="Consolas", font_size=14, color=IUB_BLANCO),
        ).arrange(DOWN, buff=0.08).move_to(b_zoh)

        loop_group = VGroup(
            VGroup(b_adc, t_adc),
            VGroup(b_mcu, t_mcu),
            VGroup(b_zoh, t_zoh),
        ).arrange(RIGHT, buff=0.9).move_to(UP * 1.15)

        arr1 = Arrow(b_adc.get_right(), b_mcu.get_left(), buff=0.1, color=IUB_AZUL, stroke_width=3)
        arr2 = Arrow(b_mcu.get_right(), b_zoh.get_left(), buff=0.1, color=IUB_AMARILLO, stroke_width=3)

        self.play(FadeIn(step_title, shift=RIGHT * 0.2), run_time=0.6)
        self.play(LaggedStart(FadeIn(loop_group[0]), GrowArrow(arr1), FadeIn(loop_group[1]), GrowArrow(arr2), FadeIn(loop_group[2]), lag_ratio=0.2), run_time=1.4)
        self.wait(0.8)

        # Paso 2: Forma implícita general de orden n=2
        card_implicit = build_equation_card(
            [
                ("Forma Implícita de Atraso (Orden n = 2):", IUB_GRIS),
                ("y[k] + a₁·y[k-1] + a₂·y[k-2] = b₀·u[k] + b₁·u[k-1]", IUB_BLANCO),
            ],
            badge_label="MODELO LTI",
            border_color=IUB_AZUL,
            width=12.4,
            font_size=22,
        ).move_to(DOWN * 0.45)

        self.play(FadeIn(card_implicit, shift=UP * 0.25), run_time=1.0)
        self.wait(1.0)

        # Paso 3: Despeje algebraico hacia la forma explícita recursiva
        card_explicit = build_equation_card(
            [
                ("Despeje Algebraico → Algoritmo Recursivo Ejecutable:", IUB_AMARILLO),
                ("y[k] = -a₁·y[k-1] - a₂·y[k-2] + b₀·u[k] + b₁·u[k-1]", IUB_VERDE),
            ],
            badge_label="ALGORITMO MCU",
            border_color=IUB_AMARILLO,
            width=12.4,
            font_size=22,
        ).move_to(DOWN * 2.25)

        self.play(TransformFromCopy(card_implicit, card_explicit), run_time=1.2)
        self.wait(1.0)

        # Paso 4: Desplazamiento de buffers de memoria
        self.play(FadeOut(loop_group), FadeOut(arr1), FadeOut(arr2), FadeOut(card_implicit), run_time=0.7)
        self.play(card_explicit.animate.move_to(UP * 1.1), run_time=0.7)

        mem_title = Text(
            "2. Actualización de Registros de Memoria al finalizar cada periodo T:",
            font="Arial",
            weight=BOLD,
            font_size=19,
            color=IUB_NARANJA,
        ).move_to(DOWN * 0.25)

        reg_yk = RoundedRectangle(corner_radius=0.1, width=3.1, height=1.1, fill_color=IUB_PANEL, fill_opacity=1, stroke_color=IUB_AMARILLO, stroke_width=2.5)
        reg_yk1 = RoundedRectangle(corner_radius=0.1, width=3.1, height=1.1, fill_color=IUB_PANEL, fill_opacity=1, stroke_color=IUB_AZUL, stroke_width=2.5)
        reg_yk2 = RoundedRectangle(corner_radius=0.1, width=3.1, height=1.1, fill_color=IUB_PANEL, fill_opacity=1, stroke_color=IUB_NARANJA, stroke_width=2.5)

        regs = VGroup(reg_yk, reg_yk1, reg_yk2).arrange(RIGHT, buff=1.1).move_to(DOWN * 1.65)
        lbl_yk = VGroup(Text("Salida Actual", font="Arial", font_size=13, color=IUB_GRIS), Text("y[k]", font="Consolas", weight=BOLD, font_size=24, color=IUB_AMARILLO)).arrange(DOWN, buff=0.08).move_to(reg_yk)
        lbl_yk1 = VGroup(Text("Retardo z⁻¹", font="Arial", font_size=13, color=IUB_GRIS), Text("y[k-1]", font="Consolas", weight=BOLD, font_size=24, color=IUB_AZUL)).arrange(DOWN, buff=0.08).move_to(reg_yk1)
        lbl_yk2 = VGroup(Text("Retardo z⁻²", font="Arial", font_size=13, color=IUB_GRIS), Text("y[k-2]", font="Consolas", weight=BOLD, font_size=24, color=IUB_NARANJA)).arrange(DOWN, buff=0.08).move_to(reg_yk2)

        shift1 = Arrow(reg_yk.get_right(), reg_yk1.get_left(), buff=0.12, color=IUB_AMARILLO, stroke_width=3)
        shift2 = Arrow(reg_yk1.get_right(), reg_yk2.get_left(), buff=0.12, color=IUB_AZUL, stroke_width=3)
        shift_txt1 = Text("z⁻¹", font="Consolas", weight=BOLD, font_size=15, color=IUB_AMARILLO).next_to(shift1, UP, buff=0.08)
        shift_txt2 = Text("z⁻¹", font="Consolas", weight=BOLD, font_size=15, color=IUB_AZUL).next_to(shift2, UP, buff=0.08)

        self.play(FadeIn(mem_title), FadeIn(regs), FadeIn(lbl_yk), FadeIn(lbl_yk1), FadeIn(lbl_yk2), run_time=0.9)
        self.play(GrowArrow(shift1), FadeIn(shift_txt1), GrowArrow(shift2), FadeIn(shift_txt2), run_time=0.9)
        self.wait(1.8)


# =============================================================================
# ESCENA 2: TRANSFORMACIÓN AL DOMINIO Z CON CONDICIONES INICIALES
# =============================================================================
class Scene02ZTransformShift(Scene):
    def construct(self):
        self.camera.background_color = IUB_OSCURO
        header = build_iub_header(
            "Escena 2: Transformación al Dominio Z y Condiciones Iniciales",
            "Caso Servomecanismo: y[k] - 1.3·y[k-1] + 0.4·y[k-2] = u[k],  y[-1]=2, y[-2]=1",
        )
        self.add(header)

        # Tarjeta 1: Teorema de traslación temporal hacia atrás
        card_shift = build_equation_card(
            [
                ("Z{ y[k-1] } = z⁻¹·Y(z) + y[-1]", IUB_AZUL),
                ("Z{ y[k-2] } = z⁻²·Y(z) + z⁻¹·y[-1] + y[-2]", IUB_NARANJA),
            ],
            badge_label="TEOREMA DE RETARDO",
            border_color=IUB_AZUL,
            width=12.6,
            font_size=21,
        ).move_to(UP * 1.45)

        # Tarjeta 2: Sustitución algebraica en la ecuación del servomecanismo
        card_sub = build_equation_card(
            [
                ("Sustituyendo y[-1] = 2, y[-2] = 1:", IUB_GRIS),
                ("(1 - 1.3·z⁻¹ + 0.4·z⁻²)·Y(z) - (2.2 - 0.8·z⁻¹) = U(z)", IUB_BLANCO),
            ],
            badge_label="AGRUPACIÓN EN Z",
            border_color=IUB_AMARILLO,
            width=12.6,
            font_size=21,
        ).move_to(DOWN * 0.25)

        # Tarjeta 3: Desacoplamiento Libre vs. Forzada
        card_decomp = build_equation_card(
            [
                ("Y(z) = [ (2.2·z² - 0.8·z) / A(z) ]  +  [ z²·U(z) / A(z) ]", IUB_AMARILLO),
                ("y[k] = 10.0  -  7.4667·(0.8)^k  +  0.6667·(0.5)^k   (k ≥ 0)", IUB_VERDE),
            ],
            badge_label="LIBRE + FORZADA → SOLUCIÓN CERRADA",
            border_color=IUB_VERDE,
            width=12.6,
            font_size=20,
        ).move_to(DOWN * 2.05)

        self.play(FadeIn(card_shift, shift=DOWN * 0.2), run_time=1.0)
        self.wait(0.9)
        self.play(FadeIn(card_sub, shift=UP * 0.2), run_time=1.1)
        self.wait(1.0)
        self.play(FadeIn(card_decomp, shift=UP * 0.2), run_time=1.2)
        self.wait(2.0)


# =============================================================================
# ESCENA 3: EVOLUCIÓN TEMPORAL MUESTRA A MUESTRA (LIBRE, FORZADA Y TOTAL)
# =============================================================================
class Scene03TimeEvolution(Scene):
    def construct(self):
        self.camera.background_color = IUB_OSCURO
        header = build_iub_header(
            "Escena 3: Evolución Temporal de Secuencias Discretas y[k]",
            "Superposición de Respuesta Libre y_libre[k] + Respuesta Forzada y_forzada[k]",
        )
        self.add(header)

        axes = Axes(
            x_range=[0, 12, 1],
            y_range=[0, 11.5, 2],
            x_length=7.8,
            y_length=4.5,
            axis_config={"color": IUB_GRIS, "include_tip": True, "tip_width": 0.18, "tip_height": 0.18},
        ).move_to(LEFT * 2.15 + DOWN * 0.6)

        x_lbl = Text("Instante discreto k", font="Arial", weight=BOLD, font_size=15, color=IUB_BLANCO).next_to(axes.x_axis, DOWN, buff=0.32)
        y_lbl = Text("Amplitud y[k]", font="Arial", weight=BOLD, font_size=15, color=IUB_BLANCO).next_to(axes.y_axis, UP, buff=0.15)

        # Etiquetas numéricas de ejes sin colisión
        x_nums = VGroup(*[
            Text(str(k), font="Consolas", font_size=13, color=IUB_GRIS).next_to(axes.c2p(k, 0), DOWN, buff=0.12)
            for k in range(0, 13, 2)
        ])
        y_nums = VGroup(*[
            Text(str(val), font="Consolas", font_size=13, color=IUB_GRIS).next_to(axes.c2p(0, val), LEFT, buff=0.14)
            for val in range(0, 12, 2)
        ])

        # Línea asintótica y_ss = 10.0
        asym_line = DashedLine(axes.c2p(0, 10.0), axes.c2p(11.5, 10.0), color=IUB_VERDE, dash_length=0.12, stroke_width=2)
        asym_txt = Text("Régimen Permanente y(∞) = 10.0", font="Consolas", weight=BOLD, font_size=13, color=IUB_VERDE).next_to(asym_line, UP, buff=0.08).align_to(asym_line, LEFT).shift(RIGHT * 1.2)

        # Panel de leyenda lateral derecha (fuera del área de trazado)
        legend_box = RoundedRectangle(
            corner_radius=0.12, width=3.55, height=3.9, fill_color=IUB_PANEL, fill_opacity=0.95, stroke_color=IUB_AMARILLO, stroke_width=1.8
        ).move_to(RIGHT * 4.85 + DOWN * 0.55)

        leg_items = VGroup(
            Text("LEYENDA Y TELEMETRÍA", font="Arial", weight=BOLD, font_size=14, color=IUB_AMARILLO),
            Text("● y_total[k] (Amarillo)", font="Consolas", weight=BOLD, font_size=13, color=IUB_AMARILLO),
            Text("● y_forzada[k] (Azul)", font="Consolas", font_size=13, color=IUB_AZUL),
            Text("● y_libre[k] (Naranja)", font="Consolas", font_size=13, color=IUB_NARANJA),
            Text("y[0] = 3.2000", font="Consolas", font_size=13, color=IUB_BLANCO),
            Text("y[1] = 4.3600", font="Consolas", font_size=13, color=IUB_BLANCO),
            Text("y[2] = 5.2680", font="Consolas", font_size=13, color=IUB_BLANCO),
            Text("y[11] = 9.3590", font="Consolas", font_size=13, color=IUB_VERDE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).move_to(legend_box)

        self.play(Create(axes), FadeIn(x_lbl), FadeIn(y_lbl), FadeIn(x_nums), FadeIn(y_nums), FadeIn(legend_box), FadeIn(leg_items), run_time=1.0)
        self.play(Create(asym_line), FadeIn(asym_txt), run_time=0.6)

        # Cálculo exacto de las secuencias para k = 0..11
        k_vals = np.arange(0, 12)
        # Respuesta libre: Y_libre(z)/z = (2.2z - 0.8)/((z-0.8)(z-0.5)) => A_lib=3.2, B_lib=-1.0
        y_libre = 3.2 * (0.8 ** k_vals) - 1.0 * (0.5 ** k_vals)
        # Respuesta forzada: Y_forz(z)/z = z^2 / ((z-1)(z-0.8)(z-0.5)) => A=10, B=-32/3, C=5/3
        y_forzada = 10.0 - (32.0 / 3.0) * (0.8 ** k_vals) + (5.0 / 3.0) * (0.5 ** k_vals)
        y_total = y_libre + y_forzada

        # Curvas envolventes suaves
        pts_libre = [axes.c2p(k, y_libre[k]) for k in k_vals]
        pts_forz = [axes.c2p(k, y_forzada[k]) for k in k_vals]
        pts_tot = [axes.c2p(k, y_total[k]) for k in k_vals]

        line_libre = VMobject(color=IUB_NARANJA, stroke_width=2.5).set_points_smoothly(pts_libre)
        line_forz = VMobject(color=IUB_AZUL, stroke_width=2.5).set_points_smoothly(pts_forz)

        stems_total = VGroup()
        for k in k_vals:
            base = axes.c2p(k, 0)
            top = axes.c2p(k, y_total[k])
            stem = Line(base, top, color=IUB_AMARILLO, stroke_width=3.2)
            dot = Dot(top, radius=0.075, color=IUB_AMARILLO)
            stems_total.add(VGroup(stem, dot))

        self.play(Create(line_libre), Create(line_forz), run_time=1.2)
        self.play(LaggedStart(*[FadeIn(s, shift=UP * 0.15) for s in stems_total], lag_ratio=0.12), run_time=2.2)
        self.wait(1.8)


# =============================================================================
# ESCENA 4: ESTABILIDAD EN EL PLANO Z Y CRITERIO DE JURY
# =============================================================================
class Scene04StabilityZPlane(Scene):
    def construct(self):
        self.camera.background_color = IUB_OSCURO
        header = build_iub_header(
            "Escena 4: Estabilidad en el Plano Z y Criterio de Jury",
            "Círculo Unitario |z| = 1, Ubicación de Polos y Régimen Transitorio",
        )
        self.add(header)

        # Panel izquierdo: Plano Z
        z_plane = Axes(
            x_range=[-1.4, 1.4, 0.5],
            y_range=[-1.4, 1.4, 0.5],
            x_length=4.8,
            y_length=4.8,
            axis_config={"color": IUB_GRIS, "include_tip": True, "tip_width": 0.15, "tip_height": 0.15},
        ).move_to(LEFT * 3.6 + DOWN * 0.55)

        re_lbl = Text("Re(z)", font="Consolas", weight=BOLD, font_size=14, color=IUB_BLANCO).next_to(z_plane.x_axis, RIGHT, buff=0.1)
        im_lbl = Text("Im(z)", font="Consolas", weight=BOLD, font_size=14, color=IUB_BLANCO).next_to(z_plane.y_axis, UP, buff=0.1)

        radius = np.linalg.norm(z_plane.c2p(1, 0) - z_plane.c2p(0, 0))
        unit_disk = Circle(radius=radius, stroke_color=IUB_AMARILLO, stroke_width=3, fill_color=IUB_VERDE, fill_opacity=0.16).move_to(z_plane.c2p(0, 0))
        uc_lbl = Text("|z| = 1 (Frontera BIBO)", font="Consolas", weight=BOLD, font_size=13, color=IUB_AMARILLO).next_to(unit_disk, DOWN, buff=0.18)

        # Panel derecho: Respuesta temporal asociada
        t_axes = Axes(
            x_range=[0, 14, 2],
            y_range=[-1.4, 1.4, 0.5],
            x_length=5.8,
            y_length=3.7,
            axis_config={"color": IUB_GRIS, "include_tip": True, "tip_width": 0.15, "tip_height": 0.15},
        ).move_to(RIGHT * 3.1 + DOWN * 0.9)
        tk_lbl = Text("Muestra discreta k", font="Consolas", weight=BOLD, font_size=14, color=IUB_BLANCO).next_to(t_axes, DOWN, buff=0.18)
        ty_lbl = Text("Modo p^k", font="Consolas", weight=BOLD, font_size=14, color=IUB_BLANCO).next_to(t_axes.y_axis.get_top(), RIGHT, buff=0.18)

        status_banner = RoundedRectangle(
            corner_radius=0.1, width=6.1, height=0.58, fill_color=IUB_PANEL, fill_opacity=0.95, stroke_color=IUB_AZUL, stroke_width=2
        ).move_to(RIGHT * 3.1 + UP * 1.75)

        self.play(Create(z_plane), FadeIn(re_lbl), FadeIn(im_lbl), Create(unit_disk), FadeIn(uc_lbl), Create(t_axes), FadeIn(tk_lbl), FadeIn(ty_lbl), FadeIn(status_banner), run_time=1.1)

        regimes = [
            ("1. Complejos Estables: p = 0.78·e^(±j45°) → |p| < 1", 0.78 * np.cos(np.pi / 4), 0.78 * np.sin(np.pi / 4), IUB_VERDE, lambda k: (0.78 ** k) * np.cos(k * np.pi / 4)),
            ("2. Real Negativo Estable: p = -0.75 → Alternante", -0.75, 0.0, IUB_AZUL, lambda k: (-0.75) ** k),
            ("3. Inestable (Fuera de |z|=1): |p| = 1.08 > 1", 1.08 * np.cos(np.pi / 5), 1.08 * np.sin(np.pi / 5), IUB_CORAL, lambda k: np.clip((1.08 ** k) * np.cos(k * np.pi / 5), -1.35, 1.35)),
        ]

        prev_group = None
        for label_str, pr, pi, col, fn in regimes:
            st_txt = Text(label_str, font="Consolas", weight=BOLD, font_size=14, color=col).move_to(status_banner)
            p1_mark = Text("×", font="Arial", weight=BOLD, font_size=28, color=col).move_to(z_plane.c2p(pr, pi))
            p2_mark = Text("×", font="Arial", weight=BOLD, font_size=28, color=col).move_to(z_plane.c2p(pr, -pi))

            k_arr = np.arange(0, 15)
            vals = [fn(k) for k in k_arr]
            stems = VGroup()
            for k, v in zip(k_arr, vals):
                b = t_axes.c2p(k, 0)
                t = t_axes.c2p(k, v)
                stems.add(VGroup(Line(b, t, color=col, stroke_width=3), Dot(t, radius=0.065, color=col)))

            cur_group = VGroup(st_txt, p1_mark, p2_mark, stems)
            if prev_group is None:
                self.play(FadeIn(cur_group), run_time=0.9)
            else:
                self.play(ReplacementTransform(prev_group, cur_group), run_time=1.0)
            self.wait(1.1)
            prev_group = cur_group

        self.wait(1.2)
