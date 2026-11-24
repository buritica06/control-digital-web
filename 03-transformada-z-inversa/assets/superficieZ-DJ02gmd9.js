import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./three-utils-BWvYgZIw.js";var l={r:.6,thetaDeg:48.19,rCauchy:1.18,altura:1.5,mapa:`viridis`,curvas:!0},u=[{key:`r`,label:`Radio de polos r`,min:.2,max:1.12,step:.02},{key:`thetaDeg`,label:`Ángulo θ (°)`,min:10,max:170,step:1},{key:`rCauchy`,label:`Contorno de Cauchy |z|`,min:1.05,max:1.45,step:.02,folder:`Contorno`},{key:`altura`,label:`Altura visual`,min:.5,max:2.6,step:.1,folder:`Vista`},{key:`mapa`,label:`Mapa de color`,type:`select`,options:{Viridis:`viridis`,Magma:`magma`},folder:`Vista`},{key:`curvas`,label:`Curvas de nivel`,type:`boolean`,folder:`Vista`}],d=96,f=1.5,p=1.6,m=`
attribute float aT;
varying float vT;
varying vec3 vNormalV;
void main() {
  vT = aT;
  vNormalV = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,h=`
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
}`;function g(e,t,n,r){let i=e*e-t*t,a=2*e*t,o=.3678*i+.2642*e,s=.3678*a+.2642*t,c=Math.hypot(o,s),l=n*Math.cos(r),u=n*Math.sin(r),d=Math.hypot(e-1,t),f=Math.hypot(e-l,t-u),p=Math.hypot(e-l,t+u),m=Math.max(d*f*p,.015);return Math.tanh(c/m*.18)}function _(e,t,n=128){let i=[],a=p/f;for(let o=0;o<n;o++){let s=2*Math.PI*o/n,c=e*Math.cos(s),l=e*Math.sin(s);i.push(new r(c*a,l*a,t(c,l)))}return new o().setFromPoints(i)}function v(r,{params:c,onInfo:l,ariaLabel:u}){let v,y={};function b(){let e=new o,t=new Float32Array(27648);for(let e=0;e<d;e++)for(let n=0;n<d;n++){let r=e*d+n;t[3*r]=-1.6+2*p*n/95,t[3*r+1]=-1.6+2*p*e/95}let r=[];for(let e=0;e<95;e++)for(let t=0;t<95;t++){let n=e*d+t;r.push(n,n+1,n+d+1,n,n+d+1,n+d)}return e.setIndex(r),e.setAttribute(`position`,new n(t,3)),e.setAttribute(`aT`,new n(new Float32Array(9216),1)),e}function x(){y.grid=v.makeGrid(2*p,12),y.grid.position.z=-.003,y.geom=b(),y.mat=new t({vertexShader:m,fragmentShader:h,uniforms:{uMap:{value:0},uContours:{value:1}},side:2}),y.axisX=v.makeAxis(`x`,-1.6,1.75,`Re(z)`),y.axisY=v.makeAxis(`y`,-1.6,1.75,`Im(z)`),y.axisZ=v.makeAxis(`z`,0,2.2,`|Y(z)|`),y.unitCircle=new a(_(1,()=>.025),new e({color:16768813})),y.cauchyLoop=new a(_(c.rCauchy,()=>.05),new e({color:3462041})),v.scene.add(new s(y.geom,y.mat),y.grid,y.axisX,y.axisY,y.axisZ,y.unitCircle,y.cauchyLoop)}function S(e){Object.assign(c,e);let t=c.thetaDeg*Math.PI/180,n=y.geom.attributes.position.array,r=y.geom.attributes.aT.array;for(let e=0;e<d;e++){let i=f*(-1+2*e/95);for(let a=0;a<d;a++){let o=f*(-1+2*a/95),s=e*d+a,l=g(o,i,c.r,t);r[s]=l,n[3*s+2]=l*c.altura}}y.geom.attributes.position.needsUpdate=!0,y.geom.attributes.aT.needsUpdate=!0,y.geom.computeVertexNormals(),y.geom.computeBoundingSphere(),y.cauchyLoop.geometry.dispose(),y.cauchyLoop.geometry=_(c.rCauchy,(e,n)=>g(e,n,c.r,t)*c.altura+.03),y.mat.uniforms.uMap.value=+(c.mapa===`magma`),y.mat.uniforms.uContours.value=+!!c.curvas,v.requestRender();let i=Math.max(1,c.r),a=c.rCauchy>i+1e-6,o=c.r*Math.cos(t),s=c.r*Math.sin(t);l?.({readouts:[{label:`Polos complejos`,value:`${o.toFixed(2)} ± j${s.toFixed(2)}`},{label:`Estabilidad (polos)`,value:c.r<1?`Interior (r < 1)`:c.r===1?`Sobre |z|=1`:`Exterior (r > 1)`,state:c.r<1?`estable`:c.r===1?`marginal`:`inestable`},{label:`Contorno de Cauchy`,value:a?`Válido (|z|=${c.rCauchy.toFixed(2)} > ${i.toFixed(2)})`:`No encierra todos los polos`,state:a?`estable`:`inestable`}],aria:`Superficie 3D de |Y(z)| con polos complejos en radio ${c.r.toFixed(2)} y contorno de Cauchy en radio ${c.rCauchy.toFixed(2)}.`,table:{caption:`Ubicación de polos respecto al círculo unitario y contorno de Cauchy`,columns:[`Elemento`,`Radio |z|`,`Ángulo (°)`],rows:[[`Polo de entrada z₁`,1,0],[`Polo conjugado z₂`,Number(c.r.toFixed(3)),Number(c.thetaDeg.toFixed(1))],[`Polo conjugado z₃`,Number(c.r.toFixed(3)),Number((-c.thetaDeg).toFixed(1))],[`Contorno de Cauchy C`,Number(c.rCauchy.toFixed(3)),`0 a 360`]]}})}function C(){let e=v.refreshTheme();for(let t of[y.axisX,y.axisY,y.axisZ])t.userData.line.material.color.copy(e.axis),t.userData.cone.material.color.copy(e.axis),t.userData.label.color=e.text;v.scene.remove(y.grid),y.grid.geometry.dispose(),y.grid.material.dispose(),y.grid=v.makeGrid(2*p,12),y.grid.position.z=-.003,v.scene.add(y.grid),S(c)}return{mount(){v=i(r,{ariaLabel:u,camera:[2.7,-3.6,2.9],target:[0,0,.45]}),x(),S(c),v.start()},update:S,resize:()=>v.resize(),restyle:C,dispose:()=>v?.dispose(),get renderer(){return v?.renderer}}}export{u as controls,v as createScene,l as defaults};