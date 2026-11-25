import{t as e}from"./chapter-C2599_w7.js";var t=e({html:`<h2 id="tres-metodos">1. Tres caminos distintos, exactamente la misma respuesta</h2>
<p>
  Resolver una ecuación en diferencias significa encontrar \\(y[k]\\) para cualquier muestra \\(k\\). Existen tres
  métodos clásicos; conocer los tres te permite elegir la herramienta adecuada según si estás
  <strong>programando un microcontrolador</strong> o <strong>analizando el comportamiento a largo plazo</strong>.
</p>
<p>
  Comparemos los tres sobre la misma ecuación: \\(y[k] - 0.7y[k-1] + 0.1y[k-2] = u[k]\\), con escalón \\(u[k] = 1\\)
  (\\(k \\ge 0\\)) y reposo inicial (\\(y[-1] = y[-2] = 0\\)).
</p>

<div class="table-wrap">
  <table>
    <caption>Equivalencia de los tres métodos sobre \\(y[k] - 0.7y[k-1] + 0.1y[k-2] = u[k]\\)</caption>
    <thead>
      <tr>
        <th scope="col">Método</th>
        <th scope="col">Procedimiento clave</th>
        <th scope="col">Resultado</th>
        <th scope="col">Cuándo conviene usarlo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Iteración recursiva</strong></td>
        <td>Despeja \\(y[k] = 0.7y[k-1] - 0.1y[k-2] + u[k]\\) y evalúa \\(k = 0, 1, 2, 3\\dots\\)</td>
        <td>\\(y[0]=1,\\; y[1]=1.7,\\; y[2]=2.09,\\; y[3]=2.293\\)</td>
        <td>Para programar en C/Python y verificar cuentas a mano en las primeras muestras.</td>
      </tr>
      <tr>
        <td><strong>2. Clásico (Homogénea + Particular)</strong></td>
        <td>Raíces de \\(r^2 - 0.7r + 0.1 = 0 \\Rightarrow r_1=0.5, r_2=0.2\\); particular \\(y_p = 1/(1-0.7+0.1)=2.5\\); ajusta \\(C_1, C_2\\) con \\(y[0], y[1]\\).</td>
        <td>\\(y[k] = 2.5 - \\dfrac{5}{3}(0.5)^k + \\dfrac{1}{6}(0.2)^k\\)</td>
        <td>Para intuir rápido los modos naturales \\(r^k\\) sin pasar al plano \\(Z\\).</td>
      </tr>
      <tr>
        <td><strong>3. Transformada Z</strong></td>
        <td>\\(Y(z) = \\dfrac{z^3}{(z-1)(z-0.5)(z-0.2)}\\); expande \\(Y(z)/z\\) por Heaviside e invierte por tabla.</td>
        <td>\\(y[k] = 2.5 - \\dfrac{5}{3}(0.5)^k + \\dfrac{1}{6}(0.2)^k\\)</td>
        <td>El más sistemático cuando hay condiciones iniciales no nulas y entradas variadas.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout--thm" role="note">
  <span class="callout__title">¿Por qué expandimos \\(Y(z)/z\\) en lugar de \\(Y(z)\\)?</span>
  <p>
    Porque los pares básicos de la tabla tienen la forma \\(\\dfrac{z}{z - p_i} \\leftrightarrow (p_i)^k\\). Dividir
    primero entre \\(z\\), separar en fracciones simples y multiplicar al final por \\(z\\) te entrega directamente los
    términos de tabla sin álgebra extra.
  </p>
</div>

<h2 id="jury">2. Estabilidad sin calcular raíces: el criterio de Jury</h2>
<p>
  En un sistema de segundo orden con polinomio característico mónico \\(P(z) = z^2 + a_1 z + a_2\\), no necesitas
  factorizar para saber si ambos polos están dentro del círculo unitario. El sistema es <strong>BIBO estable</strong>
  si y solo si se cumplen estas tres desigualdades al mismo tiempo:
</p>
\\[ P(1) = 1 + a_1 + a_2 &gt; 0, \\qquad P(-1) = 1 - a_1 + a_2 &gt; 0, \\qquad |a_2| &lt; 1 \\]

<h2 id="pi-digital">3. Del papel al microcontrolador: controlador PI en forma de velocidad</h2>
<p>
  Un controlador PI continuo \\(u(t) = K_p e(t) + K_i \\int_0^t e(\\tau)\\,d\\tau\\), discretizado con Euler hacia atrás,
  se convierte en una ecuación en diferencias muy compacta llamada <strong>forma de velocidad (o incremental)</strong>:
</p>
<div class="callout callout--def" role="note">
  <span class="callout__title">Ecuación del PI digital incremental</span>
  \\[ u[k] = u[k-1] + q_0\\,e[k] + q_1\\,e[k-1], \\qquad q_0 = K_p + K_i T, \\qquad q_1 = -K_p \\]
</div>
<p>
  Su mayor ventaja práctica es la <strong>protección anti-windup natural</strong>: si el actuador (por ejemplo, un
  PWM de Arduino de \\(0\\) a \\(5\\text{ V}\\)) se satura, recortas \\(u[k]\\) a \\([0, 5]\\text{ V}\\) y guardas en
  \\(u[k-1]\\) ese valor <em>ya saturado</em>. Así el integrador nunca acumula error fantasma.
</p>

<pre class="no-math"><code>// Rutina periódica en Timer1 (cada T segundos, ej. T = 0.02 s -&gt; 50 Hz)
float y = analogRead(PIN_ADC) * (5.0f / 1023.0f); // 1. Muestreo ADC 10 bits
float e = r - y;                                  // 2. Error actual e[k]
float u = u1 + Q0 * e + Q1 * e1;                  // 3. Ecuación en diferencias PI

// 4. Saturación física PWM [0, 5] V + Anti-Windup
if (u &gt; 5.0f) u = 5.0f;
if (u &lt; 0.0f) u = 0.0f;
analogWrite(PIN_PWM, (uint8_t)(u * 255.0f / 5.0f + 0.5f));

// 5. Desplazamiento de registros de memoria para k + 1
e1 = e;
u1 = u;   // Guardar u saturado evita el windup</code></pre>

<h2 id="lab-pi">4. Simulador en tiempo real del controlador PI digital</h2>
<p>
  Experimenta con \\(K_p\\), \\(K_i\\) y \\(T\\) sobre una planta RC (\\(\\tau = 1\\text{ s}\\)) con cuantización real de ADC
  (10 bits) y PWM (8 bits). Sube \\(K_i\\) a \\(6\\) y desactiva <strong>Anti-Windup activo</strong> para observar cómo
  el integrador saturado dispara el sobrepaso al cambiar la referencia de \\(2.5\\text{ V}\\) a \\(1.5\\text{ V}\\).
</p>
<div data-viz="simuladorPi" data-preset="piRc"></div>
`,objetivos:[`Resolver una ecuación en diferencias por iteración recursiva, método clásico y Transformada Z verificando su equivalencia.`,`Aplicar las tres condiciones del criterio de Jury para diagnosticar estabilidad en sistemas de segundo orden.`,`Implementar un controlador PI digital en forma de velocidad con saturación y protección anti-windup.`],presets:{piRc:{params:{Kp:2,Ki:2,T:.04,antiWindup:!0}}}});export{t as default};