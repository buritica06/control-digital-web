"""
Generador Científico 3D de Muestreo, Cuantificación y Retenedor ZOH (Semana 1)
Módulo: MEC36 - Control II | Universidad de Barranquilla (IUB)
Genera 'muestreo_cuantizacion_3d.html' interactivo mediante Plotly WebGL.
"""

import os
import numpy as np
import plotly.graph_objects as go

def generar_escena_3d_semana01(
    bits=12,
    fs=40.0,
    f_sig=2.0,
    v_min=0.0,
    v_max=10.0,
    duracion=1.0,
    output_path="generacion/web_semana01/muestreo_cuantizacion_3d.html"
):
    import sys
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    print(">>> Generando escena 3D cientifica con Plotly WebGL...")
    
    # 1. Base continua
    t_cont = np.linspace(0, duracion, 800)
    x_cont = 5.0 + 3.8 * np.sin(2 * np.pi * f_sig * t_cont)
    
    # 2. Muestreo discreto
    T = 1.0 / fs
    t_muestras = np.arange(0, duracion, T)
    x_muestras = 5.0 + 3.8 * np.sin(2 * np.pi * f_sig * t_muestras)
    
    # 3. Cuantificación
    niveles = 2 ** bits
    q = (v_max - v_min) / niveles
    codigos = np.clip(np.round((x_muestras - v_min) / q), 0, niveles - 1).astype(int)
    x_cuant = v_min + codigos * q
    
    fig = go.Figure()

    # TRAZA 1: Señal Continua x(t) en Z = 0
    fig.add_trace(go.Scatter3d(
        x=t_cont,
        y=x_cont,
        z=np.zeros_like(t_cont),
        mode='lines',
        name='Señal Continua x(t)',
        line=dict(color='#00F5D4', width=7),
        hovertemplate='<b>t:</b> %{x:.3f} s<br><b>x(t):</b> %{y:.3f} V<extra></extra>'
    ))

    # TRAZA 2: Muestras Discretas x(kT)
    fig.add_trace(go.Scatter3d(
        x=t_muestras,
        y=x_muestras,
        z=np.zeros_like(t_muestras),
        mode='markers',
        name='Muestras x(kT)',
        marker=dict(size=5, color='#10B981', symbol='circle'),
        hovertemplate='<b>k:</b> Instante %{x:.3f} s<br><b>Muestra:</b> %{y:.3f} V<extra></extra>'
    ))

    # TRAZA 3: Varillas verticales de muestreo (Impulse Sampling)
    for tk, yk in zip(t_muestras, x_muestras):
        fig.add_trace(go.Scatter3d(
            x=[tk, tk],
            y=[0, yk],
            z=[0, 0],
            mode='lines',
            showlegend=False,
            line=dict(color='rgba(16, 185, 129, 0.4)', width=2),
            hoverinfo='none'
        ))

    # TRAZA 4: Reconstrucción ZOH (Escalera tridimensional en Z = 0.5)
    t_zoh = []
    y_zoh = []
    z_zoh = []
    for i in range(len(t_muestras)):
        tk = t_muestras[i]
        tk_next = tk + T
        val = x_cuant[i]
        t_zoh.extend([tk, tk_next])
        y_zoh.extend([val, val])
        z_zoh.extend([0.5, 0.5])

    fig.add_trace(go.Scatter3d(
        x=t_zoh,
        y=y_zoh,
        z=z_zoh,
        mode='lines',
        name='Retenedor ZOH u_zoh(t)',
        line=dict(color='#FFD60A', width=6),
        hovertemplate='<b>t:</b> %{x:.3f} s<br><b>u_zoh:</b> %{y:.3f} V<extra></extra>'
    ))

    # TRAZA 5: Túnel del Error de Cuantificación e_q(t) en Z = -1.5
    # Evaluar error instantáneo
    y_err = []
    for t, xc in zip(t_cont, x_cont):
        k_idx = int(t / T)
        if k_idx < len(x_cuant):
            val_q = x_cuant[k_idx]
        else:
            val_q = x_cuant[-1]
        y_err.append(xc - val_q)
    
    y_err = np.array(y_err)

    fig.add_trace(go.Scatter3d(
        x=t_cont,
        y=y_err + 5.0, # centrado visualmente
        z=np.full_like(t_cont, -1.5),
        mode='lines',
        name='Error e_q(t) en Canal Z',
        line=dict(color='#F72585', width=4),
        hovertemplate='<b>t:</b> %{x:.3f} s<br><b>e_q:</b> %{y:.4f} V<extra></extra>'
    ))

    # Configuración de layout oscuro futurista
    fig.update_layout(
        template='plotly_dark',
        paper_bgcolor='#050814',
        plot_bgcolor='#050814',
        title=dict(
            text=f"<b>Malla 3D de Muestreo y Cuantificación</b> | ADC {bits}-bits (Q = {q*1000:.3f} mV)",
            font=dict(color='#FFFFFF', size=16),
            x=0.05,
            y=0.95
        ),
        scene=dict(
            xaxis=dict(
                title="Tiempo t [s]",
                backgroundcolor="#070B19",
                gridcolor="#1E293B",
                showbackground=True,
                zerolinecolor="#334155"
            ),
            yaxis=dict(
                title="Amplitud / Voltaje [V]",
                backgroundcolor="#070B19",
                gridcolor="#1E293B",
                showbackground=True,
                zerolinecolor="#334155"
            ),
            zaxis=dict(
                title="Canal Espacial Z",
                backgroundcolor="#070B19",
                gridcolor="#1E293B",
                showbackground=True,
                zerolinecolor="#334155"
            ),
            camera=dict(
                eye=dict(x=1.7, y=-1.5, z=1.2),
                up=dict(x=0, y=0, z=1)
            ),
            aspectratio=dict(x=2.2, y=1.2, z=0.8)
        ),
        margin=dict(l=0, r=0, b=0, t=40),
        legend=dict(
            bgcolor="rgba(15, 23, 42, 0.8)",
            bordercolor="rgba(255, 255, 255, 0.1)",
            borderwidth=1,
            x=0.02,
            y=0.9
        )
    )

    abs_output = os.path.abspath(output_path)
    os.makedirs(os.path.dirname(abs_output), exist_ok=True)
    fig.write_html(abs_output, include_plotlyjs='cdn')
    print(f"[OK] Archivo generado con exito en: {abs_output}")

if __name__ == "__main__":
    generar_escena_3d_semana01()
