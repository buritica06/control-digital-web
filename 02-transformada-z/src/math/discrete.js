/**
 * Utilidades matemáticas para Transformada Z y análisis en tiempo discreto.
 * Módulo MEC36 - Control II (Semana 2).
 */

/**
 * Genera secuencias canónicas de prueba
 */
export function generarSecuencia(tipo, params = {}, N = 30) {
  const k = Array.from({ length: N }, (_, i) => i);
  let x = [];

  switch (tipo) {
    case 'impulso':
      x = k.map(n => (n === 0 ? 1 : 0));
      break;

    case 'escalon':
      x = k.map(() => 1);
      break;

    case 'rampa': {
      const T = params.T ?? 0.1;
      x = k.map(n => n * T);
      break;
    }

    case 'exponencial': {
      const a = params.a ?? 0.8;
      x = k.map(n => Math.pow(a, n));
      break;
    }

    case 'seno-amortiguado': {
      const a = params.a ?? 0.85;
      const omega0 = params.omega0 ?? 0.5;
      x = k.map(n => Math.pow(a, n) * Math.sin(omega0 * n));
      break;
    }

    case 'caso-servomecanismo': {
      const T = params.T ?? 0.1;
      const a1 = Math.exp(-2.0 * T); // ~0.8187
      const a2 = Math.exp(-5.0 * T); // ~0.6065
      x = k.map(n => 4 * Math.pow(a1, n) - 3 * Math.pow(a2, n));
      break;
    }

    default:
      x = k.map(() => 0);
  }

  return { k, x };
}

/**
 * Calcula polos y estabilidad de un denominador de segundo orden: z^2 + a1*z + a2
 */
export function calcularPolosSegundoOrden(a1, a2) {
  const discriminante = a1 * a1 - 4 * a2;

  if (discriminante >= 0) {
    const p1 = (-a1 + Math.sqrt(discriminante)) / 2;
    const p2 = (-a1 - Math.sqrt(discriminante)) / 2;
    const radioMax = Math.max(Math.abs(p1), Math.abs(p2));
    return {
      tipo: 'reales',
      polos: [
        { re: p1, im: 0, mag: Math.abs(p1) },
        { re: p2, im: 0, mag: Math.abs(p2) }
      ],
      radioMax,
      esEstable: radioMax < 1.0,
      rocRadio: radioMax
    };
  } else {
    const re = -a1 / 2;
    const im = Math.sqrt(-discriminante) / 2;
    const mag = Math.sqrt(re * re + im * im);
    return {
      tipo: 'complejos-conjugados',
      polos: [
        { re, im, mag },
        { re, im: -im, mag }
      ],
      radioMax: mag,
      esEstable: mag < 1.0,
      rocRadio: mag
    };
  }
}

/**
 * Evalúa el caso del servomecanismo analíticamente
 */
export function obtenerCasoServomecanismo(T = 0.1) {
  const a1 = Math.exp(-2.0 * T);
  const a2 = Math.exp(-5.0 * T);
  const num_z0 = -(3.0 * a1 - 4.0 * a2);
  const den_a1 = -(a1 + a2);
  const den_a2 = a1 * a2;

  // Teorema del Valor Inicial: e[0] = lim_{z->inf} E(z) = 1
  const valorInicialAnalitico = 1.0;

  // Teorema del Valor Final: e[inf] = lim_{z->1} (1 - z^{-1}) E(z) = 0
  const valorFinalAnalitico = 0.0;

  return {
    T,
    a1,
    a2,
    num_z0,
    den_a1,
    den_a2,
    valorInicialAnalitico,
    valorFinalAnalitico,
    polos: [a1, a2],
    roc: a1 // Radio exterior para causalidad
  };
}
