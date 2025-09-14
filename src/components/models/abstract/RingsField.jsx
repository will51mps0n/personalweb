// src/components/models/abstract/RingsField.jsx
import { useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

/* --------- tiny simplex noise --------- */
const snoise = `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  vec4 j = p - 49.0 * floor(p / 49.0);
  vec4 x_ = floor(j / 7.0);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = (x_ * 2.0 + 0.5)/7.0;
  vec4 y = (y_ * 2.0 + 0.5)/7.0;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 g0 = vec3(a0.xy,h.x);
  vec3 g1 = vec3(a1.xy,h.y);
  vec3 g2 = vec3(a0.zw,h.z);
  vec3 g3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3)));
  g0 *= norm.x; g1 *= norm.y; g2 *= norm.z; g3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m*m;
  return 42.0 * dot( m*m, vec4( dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3) ) );
}
`;

/* --------- shader material --------- */
const RingsMat = shaderMaterial(
  {
    uTime: 0,
    uBG: new THREE.Color("#0f0f13"),
    uLine: new THREE.Color("#ff4dac"),
    uInner: 0.18,        // inner hole radius
    uOuter: 0.48,        // outer radius
    uDensity: 140.0,     // how many lines
    uWidth: 0.03,        // band thickness (smaller = thinner lines)
    uNoiseAmp: 0.06,     // wobble amount
    uNoiseScale: 2.0,    // noise frequency
    uSpeed: 0.15         // animation speed
  },
  /* vertex */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }`,
  /* fragment */ `
  ${snoise}
  uniform float uTime;
  uniform vec3 uBG, uLine;
  uniform float uInner, uOuter, uDensity, uWidth, uNoiseAmp, uNoiseScale, uSpeed;
  varying vec2 vUv;

  void main(){
    vec2 p = vUv - 0.5;
    float t = uTime * uSpeed;
    float n = snoise(vec3(p * uNoiseScale, t)) * uNoiseAmp;
    float r = length(p) + n;

    // donut mask
    float ring = smoothstep(uInner, uInner+0.002, r) * (1.0 - smoothstep(uOuter-0.002, uOuter, r));

    // radial bands
    float bands = abs(fract(r * uDensity) - 0.5);
    float line = smoothstep(0.5 - uWidth, 0.5, bands);

    vec3 col = mix(uBG, uLine, line) * ring + uBG * (1.0 - ring);
    gl_FragColor = vec4(col, 1.0);
  }`
);

extend({ RingsMat });

export default function RingsField(props) {
  const mat = useRef();
  const { viewport } = useThree();

  // Animate time
  useFrame((_, dt) => {
    if (mat.current) mat.current.uTime += dt;
  });

  // full-viewport plane; sits “behind” your content
  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      renderOrder={-10}     // draw first
      {...props}
    >
      <planeGeometry args={[1, 1]} />
      <ringsMat ref={mat} transparent={false} depthWrite={false} />
    </mesh>
  );
}
