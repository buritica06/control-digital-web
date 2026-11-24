import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="por-que-digital">1. Por qué pasamos del control analógico al digital</h2>
<p>
  Piensa en un brazo robótico, un dron o una línea neumática industrial: la física de la máquina es
  <strong>continua</strong> (la posición, la presión o la temperatura cambian en todo instante), pero el cerebro que
  toma las decisiones hoy casi siempre es un <strong>procesador digital</strong>.
</p>
<p>
  En Control I diseñaste controladores con amplificadores operacionales, resistencias y condensadores. Ese enfoque
  funciona, pero cambiar una ganancia obliga a soldar nuevos componentes y el circuito se degrada con la temperatura.
  En un <strong>sistema de control digital</strong>, la ley de control vive en código: se ajusta en segundos, no
  envejece, admite algoritmos adaptativos y se conecta directo a redes industriales.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Idea sistémica — La frontera entre dos mundos</span>
  <p>
    El control digital no reemplaza la física continua de la planta; construye un <strong>puente sincronizado</strong>
    entre el mundo físico analógico y el procesador binario. Todo lo que ocurre en esa frontera —tiempos, filtros y
    resolución en bits— impacta la estabilidad y precisión del lazo completo.
  </p>
</div>

<h2 id="arquitectura-lazo">2. Los siete bloques que dialogan en el lazo cerrado</h2>
<p>
  Para diseñar o diagnosticar un controlador digital conviene leer el lazo como un sistema de siete bloques encadenados,
  coordinados por un mismo <strong>reloj maestro</strong> de periodo \\(T\\):
</p>

<figure class="figura">
  <img
    src="./assets/images/lazo-control-digital.svg"
    alt="Diagrama de bloques del lazo de control digital separado en dominio digital (referencia, sumador, controlador) y dominio continuo (actuador, planta, sensor, filtro antialiasing), unidos por el DAC con ZOH y el ADC con S/H sincronizados por un reloj maestro de periodo T."
    loading="lazy"
  />
  <figcaption>
    Figura 1. Arquitectura sistémica de un lazo de control digital y su frontera entre el dominio continuo y el dominio
    discreto.
  </figcaption>
</figure>

<ol>
  <li>
    <strong>Planta o proceso físico:</strong> el sistema real que deseamos gobernar; responde a ecuaciones diferenciales
    continuas en \\(t\\).
  </li>
  <li>
    <strong>Sensor y transductor:</strong> traduce la variable física \\(y(t)\\) (presión, velocidad, ángulo) en una
    señal eléctrica analógica (por ejemplo, \\(0\\text{–}10\\ \\text{V}\\) o \\(4\\text{–}20\\ \\text{mA}\\)).
  </li>
  <li>
    <strong>Filtro antialiasing:</strong> filtro pasobajo analógico que elimina ruido de alta frecuencia
    <em>antes</em> de digitalizar, evitando que se distorsione la medición.
  </li>
  <li>
    <strong>ADC con <em>Sample &amp; Hold</em> (S/H):</strong> congela la señal cada \\(T\\) segundos y la traduce a una
    palabra binaria de \\(n\\) bits, generando la secuencia \\(y[k]\\).
  </li>
  <li>
    <strong>Controlador digital:</strong> compara la referencia \\(r[k]\\) con la medición \\(y[k]\\), calcula el error
    \\(e[k] = r[k] - y[k]\\) y ejecuta la ley de control para producir el comando \\(u[k]\\).
  </li>
  <li>
    <strong>DAC con retenedor ZOH:</strong> convierte el número \\(u[k]\\) en un voltaje continuo escalonado \\(u(t)\\) que
    se mantiene constante durante todo el intervalo \\(T\\).
  </li>
  <li>
    <strong>Actuador:</strong> etapa de potencia (válvula proporcional, puente H, variador) que entrega energía real a
    la planta.
  </li>
</ol>

<h2 id="doble-discretizacion">3. La doble discretización</h2>
<p>
  Al cruzar el convertidor ADC, la señal analógica \\(x(t)\\) sufre dos transformaciones inevitables que conviene
  analizar siempre juntas:
</p>
<ul>
  <li>
    <strong>Discretización en el tiempo (muestreo):</strong> dejamos de observar la señal en todo instante y solo
    tomamos fotografías periódicas cada \\(T\\) segundos (\\(f_s = 1/T\\)).
  </li>
  <li>
    <strong>Discretización en la amplitud (cuantificación):</strong> reemplazamos un voltaje continuo por el escalón más
    cercano dentro de \\(2^n\\) niveles binarios posibles.
  </li>
</ul>

<div class="callout callout--warn" role="note">
  <span class="callout__title">Atención — Error frecuente</span>
  <p>
    Muestrear más rápido no mejora la resolución en voltios, y usar un ADC de 16 bits no evita el <em>aliasing</em> si
    el periodo \\(T\\) es demasiado grande. Tiempo y amplitud son dos ejes independientes: ambos deben dimensionarse según
    la dinámica de la planta.
  </p>
</div>

<h2 id="hardware">4. ¿Dónde vive el algoritmo? Comparativa de tecnologías</h2>
<p>
  Elegir el procesador adecuado no consiste en comprar el más potente, sino el que equilibra
  <strong>velocidad del lazo</strong>, <strong>determinismo temporal</strong> (cumplir siempre el periodo \\(T\\) sin
  retrasos inesperados) y <strong>costo</strong>.
</p>

<div class="table-wrap">
  <table>
    <caption>Comparativa sistémica de plataformas de procesamiento para control digital</caption>
    <thead>
      <tr>
        <th scope="col">Tecnología</th>
        <th scope="col">Determinismo</th>
        <th scope="col">Programación</th>
        <th scope="col">Costo típico</th>
        <th scope="col">Dónde brilla</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>MCU (ARM Cortex-M4/M7)</strong></td>
        <td>Alto (interrupciones de reloj)</td>
        <td>Alta (C/C++)</td>
        <td>Bajo (\\$2 – \\$15)</td>
        <td>Servocontrol, robótica y lazos rápidos (\\(1\\text{–}100\\ \\text{kHz}\\)).</td>
      </tr>
      <tr>
        <td><strong>DSP</strong></td>
        <td>Muy alto (unidad MAC en hardware)</td>
        <td>Media (C / Ensamblador)</td>
        <td>Medio (\\$10 – \\$50)</td>
        <td>Control vectorial de motores y filtrado digital intensivo.</td>
      </tr>
      <tr>
        <td><strong>FPGA</strong></td>
        <td>Ultra alto (paralelismo real en ns)</td>
        <td>Baja (VHDL / Verilog)</td>
        <td>Alto (\\$30 – \\$200)</td>
        <td>Electrónica de potencia y lazos críticos (\\(&gt; 1\\ \\text{MHz}\\)).</td>
      </tr>
      <tr>
        <td><strong>PLC industrial</strong></td>
        <td>Medio (ciclo de escaneo)</td>
        <td>Muy alta (IEC 61131-3: Ladder, FBD)</td>
        <td>Alto (\\$200 – \\$2000)</td>
        <td>Automatización de planta y procesos lentos (\\(10\\text{–}100\\ \\text{ms}\\)).</td>
      </tr>
    </tbody>
  </table>
</div>

<details class="disclosure">
  <summary>¿Qué pasa si uso un computador de escritorio o Raspberry Pi con Linux estándar?</summary>
  <div>
    <p>
      Un sistema operativo de propósito general reparte el procesador entre decenas de tareas y puede introducir
      retrasos aleatorios (<em>jitter</em>) en el periodo \\(T\\). Para lazos rápidos o críticos se prefiere un MCU, un
      DSP, una FPGA o un núcleo de tiempo real (RTOS / Linux RT).
    </p>
  </div>
</details>
`,objetivos:[`Identificar los siete bloques de un lazo de control digital y el papel de cada interfaz (ADC y DAC/ZOH).`,`Diferenciar con claridad la discretización en el tiempo (muestreo) de la discretización en amplitud (cuantificación).`,`Seleccionar la plataforma de procesamiento adecuada (MCU, DSP, FPGA o PLC) según la velocidad y exigencia del proceso.`]});export{t as default};