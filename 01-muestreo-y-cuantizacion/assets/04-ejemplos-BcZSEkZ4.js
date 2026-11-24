import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<p>
  En ingeniería mecatrónica las ecuaciones cobran sentido cuando resuelven una decisión real de hardware. A
  continuación resolvemos un caso de cálculo paso a paso, un caso de análisis sistémico y un script breve en Python
  para verificar los números.
</p>

<h2 id="ejemplo-adc">Ejemplo 1 — Dimensionamiento de ADC para un sensor de presión</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Una línea neumática industrial usa un transductor de presión que entrega \\(0\\text{–}10\\ \\text{V}\\) para un rango
    físico de \\(0\\text{–}100\\ \\text{bar}\\). El proceso exige detectar variaciones de al menos
    \\(\\Delta P \\le 0.05\\ \\text{bar}\\). Determina: (a) la resolución comercial en bits \\(n\\) del ADC, (b) el tamaño de
    paso \\(Q\\) en voltaje y en presión real, (c) el valor eficaz del ruido de cuantificación \\(\\sigma_q\\) y (d) el SQNR
    teórico.
  </p>
</div>

<p><strong>1. Datos:</strong> \\(V_{\\mathrm{FS}} = 10\\ \\text{V}\\), \\(P_{\\max} - P_{\\min} = 100\\ \\text{bar}\\), \\(\\Delta P \\le 0.05\\ \\text{bar}\\).</p>

<p><strong>2. Niveles mínimos y número de bits:</strong></p>
\\[ N_{\\text{niveles}} = \\frac{100 - 0}{0.05} = 2000\\ \\text{niveles} \\]
\\[ 2^n \\ge 2000 \\;\\Rightarrow\\; n \\ge \\frac{\\ln(2000)}{\\ln(2)} \\approx 10.966 \\;\\Rightarrow\\; n_{\\min} = 11\\ \\text{bits} \\]
<p>
  <em>Decisión comercial de ingeniería:</em> los ADC de 11 bits no son estándar; adoptamos un
  <strong>ADC comercial de \\(n = 12\\ \\text{bits}\\)</strong> (\\(2^{12} = 4096\\ \\text{niveles}\\)), integrado en la
  mayoría de microcontroladores ARM Cortex-M.
</p>

<p><strong>3. Tamaño de paso \\(Q\\) (LSB) y resolución física real:</strong></p>
\\[ Q = \\frac{10\\ \\text{V}}{4096} \\approx 2.4414\\ \\text{mV}, \\qquad \\Delta P_{\\text{real}} = \\frac{100\\ \\text{bar}}{4096} \\approx 0.0244\\ \\text{bar} \\quad (&lt; 0.05\\ \\text{bar}) \\]

<p><strong>4. Ruido eficaz (RMS) y relación señal a ruido (SQNR):</strong></p>
\\[ \\sigma_q = \\frac{Q}{\\sqrt{12}} = \\frac{2.4414\\ \\text{mV}}{\\sqrt{12}} \\approx 0.7048\\ \\text{mV}, \\qquad \\mathrm{SQNR} = 6.02(12) + 1.76 = 74.00\\ \\text{dB} \\]

<p><strong>5. Verificación interactiva:</strong> observa en la gráfica el paso \\(Q = 2.441\\ \\text{mV}\\), el ruido RMS y el SQNR de \\(74.00\\ \\text{dB}\\) para \\(n = 12\\) y \\(V_{\\mathrm{FS}} = 10\\ \\text{V}\\).</p>
<div data-viz="cuantificacionADC" data-preset="presion12bits"></div>

<h2 id="ejemplo-aliasing">Ejemplo 2 — Diagnóstico sistémico de aliasing y selección de hardware</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Un equipo de mantenimiento reporta una oscilación lenta de \\(15\\ \\text{Hz}\\) en la lectura de velocidad de un
    servomotor cuyo lazo se muestrea a \\(f_s = 100\\ \\text{Hz}\\) mediante un PLC. Sin embargo, al medir con osciloscopio
    analógico antes del ADC se detecta una vibración mecánica de \\(85\\ \\text{Hz}\\) proveniente de un acople desalineado.
    ¿Qué está ocurriendo en el lazo y qué arquitectura de corrección propones?
  </p>
</div>

<ol>
  <li>
    <strong>Identificar:</strong> \\(f_s = 100\\ \\text{Hz}\\) fija la frecuencia de Nyquist en
    \\(f_N = f_s / 2 = 50\\ \\text{Hz}\\). La vibración real (\\(f_0 = 85\\ \\text{Hz}\\)) supera ampliamente \\(f_N\\).
  </li>
  <li>
    <strong>Aplicar:</strong> por doblamiento espectral, la frecuencia aparente que ve el controlador es
    \\(f_{\\text{alias}} = |f_0 - f_s| = |85 - 100| = 15\\ \\text{Hz}\\). El PLC cree estar viendo una oscilación lenta de
    \\(15\\ \\text{Hz}\\) e intenta corregirla, empeorando el comportamiento del motor.
  </li>
  <li>
    <strong>Argumentar:</strong> un filtro digital dentro del PLC no puede separar ese alias de una señal real de
    \\(15\\ \\text{Hz}\\). Además, un PLC convencional tiene ciclos de escaneo de \\(10\\text{–}100\\ \\text{ms}\\), poco
    adecuados para lazos de servocontrol rápidos.
  </li>
  <li>
    <strong>Concluir:</strong> la solución sistémica combina tres acciones: (1) corregir el desalineamiento mecánico,
    (2) instalar un <strong>filtro antialiasing analógico</strong> antes del ADC con corte por debajo de \\(f_N\\) y (3)
    migrar el lazo rápido de velocidad a un <strong>MCU ARM Cortex-M o DSP</strong> con \\(f_s \\ge 1\\ \\text{kHz}\\),
    dejando el PLC para supervisión general.
  </li>
</ol>

<div data-viz="muestreoZOH" data-preset="aliasingEjemplo"></div>

<h2 id="codigo-python">Simulación reproducible en Python</h2>
<p>
  Puedes copiar este script en Python o Google Colab para comprobar numéricamente cómo el error RMS experimental de un
  ADC de \\(12\\ \\text{bits}\\) coincide con la fórmula teórica \\(\\sigma_q = Q / \\sqrt{12}\\):
</p>
<pre class="no-math"><code>import numpy as np

def simular_adc(v_min=0.0, v_max=10.0, bits=12, f_senal=2.0, fs=100.0, duracion=1.0):
    T = 1.0 / fs
    t = np.arange(0, duracion, T)
    x = 5.0 + 4.0 * np.sin(2 * np.pi * f_senal * t)

    niveles = 2 ** bits
    Q = (v_max - v_min) / niveles
    codigos = np.clip(np.round((x - v_min) / Q), 0, niveles - 1).astype(int)
    x_q = v_min + codigos * Q

    error_q = x - x_q
    rms_exp = np.sqrt(np.mean(error_q ** 2))
    rms_teo = Q / np.sqrt(12)

    print(f"ADC {bits} bits | Q = {Q*1000:.4f} mV")
    print(f"RMS experimental = {rms_exp*1000:.4f} mV | RMS teórico = {rms_teo*1000:.4f} mV")

if __name__ == "__main__":
    simular_adc(bits=12)</code></pre>
`,objetivos:[`Dimensionar un convertidor ADC desde especificaciones físicas de proceso hasta Q, σ_q y SQNR.`,`Diagnosticar un problema real de aliasing y proponer una corrección sistémica de filtro y hardware.`,`Reproducir y verificar en Python el modelo teórico de ruido de cuantificación.`],presets:{presion12bits:{titulo:`Verificación del Ejemplo 1 — ADC de 12 bits (0 a 10 V)`,descripcion:`Cambia la vista a «Error e_q[k]» para confirmar las bandas ±1.22 mV y el ruido RMS cercano a 0.705 mV.`,params:{bits:12,vMax:10,fSenal:2,fs:100,vista:`error`}},aliasingEjemplo:{titulo:`Verificación del Ejemplo 2 — Señal rápida muestreada por debajo de Nyquist`,descripcion:`A escala reducida (f₀ = 8.5 Hz, fₛ = 10 Hz): la onda roja punteada revela el alias exacto de 1.5 Hz.`,params:{fSenal:8.5,fs:10,amplitud:4,duracion:1,mostrarZOH:!1,mostrarAlias:!0}}}});export{t as default};