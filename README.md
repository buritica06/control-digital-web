# Control Digital Web — MEC36: Control II (IUB)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Hub-00A3E0?style=for-the-badge&logo=github)](https://buritica06.github.io/control-digital-web/)
[![Módulos](https://img.shields.io/badge/Módulos-13%20Apps%203D%2F2D-10B981?style=for-the-badge)](https://buritica06.github.io/control-digital-web/)
[![Asignatura](https://img.shields.io/badge/Asignatura-MEC36%20Control%20II-002F6C?style=for-the-badge)](https://buritica06.github.io/control-digital-web/)
[![Institución](https://img.shields.io/badge/Institución-IUB%20Barranquilla-FFC72C?style=for-the-badge&labelColor=002F6C)](https://unibarranquilla.edu.co)

Repositorio oficial y portal de despliegue en **GitHub Pages** de las **aplicaciones web interactivas, simuladores sincronizados 3D + 2D (Three.js / WebGL + Plotly.js) y laboratorios pedagógicos** de la asignatura **MEC36 — Control II (Control Digital / Sistemas en Tiempo Discreto)** del programa de **Ingeniería Mecatrónica** de la **Institución Universitaria de Barranquilla (IUB)**.

> 🌐 **Portal Principal (Hub Interactivo con buscador y filtros por corte):**
> **[https://buritica06.github.io/control-digital-web/](https://buritica06.github.io/control-digital-web/)**

---

## 📚 Catálogo Completo de Módulos Desplegados en GitHub Pages (13 / 13)

Cada módulo cuenta con su carpeta autocontenida, compilada con rutas relativas y desplegada automáticamente en **GitHub Pages** (`https://buritica06.github.io/control-digital-web/<carpeta>/`).

### Corte 1 — Fundamentos Discretos y Transformada Z (`MEC36-RA1` / `MEC36-RA2`)

| Semana | Carpeta en el repo | Tema y contenidos clave | Despliegue en GitHub Pages | Acceso directo 3D |
| :---: | :--- | :--- | :---: | :---: |
| **01** | [`01-muestreo-y-cuantizacion/`](./01-muestreo-y-cuantizacion/) | Arquitectura digital, muestreo periódico, aliasing, retenedor ZOH, cuantificación ADC (2–12 bits) y 8 actividades | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/01-muestreo-y-cuantizacion/)** | [Visor 3D](https://buritica06.github.io/control-digital-web/01-muestreo-y-cuantizacion/index.html#/capitulo/02-muestreo-zoh) |
| **02** | [`02-transformada-z/`](./02-transformada-z/) | Transformada Z unilateral, relieve 3D de la ROC, señales elementales, TVI/TVF y caso servomecanismo | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/02-transformada-z/)** | [Visor 3D](https://buritica06.github.io/control-digital-web/02-transformada-z/index.html#/capitulo/02-definicion-roc) |
| **03** | [`03-transformada-z-inversa/`](./03-transformada-z-inversa/) | Transformada Z inversa, fracciones parciales $X(z)/z$, división directa, residuos de Cauchy 3D y brazo robótico | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/03-transformada-z-inversa/)** | [Visor 3D](https://buritica06.github.io/control-digital-web/03-transformada-z-inversa/index.html#/capitulo/04-ejemplos) |
| **04** | [`04-ecuaciones-en-diferencias/`](./04-ecuaciones-en-diferencias/) | Ecuaciones en diferencias, respuesta libre y forzada, animaciones Manim CE, discretización ZOH/Tustin/Euler y PI digital | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/04-ecuaciones-en-diferencias/)** | [Visor 3D](https://buritica06.github.io/control-digital-web/04-ecuaciones-en-diferencias/index.html#/capitulo/03-discretizacion-3d) |
| **04b** | [`04b-ecuaciones-diferencias-interactiva/`](./04b-ecuaciones-diferencias-interactiva/) | Plataforma interactiva 3D/2D: plano $Z$, superficie $\|G(z)\|$, lugar de raíces 3D, Bode, Nyquist y 9 ejercicios | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/04b-ecuaciones-diferencias-interactiva/)** | [Visor 3D](https://buritica06.github.io/control-digital-web/04b-ecuaciones-diferencias-interactiva/index.html#/capitulo/05-aplicaciones) |

> *Semana 05: Primer Examen Parcial (sin módulo lectivo).*

---

### Corte 2 — Modelado Discreto, Mapeo S–Z y Estabilidad (`MEC36-RA3`)

| Semana | Carpeta en el repo | Tema y contenidos clave | Despliegue en GitHub Pages | Acceso directo 3D |
| :---: | :--- | :--- | :---: | :---: |
| **06** | [`06-muestreo-impulsos-zoh-nyquist/`](./06-muestreo-impulsos-zoh-nyquist/) | Muestreo por impulsos $\delta_T(t)$, espectro replicado, Shannon-Nyquist, filtro antialiasing, ZOH ($\mathrm{sinc}$ y desfase) y **Reactor Térmico 3D + 2D** | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/06-muestreo-impulsos-zoh-nyquist/)** | [Simulador 3D+2D](https://buritica06.github.io/control-digital-web/06-muestreo-impulsos-zoh-nyquist/index.html#/capitulo/03-caso-practico) |
| **07** | [`07-funcion-transferencia-pulso/`](./07-funcion-transferencia-pulso/) | Función de transferencia de pulso $G(z)=(1-z^{-1})\mathcal{Z}\{G_p(s)/s\}$, álgebra muestreada, lazo cerrado y **Servomotor DC 3D + 2D** | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/07-funcion-transferencia-pulso/)** | [Simulador 3D+2D](https://buritica06.github.io/control-digital-web/07-funcion-transferencia-pulso/index.html#/capitulo/03-caso-practico) |
| **08** | [`08-correspondencia-planos-s-z/`](./08-correspondencia-planos-s-z/) | Mapeo conforme $z=e^{sT}$, espirales de $\zeta$ constante, círculos de $t_s$, malla `zgrid` y **Brazo Robótico 3D + 2D** | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/08-correspondencia-planos-s-z/)** | [Simulador 3D+2D](https://buritica06.github.io/control-digital-web/08-correspondencia-planos-s-z/index.html#/capitulo/03-caso-practico) |
| **09** | [`09-estabilidad-plano-z-jury/`](./09-estabilidad-plano-z-jury/) | Círculo unitario, Criterio Algebraico de Jury, triángulo $(a_1, a_2)$, transformación bilineal, $K_{\mathrm{cr}}$ y **Posicionador Lineal 3D + 2D** | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/09-estabilidad-plano-z-jury/)** | [Simulador 3D+2D](https://buritica06.github.io/control-digital-web/09-estabilidad-plano-z-jury/index.html#/capitulo/03-caso-practico) |

> *Semana 10: Segundo Examen Parcial (sin módulo lectivo).*

---

### Corte 3 — Diseño de Controladores Digitales (`MEC36-RA4`)

| Semana | Carpeta en el repo | Tema y contenidos clave | Despliegue en GitHub Pages | Acceso directo 3D |
| :---: | :--- | :--- | :---: | :---: |
| **11** | [`11-lugar-geometrico-raices-z/`](./11-lugar-geometrico-raices-z/) | Lugar Geométrico de las Raíces (LGR) en el plano $Z$, reglas de Evans, puntos de ruptura, cruce con $\|z\|=1$ y **Manipulador 1 GDL 3D + LGR 2D** | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/11-lugar-geometrico-raices-z/)** | [Simulador 3D+2D](https://buritica06.github.io/control-digital-web/11-lugar-geometrico-raices-z/index.html#/capitulo/03-caso-practico) |
| **12** | [`12-compensadores-digitales-lgr/`](./12-compensadores-digitales-lgr/) | Compensadores digitales $D(z)=K_c\frac{z-z_0}{z-p_0}$ de adelanto y atraso de fase, deficiencia angular y **Servoposicionador Dual 3D + 2D** | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/12-compensadores-digitales-lgr/)** | [Simulador 3D+2D](https://buritica06.github.io/control-digital-web/12-compensadores-digitales-lgr/index.html#/capitulo/03-caso-practico) |
| **13** | [`13-controladores-pid-digitales/`](./13-controladores-pid-digitales/) | Controladores PID digitales (posición y velocidad/incremental), filtro derivativo $N$, *anti-windup* y **Motor DC PWM 3D + 2D** | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/13-controladores-pid-digitales/)** | [Simulador 3D+2D](https://buritica06.github.io/control-digital-web/13-controladores-pid-digitales/index.html#/capitulo/03-caso-practico) |

> *Semana 14: Tercer Examen Parcial y Proyecto Integrador Final.*

---

### Tópicos Transversales

| Carpeta en el repo | Tema y contenidos clave | Despliegue en GitHub Pages | Acceso directo 3D |
| :--- | :--- | :---: | :---: |
| [`topologia-transformada-z/`](./topologia-transformada-z/) | Topología energética 3D de la Transformada Z: mapeo $s \to z$, círculo unitario $\|z\|=1$ y superficie de magnitud $\|X(z)\|$ | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/topologia-transformada-z/)** | [Visor 3D](https://buritica06.github.io/control-digital-web/topologia-transformada-z/transformada_z_experiencia_3d.html) |

---

## 📁 Estructura del Repositorio (`main`)

```text
control-digital-web/
├── index.html                                  # Hub Principal con buscador, filtros por corte y 13 tarjetas
├── README.md                                   # Documentación general, tabla curricular y enlaces GitHub Pages
├── .nojekyll                                   # Desactiva procesamiento Jekyll para servir assets Vite sin alteración
├── .gitignore                                  # Exclusiones de control de versiones
├── logos/                                      # Identidad visual oficial IUB (azul / blanco)
│
├── 01-muestreo-y-cuantizacion/                 # [Corte 1 · Sem. 01] Arquitectura digital, muestreo y cuantificación
├── 02-transformada-z/                          # [Corte 1 · Sem. 02] Transformada Z, ROC 3D y teoremas
├── 03-transformada-z-inversa/                  # [Corte 1 · Sem. 03] Transformada Z inversa y Cauchy 3D
├── 04-ecuaciones-en-diferencias/               # [Corte 1 · Sem. 04] Ecuaciones en diferencias, Manim y PI digital
├── 04b-ecuaciones-diferencias-interactiva/     # [Corte 1 · Sem. 04] Plataforma interactiva 3D/2D (LGR, Bode, Nyquist)
│
├── 06-muestreo-impulsos-zoh-nyquist/           # [Corte 2 · Sem. 06] Muestreo por impulsos, ZOH, Nyquist y Reactor 3D
├── 07-funcion-transferencia-pulso/             # [Corte 2 · Sem. 07] Función de transferencia de pulso y Servomotor 3D
├── 08-correspondencia-planos-s-z/              # [Corte 2 · Sem. 08] Mapeo S → Z, zgrid y Brazo Robótico 3D
├── 09-estabilidad-plano-z-jury/                # [Corte 2 · Sem. 09] Estabilidad en Z, Criterio de Jury y Posicionador 3D
│
├── 11-lugar-geometrico-raices-z/               # [Corte 3 · Sem. 11] LGR en el plano Z y Manipulador 1 GDL 3D
├── 12-compensadores-digitales-lgr/             # [Corte 3 · Sem. 12] Compensadores adelanto/atraso y Servo Dual 3D
├── 13-controladores-pid-digitales/             # [Corte 3 · Sem. 13] PID digital, filtro derivativo, anti-windup y Motor 3D
│
└── topologia-transformada-z/                   # [Transversal] Superficie 3D |X(z)| y topología energética en Z
```

---

## 🛠️ Arquitectura y Tecnologías

- **Empaquetado y SPA por capítulos:** **Vite 8** (rutas relativas `base: './'` y enrutamiento hash `#/capitulo/<id>`, 100 % compatible con GitHub Pages sin reescritura de servidor).
- **Visualización 3D:** **Three.js** (WebGL 2, geometrías procedurales optimizadas, `OrbitControls`, post-procesado `EffectComposer` + `SMAA` y etiquetas SDF con `troika-three-text`).
- **Visualización 2D:** **Plotly.js** (`plotly.js-basic-dist-min`) sincronizado en tiempo real mediante `lil-gui` y `requestAnimationFrame`.
- **Matemáticas y Evaluación:** **KaTeX** (renderizado LaTeX nativo), **mathjs** (verificación numérica de ejercicios) y persistencia de progreso en `localStorage` independiente por módulo.
- **Identidad Institucional IUB:** Azul Institucional `#002F6C` · Azul Claro `#00A3E0` · Amarillo Acento `#FFC72C`, con soporte completo para tema claro y oscuro.

---

## 👨‍🏫 Créditos y Autoría

- **Institución:** [Institución Universitaria de Barranquilla (IUB)](https://unibarranquilla.edu.co)
- **Facultad:** Facultad de Ingeniería
- **Programa:** Ingeniería Mecatrónica
- **Asignatura:** MEC36 — Control II (Control Digital)
- **Docente:** Ricardo Buriticá
