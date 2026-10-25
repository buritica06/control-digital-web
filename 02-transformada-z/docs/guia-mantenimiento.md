---
tipo: documentacion_web
asignatura: '[[MEC36 - Control II]]'
semana: 2
---

# Guía de Mantenimiento y Extensión

> **MEC36 — Control II** · Institución Universitaria de Barranquilla (IUB)

---

## 1. Convenciones de Código

- **JavaScript:** ES6+ modular (`import`/`export`).
- **Nombres de archivos:** `camelCase` para módulos de visualización (`planoZ.js`, `respuestaEscalon.js`), `kebab-case` para carpetas de capítulos (`01-mapeo-conforme`).
- **Identificadores:** Nombres explícitos y autodescriptivos en español o terminología estándar de control discreto.
- **Fórmulas matemáticas:** Usar siempre KaTeX con delimitadores estándar `$...$` y `$$...$$` o macros de `katex-macros.js`.

---

## 2. Checklist Antes de Publicar o Hacer Deploy

Antes de fusionar cambios a `main`:
- [ ] ¿El archivo `index.html` carga sin errores de consola al abrir con `python servir_local.py`?
- [ ] ¿Las dos escenas 3D (`planoZ.js` y `superficieROC.js`) rotan con suavidad y responden al redimensionar la ventana?
- [ ] ¿Las gráficas Plotly 2D tienen los títulos fuera del área de trazado y las leyendas en la parte inferior?
- [ ] ¿Los controles lil-gui están situados dentro de sus paneles laterales `<aside>` sin superponerse a los datos?
- [ ] ¿El contraste de color en textos cumple con WCAG AA ($\ge 4.5:1$)?
- [ ] ¿Las fórmulas en dispositivos móviles permiten desplazamiento horizontal sin romper el layout?
- [ ] ¿La barra de progreso registra los avances y persiste en `localStorage`?

---

## 3. Actualización de Dependencias

```bash
# Revisar versiones desactualizadas
npm outdated

# Actualizar respetando versiones semánticas menores
npm update

# Comprobar la compilación final
npm run build
```
