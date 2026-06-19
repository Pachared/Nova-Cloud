import * as THREE from "three";

export const LASER_FLOW_VERTEX_SHADER = `
precision highp float;
attribute vec3 position;
void main(){gl_Position=vec4(position,1.0);}
`;

export const LASER_FLOW_FRAGMENT_SHADER = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform float uWispDensity,uTiltScale,uFlowTime,uFogTime,uBeamXFrac,uBeamYFrac;
uniform float uFlowSpeed,uVLenFactor,uHLenFactor,uFogIntensity,uFogScale,uWSpeed,uWIntensity;
uniform float uFlowStrength,uDecay,uFalloffStart,uFogFallSpeed,uFade;
uniform vec3 uColor;
#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define EPS 1e-6
#define TAP_RADIUS 6
#define R_H 150.0
#define R_V 150.0
#define FLARE_HEIGHT 16.0
#define FLARE_AMOUNT 8.0
#define FLOW_PERIOD 0.5
#define W_LANES 10
#define W_BASE_X 1.5
#define W_LAYER_GAP 0.25
#define W_SIDE_DECAY 0.5
#define W_HALF 0.01
#define W_AA 0.15
#define W_CELL 20.0
#define W_SEG_MIN 0.01
#define W_SEG_MAX 0.55
float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}
float vnoise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);return mix(mix(h21(i),h21(i+vec2(1,0)),u.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),u.x),u.y);}
float fbm2(vec2 p){float v=0.0,a=0.6;mat2 m=mat2(0.86,0.5,-0.5,0.86);for(int i=0;i<5;++i){v+=a*vnoise(p);p=m*p*2.03+17.1;a*=0.52;}return v;}
float bs(vec2 p,vec2 q,float powr){float d=distance(p,q),f=powr*uFalloffStart,r=(f*f)/(d*d+EPS);return powr*min(1.0,r);}
float bsa(vec2 p,vec2 q,float powr,vec2 s){vec2 d=p-q;float dd=(d.x*d.x)/(s.x*s.x)+(d.y*d.y)/(s.y*s.y),f=powr*uFalloffStart,r=(f*f)/(dd+EPS);return powr*min(1.0,r);}
float tri01(float x){float f=fract(x);return 1.0-abs(f*2.0-1.0);}
float tauWf(float t,float tmin,float tmax){float e=0.0152,a=smoothstep(tmin,tmin+e,t),b=1.0-smoothstep(tmax-e,tmax,t);return max(0.0,a*b);}
float rGate(float x,float l){float a=smoothstep(0.0,W_AA,x),b=1.0-smoothstep(l,l+W_AA,x);return max(0.0,a*b);}
float vWisps(vec2 uv,float topF){
  float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL,d=clamp(uWispDensity,0.0,2.0);
  int lanes=int(max(1.0,floor(float(W_LANES)*min(d,1.0)+0.5)));float sp=min(d,1.0),sum=0.0;
  float cm=pow(clamp(1.0-y/18.0,0.0,1.0),2.0),xS=1.0+0.4*cm,bGain=pow(1.0-clamp(y/R_V,0.0,1.0),10.0);
  for(int s=0;s<2;++s){float sgn=s==0?-1.0:1.0;for(int i=0;i<W_LANES;++i){if(i>=lanes)break;float off=W_BASE_X+float(i)*W_LAYER_GAP,xc=sgn*(off*xS),dx=abs(uv.x-xc),lat=1.0-smoothstep(W_HALF,W_HALF+W_AA,dx),amp=exp(-off*W_SIDE_DECAY);float seed=h21(vec2(off,sgn*17.0)),yf2=yf+seed*7.0,ci=floor(yf2),fy=fract(yf2),seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));sum+=amp*lat*rGate(fy,seg)*step(h21(vec2(ci,off+sgn*31.0)),sp);}}
  return uWIntensity*sum*topF*bGain*smoothstep(-3.0,0.0,y)*(1.0-smoothstep(R_V-6.0,R_V,y));
}
void main(){
  vec2 C=iResolution.xy*.5,sc=(512.0/iResolution.xy)*.4,uv=(gl_FragCoord.xy-C)*sc;
  vec2 off=vec2(uBeamXFrac*iResolution.x*sc.x,uBeamYFrac*iResolution.y*sc.y),uvc=uv-off;
  float a=0.0,b=0.0,basePhase=1.5*PI+uDecay*.5,tauMin=basePhase-uDecay,tauMax=basePhase;
  float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.0,1.0),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);
  for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){float tu=tH+float(k)*0.0038,wt=tauWf(tu,tauMin,tauMax);if(wt<=0.0)continue;float spd=max(abs(sin(tu)),0.02),u=clamp((basePhase-tu)/max(uDecay,EPS),0.0,1.0),env=pow(1.0-abs(u*2.0-1.0),0.8);a+=wt*bs(uvc,vec2((R_H*uHLenFactor)*cos(tu),0.0),env*spd);}
  float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.0,1.0),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);
  for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){float tu=tV+float(k)*0.0038,wt=tauWf(tu,tauMin,tauMax);if(wt<=0.0)continue;float yb=(-R_V)*cos(tu),s=clamp(yb/R_V,0.0,1.0),spd=max(abs(sin(tu)),0.02),env=pow(1.0-s,0.6)*spd*(1.0-smoothstep(0.1,1.0,s));float fl=pow(tri01(s/FLOW_PERIOD+uFlowTime*uFlowSpeed),1.5);env*=mix(1.0-uFlowStrength,1.0,fl);float yp=(-R_V*uVLenFactor)*cos(tu),m=pow(smoothstep(FLARE_HEIGHT,0.0,yp),2.0);b+=wt*bsa(uvc,vec2(0.0,yp),step(0.0,yp)*env,vec2(1.0+FLARE_AMOUNT*m,1.0));}
  float topA=pow(1.0-smoothstep(0.1,1.0,clamp(yPix/R_V,0.0,1.0)),1.0),L=a+b*topA,w=vWisps(vec2(uvc.x,yPix),topA);
  vec2 fuv=uvc*uFogScale;float mAct=step(1.0,length(iMouse.xy)),nx=((iMouse.x-C.x)/max(C.x,1.0))*mAct,st=clamp(sign(nx)*pow(abs(nx),1.5)*uTiltScale,-0.35,0.35);vec2 dir=normalize(vec2(st,1.0));fuv+=uFogTime*uFogFallSpeed*dir;float n=pow(clamp(fbm2(fuv),0.0,1.0),1.2);float fog=n*uFogIntensity*(1.0-clamp(yPix/R_V,0.0,1.0))*smoothstep(0.0,0.75,L);
  float scene=L+fog,alpha=clamp(g(L+w*0.6),0.0,1.0),edge=pow(clamp(1.0-smoothstep(0.22,0.995,abs((gl_FragCoord.x-C.x)/max(C.x,1.0))),0.0,1.0),1.25);
  vec3 col=g(scene+w)*uColor;gl_FragColor=vec4(col*edge*uFade,alpha*edge*uFade);
}
`;

export function hexToRgb(hex: string) {
  let value = hex.replace("#", "").trim();
  if (value.length === 3) value = value.split("").map((x) => x + x).join("");
  const n = Number.parseInt(value, 16) || 0xffffff;
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}
