/**
 * Factoría para creación y gestión de paneles lil-gui.
 * Cumple con la regla anti-superposición: se monta en un contenedor externo dedicado.
 */

export function createGUI(container, params, onChange, options = {}) {
  const LilGuiClass = typeof window !== 'undefined' && window.lil && window.lil.GUI 
    ? window.lil.GUI 
    : null;

  if (!LilGuiClass) {
    console.warn('lil-gui no está disponible. Creando panel HTML accesible de respaldo.');
    return createHTMLFallbackGUI(container, params, onChange, options);
  }

  // Limpiar contenedor previo
  container.innerHTML = '';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', options.title || 'Panel de Parámetros');

  const gui = new LilGuiClass({
    container: container,
    title: options.title || 'Parámetros',
    width: options.width || 280,
    autoPlace: false,
  });

  const controllers = {};

  if (options.controllers) {
    for (const conf of options.controllers) {
      let ctrl;
      if (conf.options) {
        ctrl = gui.add(params, conf.property, conf.options);
      } else {
        ctrl = gui.add(params, conf.property, conf.min ?? 0, conf.max ?? 1, conf.step ?? 0.01);
      }

      if (conf.name) ctrl.name(conf.name);

      ctrl.onChange((val) => {
        if (typeof onChange === 'function') {
          onChange(conf.property, val, params);
        }
      });

      controllers[conf.property] = ctrl;
    }
  }

  return {
    gui,
    controllers,
    destroy() {
      gui.destroy();
      container.innerHTML = '';
    },
    updateDisplay() {
      for (const ctrl of Object.values(controllers)) {
        ctrl.updateDisplay();
      }
    }
  };
}

/**
 * Fallback accesible nativo en caso de que lil-gui no esté cargado
 */
function createHTMLFallbackGUI(container, params, onChange, options = {}) {
  container.innerHTML = `
    <div class="gui-fallback p-3 bg-space-850 rounded-lg text-xs space-y-3">
      <div class="font-bold text-iub-amarillo uppercase tracking-wide">${options.title || 'Controles'}</div>
      <div id="gui-inputs" class="space-y-2"></div>
    </div>
  `;

  const inputContainer = container.querySelector('#gui-inputs');
  const controllers = {};

  if (options.controllers) {
    for (const conf of options.controllers) {
      const row = document.createElement('div');
      row.className = 'flex flex-col gap-1';
      const label = document.createElement('label');
      label.className = 'flex justify-between text-slate-300';
      label.innerHTML = `<span>${conf.name || conf.property}</span> <span class="font-mono text-iub-azulClaro" id="val-${conf.property}">${params[conf.property]}</span>`;

      const input = document.createElement('input');
      input.type = 'range';
      input.min = conf.min ?? 0;
      input.max = conf.max ?? 1;
      input.step = conf.step ?? 0.01;
      input.value = params[conf.property];
      input.className = 'w-full accent-iub-amarillo cursor-pointer';

      input.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        params[conf.property] = val;
        const valSpan = row.querySelector(`#val-${conf.property}`);
        if (valSpan) valSpan.textContent = val;
        if (typeof onChange === 'function') {
          onChange(conf.property, val, params);
        }
      });

      row.appendChild(label);
      row.appendChild(input);
      inputContainer.appendChild(row);
      controllers[conf.property] = { input };
    }
  }

  return {
    controllers,
    destroy() {
      container.innerHTML = '';
    },
    updateDisplay() {}
  };
}
