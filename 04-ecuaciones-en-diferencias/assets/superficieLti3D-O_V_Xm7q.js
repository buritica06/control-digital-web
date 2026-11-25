import{a as e,d as t,g as n,h as r,l as i,m as a,n as o,p as s,s as c,t as l,u}from"./three-utils-CxhWkYlZ.js";var d={a1:-1.3,a2:.4,b0:1,mapa:`viridis`,curvas:!0},f=[{key:`a1`,label:`a₁ (y[k−1])`,min:-1.8,max:1.8,step:.05},{key:`a2`,label:`a₂ (y[k−2])`,min:-.95,max:1.15,step:.05},{key:`b0`,label:`b₀ (entrada)`,min:.2,max:2.5,step:.1},{key:`mapa`,label:`Mapa de color`,type:`select`,options:{Viridis:`viridis`,Magma:`magma`},folder:`Vista`},{key:`curvas`,label:`Curvas de nivel`,type:`boolean`,folder:`Vista`}],p=84,m=1.6,h=1.6,g=1.5,_=`
attribute float aT;
varying float vT;
varying vec3 vNormalV;
void main() {
  vT = aT;
  vNormalV = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,v=`
${l}
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
  gl_FragColor = vec4(col, 0.92);
}`;function y(e,t,n,r,i){let a=e*e-t*t,o=2*e*t,s=Math.abs(i)*Math.hypot(a,o),c=a+n*e+r,l=o+n*t;return Math.min(6,s/Math.max(Math.hypot(c,l),.08))}function b(e,t){let n=e*e-4*t;if(n>=0){let t=Math.sqrt(n);return[{re:(-e+t)/2,im:0},{re:(-e-t)/2,im:0}]}let r=-e/2,i=Math.sqrt(-n)/2;return[{re:r,im:i},{re:r,im:-i}]}function x(l,{params:d,onInfo:f,ariaLabel:x}){let S,C={};function w(){let t=new e,n=new Float32Array(21168);for(let e=0;e<p;e++)for(let t=0;t<p;t++){let r=e*p+t;n[3*r]=-1.6+2*h*t/83,n[3*r+1]=-1.6+2*h*e/83}let r=[];for(let e=0;e<83;e++)for(let t=0;t<83;t++){let n=e*p+t;r.push(n,n+1,n+p+1,n,n+p+1,n+p)}return t.setIndex(r),t.setAttribute(`position`,new c(n,3)),t.setAttribute(`aT`,new c(new Float32Array(7056),1)),t}function T(){C.grid=S.makeGrid(2*h,12),C.grid.position.z=-.004,C.geom=w(),C.mat=new a({vertexShader:_,fragmentShader:v,uniforms:{uMap:{value:0},uContours:{value:1}},side:2,transparent:!0}),C.mesh=new t(C.geom,C.mat),S.scene.add(C.mesh);let o=[];for(let e=0;e<96;e++){let t=2*Math.PI*e/96;o.push(new n(Math.cos(t),Math.sin(t),.015))}C.unitCircle=new u(new e().setFromPoints(o),new i({color:16768813})),S.scene.add(C.unitCircle);let c=new r(.065,20,20);C.poleMeshes=[0,1].map(()=>{let e=new t(c,new s({color:3906669,roughness:.35}));return S.scene.add(e),e}),C.axisX=S.makeAxis(`x`,-1.6,1.75,`Re(z)`),C.axisY=S.makeAxis(`y`,-1.6,1.75,`Im(z)`),C.axisZ=S.makeAxis(`z`,0,1.8,`|G(z)|`),S.scene.add(C.grid,C.axisX,C.axisY,C.axisZ)}function E(e){let t=C.geom.attributes.position.array,n=C.geom.attributes.aT.array;for(let r=0;r<p;r++){let i=-1.6+2*m*r/83;for(let a=0;a<p;a++){let o=-1.6+2*m*a/83,s=r*p+a,c=y(o,i,e.a1,e.a2,e.b0),l=Math.log1p(c)/Math.log1p(6);t[3*s+2]=l*g,n[s]=l}}C.geom.attributes.position.needsUpdate=!0,C.geom.attributes.aT.needsUpdate=!0,C.geom.computeVertexNormals(),C.mat.uniforms.uMap.value=+(e.mapa===`magma`),C.mat.uniforms.uContours.value=+!!e.curvas;let r=b(e.a1,e.a2),i=0;r.forEach((e,t)=>{let n=Math.hypot(e.re,e.im);n>i&&(i=n);let r=C.poleMeshes[t];r.position.set(Math.max(-1.6,Math.min(h,e.re)),Math.max(-1.6,Math.min(h,e.im)),.06),r.material.color.setHex(n<1?3906669:14235706)});let a=i<1;f?.({readouts:[{label:`Estabilidad`,value:a?`Polos dentro de |z| = 1 (Estable)`:`Polo fuera o sobre |z| = 1 (Inestable)`,state:a?`estable`:`inestable`},{label:`Radio máximo |p|`,value:i}],aria:`Superficie 3D de |G(z)| con a1=${e.a1}, a2=${e.a2}, b0=${e.b0}. Radio máximo de polos ${i.toFixed(3)}.`}),S.requestRender()}return{mount(){S=o(l,{camera:[3.2,-3.4,2.5],target:[0,0,.45],ariaLabel:x}),T(),E(d)},update:E,restyle(){S.refreshTheme()},resetCamera(){S.resetCamera()},dispose(){S.dispose()}}}export{f as controls,x as createScene,d as defaults};