import"./modulepreload-polyfill.b7f2da20.js";const i=document.querySelector("#container"),o=document.querySelector("#canvas"),h=o==null?void 0:o.getContext("2d"),M=100,m=300,F=M*m,g=Math.pow(80,2),a=3,c=100,L=220,A=.95,C=.25,N={vx:0,vy:0,ox:0,oy:0,x:0,y:0};let E,x,S,R,D,O,f,r,s,d,u,v,I,y;function b(){!o||!i||!h||(E=!0,x=[],o.width=m*a+c*2,o.height=M*a+c*2,S=o.width,R=o.height,[...Array(F)].forEach((t,n)=>{const e=Object.create(N);e.x=e.ox=c+a*(n%m),e.y=e.oy=c+a*Math.floor(n/m),x[n]=e}),i.addEventListener("mousemove",t=>{const n=i.getBoundingClientRect();D=t.clientX-n.left,O=t.clientY-n.top}),w())}function w(){if(!h){console.error("container\u8981\u7D20\u307E\u305F\u306Fcanvas\u8981\u7D20\u304C\u307F\u3064\u304B\u308A\u307E\u305B\u3093");return}(E=!E)?x.forEach(t=>{r=D-t.x,s=O-t.y,f=r*r+s*s,d=-g/f,f<g&&(v=Math.atan2(s,r),t.vx+=d*Math.cos(v),t.vy+=d*Math.sin(v)),t.x+=(t.vx*=A)+(t.ox-t.x)*C,t.y+=(t.vy*=A)+(t.oy-t.y)*C}):(u=(I=h.createImageData(S,R)).data,x.forEach(t=>{u[y=(~~t.x+~~t.y*S)*4]=u[y+1]=u[y+2]=L,u[y+3]=255}),h.putImageData(I,0,0)),requestAnimationFrame(w)}b();
