import{EvaluationError as e,compileSafe as t,t as n}from"./evaluator-DTP888E0.js";import{i as r,l as i,n as a,r as o,s,t as c}from"./three-utils-DTFN7bXq.js";var l={expresion:`a*cos(b*x)*cos(b*y)`,a:1,b:1,rango:5,altura:1.4,mapa:`viridis`,curvas:!0,ejeX:`x`,ejeY:`y`,ejeZ:`z`},u=[{key:`expresion`,label:`z = f(x, y)`,type:`text`,lazy:!0},{key:`a`,label:`a`,min:-10,max:10,step:.01},{key:`b`,label:`b`,min:-5,max:5,step:.01},{key:`rango`,label:`Rango de x e y (±)`,min:.5,max:50,step:.5,folder:`Vista`},{key:`altura`,label:`Altura visual`,min:.3,max:3,step:.1,folder:`Vista`},{key:`mapa`,label:`Mapa de color`,type:`select`,options:{Viridis:`viridis`,Magma:`magma`},folder:`Vista`},{key:`curvas`,label:`Curvas de nivel`,type:`boolean`,folder:`Vista`}],d=96,f=1.6,p=`
attribute float aT;
varying float vT;
varying vec3 vNormalV;
void main() {
  vT = aT;
  vNormalV = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,m=`
${c}
uniform int uMap;
uniform float uContours;
varying float vT;
varying vec3 vNormalV;
void main() {
  vec3 base = uMap == 0 ? viridis(vT) : magma(vT);
  vec3 n = normalize(vNormalV);
  if (!gl_FrontFacing) n = -n;
  float diff = max(dot(n, normalize(vec3(0.35, 0.55, 0.75))), 0.0);
  vec3 col = srgbToLinear(base) * (0.55 + 0.55 * diff);
  if (uContours > 0.5) {
    float f = vT * 10.0;
    float line = 1.0 - smoothstep(0.0, 1.2 * fwidth(f), abs(fract(f - 0.5) - 0.5));
    col = mix(col, col * 0.35, line * 0.8);
  }
  gl_FragColor = vec4(col, 1.0);
}`;function h(c,{params:l,onInfo:u,ariaLabel:h}){let g,_={},v={min:0,max:0,muestras:[]};function y(){let e=new o,t=new Float32Array(27648);for(let e=0;e<d;e++)for(let n=0;n<d;n++){let r=e*d+n;t[3*r]=-1.6+2*f*n/95,t[3*r+1]=-1.6+2*f*e/95}let n=[];for(let e=0;e<95;e++)for(let t=0;t<95;t++){let r=e*d+t;n.push(r,r+1,r+d+1,r,r+d+1,r+d)}return e.setIndex(n),e.setAttribute(`position`,new r(t,3)),e.setAttribute(`aT`,new r(new Float32Array(9216),1)),e}function b(){_.grid=g.makeGrid(2*f,12),_.grid.position.z=-.003,_.geom=y(),_.mat=new i({vertexShader:p,fragmentShader:m,uniforms:{uMap:{value:0},uContours:{value:1}},side:2}),_.axisX=g.makeAxis(`x`,-1.6,1.75,l.ejeX),_.axisY=g.makeAxis(`y`,-1.6,1.75,l.ejeY),_.axisZ=g.makeAxis(`z`,0,2.2,l.ejeZ),_.tickX=g.makeLabel(``,{size:.09,anchorX:`center`,anchorY:`top`}),_.tickX.position.set(f,-.06,.01),_.tickY=g.makeLabel(``,{size:.09,anchorX:`right`}),_.tickY.position.set(-.06,f,.01),g.scene.add(new s(_.geom,_.mat),_.grid,_.axisX,_.axisY,_.axisZ,_.tickX,_.tickY)}function x(){let e=t(l.expresion,{variables:[`x`,`y`,`a`,`b`]}),r={a:n(l.a),b:n(l.b),x:n(0),y:n(0)},i=new Float64Array(9216),a=1/0,o=-1/0;for(let t=0;t<d;t++){r.y=n(l.rango*(-1+2*t/95));for(let s=0;s<d;s++){r.x=n(l.rango*(-1+2*s/95));let c=e.evaluateComplexFast(r),u=Number.isFinite(c.re)&&Math.abs(c.im)<1e-9?c.re:NaN;i[t*d+s]=u,u<a&&(a=u),u>o&&(o=u)}}return{z:i,min:a,max:o}}function S(t){Object.assign(l,t);let n=null;try{let{z:e,min:t,max:n}=x(),r=_.geom.attributes.position.array,i=_.geom.attributes.aT.array,a=n-t;for(let n=0;n<9216;n++){let o=Number.isNaN(e[n])?0:a>1e-12?(e[n]-t)/a:.5;i[n]=o,r[3*n+2]=o*l.altura}_.geom.attributes.position.needsUpdate=!0,_.geom.attributes.aT.needsUpdate=!0,_.geom.computeVertexNormals(),_.geom.computeBoundingSphere(),v={min:t,max:n,z:e}}catch(t){if(!(t instanceof e))throw t;n=t.message}_.mat.uniforms.uMap.value=+(l.mapa===`magma`),_.mat.uniforms.uContours.value=+!!l.curvas,g.setLabel(_.tickX,`${l.rango}`),g.setLabel(_.tickY,`${l.rango}`),g.requestRender();let{min:r,max:i,z:a}=v,o=Math.floor(d/8),s=[];if(a)for(let e=0;e<d;e+=o)for(let t=0;t<d;t+=o){let n=e=>l.rango*(-1+2*e/95);s.push([n(t),n(e),Number.isNaN(a[e*d+t])?`—`:a[e*d+t]])}u?.({readouts:[n?{label:`Expresión`,value:`No válida: ${n}`,state:`inestable`}:{label:`Expresión`,value:`Válida`,state:`estable`},{label:`z mínimo`,value:Number.isFinite(r)?r:`—`},{label:`z máximo`,value:Number.isFinite(i)?i:`—`}],aria:`Superficie z = ${l.expresion}, con valores entre ${Number.isFinite(r)?r.toFixed(2):`sin dato`} y ${Number.isFinite(i)?i.toFixed(2):`sin dato`}.`,table:{caption:`Muestra de valores de la superficie`,columns:[l.ejeX,l.ejeY,l.ejeZ],rows:s}})}function C(){let e=g.refreshTheme();for(let t of[_.axisX,_.axisY,_.axisZ])t.userData.line.material.color.copy(e.axis),t.userData.cone.material.color.copy(e.axis),t.userData.label.color=e.text;_.tickX.color=e.text,_.tickY.color=e.text,g.scene.remove(_.grid),_.grid.geometry.dispose(),_.grid.material.dispose(),_.grid=g.makeGrid(2*f,12),_.grid.position.z=-.003,g.scene.add(_.grid),S(l)}return{mount(){g=a(c,{ariaLabel:h,camera:[2.8,-3.8,3.1],target:[0,0,.5]}),b(),S(l),g.start()},update:S,resize:()=>g.resize(),restyle:C,dispose:()=>g?.dispose(),get renderer(){return g?.renderer}}}export{u as controls,h as createScene,l as defaults};