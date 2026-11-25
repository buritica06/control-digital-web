import{a as e,b as t,c as n,d as r,f as i,m as a,n as o,o as s,p as c,s as l,t as u,u as d,v as f,y as p}from"./three-utils-EUreK_Ci.js";var m={a1:-1.3,a2:.4,b0:1,mapa:`viridis`,curvas:!0},h=[{key:`a1`,label:`a₁ (y[k−1])`,min:-1.8,max:1.8,step:.05},{key:`a2`,label:`a₂ (y[k−2])`,min:-.95,max:1.15,step:.05},{key:`b0`,label:`b₀ (entrada)`,min:.2,max:2.5,step:.1},{key:`mapa`,label:`Mapa de color`,type:`select`,options:{Viridis:`viridis`,Magma:`magma`},folder:`Vista`},{key:`curvas`,label:`Curvas de nivel`,type:`boolean`,folder:`Vista`}],g=84,_=1.6,v=1.6,y=1.5,b=`
attribute float aT;
varying float vT;
varying vec3 vNormalV;
void main() {
  vT = aT;
  vNormalV = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,x=`
${u}
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
}`;function S(e,t,n,r,i){let a=e*e-t*t,o=2*e*t,s=Math.abs(i)*Math.hypot(a,o),c=a+n*e+r,l=o+n*t;return Math.min(6,s/Math.max(Math.hypot(c,l),.08))}function C(e,t){let n=e*e-4*t;if(n>=0){let t=Math.sqrt(n);return[{re:(-e+t)/2,im:0},{re:(-e-t)/2,im:0}]}let r=-e/2,i=Math.sqrt(-n)/2;return[{re:r,im:i},{re:r,im:-i}]}function w(u,{params:m,onInfo:h,ariaLabel:w}){let T,E={};function D(){let t=new e,r=new Float32Array(21168);for(let e=0;e<g;e++)for(let t=0;t<g;t++){let n=e*g+t;r[3*n]=-1.6+2*v*t/83,r[3*n+1]=-1.6+2*v*e/83}let i=[];for(let e=0;e<83;e++)for(let t=0;t<83;t++){let n=e*g+t;i.push(n,n+1,n+g+1,n,n+g+1,n+g)}return t.setIndex(i),t.setAttribute(`position`,new n(r,3)),t.setAttribute(`aT`,new n(new Float32Array(7056),1)),t}function O(){E.grid=T.makeGrid(2*v,12),E.grid.position.z=-.004,E.geom=D(),E.mat=new f({vertexShader:b,fragmentShader:x,uniforms:{uMap:{value:0},uContours:{value:1}},side:2,transparent:!0}),E.mesh=new i(E.geom,E.mat),T.scene.add(E.mesh);let n=[];for(let e=0;e<96;e++){let r=2*Math.PI*e/96;n.push(new t(Math.cos(r),Math.sin(r),.015))}E.unitCircle=new r(new e().setFromPoints(n),new d({color:16768813})),T.scene.add(E.unitCircle),E.stableDisk=new i(new s(1,64),new c({color:3906669,transparent:!0,opacity:.16,side:2})),E.stableDisk.position.z=.008,T.scene.add(E.stableDisk);let o=new p(.075,20,20),u=new l(.024,.024,1.6,12);u.rotateX(Math.PI/2),E.poleMeshes=[0,1].map(()=>{let e=new a({color:3906669,roughness:.35}),t=new i(o,e),n=new i(u,e);return T.scene.add(t,n),{sphere:t,pillar:n,mat:e}}),E.axisX=T.makeAxis(`x`,-1.6,1.75,`Re(z)`),E.axisY=T.makeAxis(`y`,-1.6,1.75,`Im(z)`),E.axisZ=T.makeAxis(`z`,0,1.8,`|G(z)|`),T.scene.add(E.grid,E.axisX,E.axisY,E.axisZ)}function k(e){let t=E.geom.attributes.position.array,n=E.geom.attributes.aT.array;for(let r=0;r<g;r++){let i=-1.6+2*_*r/83;for(let a=0;a<g;a++){let o=-1.6+2*_*a/83,s=r*g+a,c=S(o,i,e.a1,e.a2,e.b0),l=Math.log1p(c)/Math.log1p(6);t[3*s+2]=l*y,n[s]=l}}E.geom.attributes.position.needsUpdate=!0,E.geom.attributes.aT.needsUpdate=!0,E.geom.computeVertexNormals(),E.mat.uniforms.uMap.value=+(e.mapa===`magma`),E.mat.uniforms.uContours.value=+!!e.curvas;let r=C(e.a1,e.a2),i=0;r.forEach((e,t)=>{let n=Math.hypot(e.re,e.im);n>i&&(i=n);let r=Math.max(-1.6,Math.min(v,e.re)),a=Math.max(-1.6,Math.min(v,e.im)),o=E.poleMeshes[t];o.sphere.position.set(r,a,1.58),o.pillar.position.set(r,a,1.6/2),o.mat.color.setHex(n<1?3906669:14235706)}),E.stableDisk.material.color.setHex(i<1?3906669:14235706);let a=i<1;h?.({readouts:[{label:`Estabilidad`,value:a?`Polos dentro de |z| = 1 (Estable)`:`Polo fuera o sobre |z| = 1 (Inestable)`,state:a?`estable`:`inestable`},{label:`Radio máximo |p|`,value:i}],aria:`Superficie 3D de |G(z)| con a1=${e.a1}, a2=${e.a2}, b0=${e.b0}. Radio máximo de polos ${i.toFixed(3)}.`}),T.requestRender()}return{mount(){T=o(u,{camera:[3.2,-3.4,2.5],target:[0,0,.45],ariaLabel:w}),O(),k(m),T.start()},update:k,resize:()=>T?.resize(),restyle(){T?.refreshTheme()},resetCamera(){T?.resetCamera()},dispose(){T?.dispose()},get renderer(){return T?.renderer}}}export{h as controls,w as createScene,m as defaults};