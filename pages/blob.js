import { Canvas } from "@react-three/fiber";
import { OrbitControls, CameraShake } from "@react-three/drei";
import { useControls } from "leva";

import { Particles } from "../components/Particles";

export default function BlobPage() {
  const props = useControls({
    focus: { value: 7.0, min: 3, max: 10, step: 0.01 },
    speed: { value: 32.1, min: 0.1, max: 100, step: 0.1 },
    aperture: { value: 5.6, min: 1, max: 5.6, step: 0.1 },
    fov: { value: 200, min: 0, max: 200 },
    curl: { value: 0.5, min: 0.01, max: 0.5, step: 0.01 },
  });

  return (
    <>
      <Canvas
        camera={{ fov: 25, position: [0, 0, 6] }}
        gl2={false}
        gl={{ antialias: true, alpha: true }}
        linear={true}
      >
        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={0.5}
          zoomSpeed={0.25}
        />
        <CameraShake
          yawFrequency={1}
          maxYaw={0.05}
          pitchFrequency={1}
          maxPitch={0.05}
          rollFrequency={0.5}
          maxRoll={0.5}
          intensity={0.2}
        />
        <Particles {...props} />
      </Canvas>
    </>
  );
}
