import * as THREE from "three";
import { extend } from "@react-three/fiber";

class DotPointsMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        uniform sampler2D positions;
        uniform float uTime;
        uniform float uFocus;
        uniform float uFov;
        uniform float uBlur;
        varying float vDistance;
        varying float vTime;

        void main() { 
          vTime = uTime;
          vec3 pos = texture2D(positions, position.xy).xyz;

          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          // modelPosition.x -= sin(modelPosition.x * 10.0) * 0.2;
          // modelPosition.y += sin(modelPosition.y * 10.0) * 0.1;
          // modelPosition.z += sin(modelPosition.z * 10.0) * 0.3;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;

          gl_Position = projectedPosition;

          vDistance = uFocus - -viewPosition.z;
          gl_PointSize = (step(1.0 - (1.0 / uFov), position.x)) * vDistance * uBlur;
        }
      `,
      fragmentShader: `
        varying float vDistance;
        varying float vTime;

        float random (vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          if (dot(cxy, cxy) > 1.0) discard;
          // gl_FragColor = vec4(vec3(1.0, 0.5, 0.0), (1.04 - clamp(vDistance * 1.5, 0.0, 1.0)));

          // gl_FragColor = vec4(
          //   abs(sin(vTime * vDistance)),
          //   0.0,
          //   0.0,
          //   1.04 - clamp(vDistance * 1.5, 0.0, 1.0)
          // );
          
          gl_FragColor = vec4(
            clamp(gl_FragCoord.r * vDistance * 0.5, 0.0, 1.0), 
            clamp(gl_FragCoord.r * vDistance * 0.01, 0.0, 1.0),
            clamp(gl_FragCoord.r  * 0.3, 0.0, 1.0),
            1.04 - clamp(vDistance * 1.5, 0.0, 1.0)
          );
          //gl_FragColor = vec4(vec2(gl_PointCoord * 0.4), 0.0, (1.04 - clamp(vDistance * 1.5, 0.0, 1.0)));
          //gl_FragColor = vec4(vec3(random( vUv )), 1.0);
        }
      `,
      uniforms: {
        positions: { value: null },
        uTime: { value: 0 },
        uFocus: { value: 5.1 },
        uFov: { value: 50 },
        uBlur: { value: 30 },
      },
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
  }
}

extend({ DotPointsMaterial });
