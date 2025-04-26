import { Canvas, useThree } from "@react-three/fiber";
import { PointerLockControls, KeyboardControls, OrbitControls } from "@react-three/drei";

import SelectBg from "./SelectBg";
import { useState } from "react";
import Scene2 from "./Scene2";
import Scene1 from "./scene1";
import { XR, createXRStore } from "@react-three/xr";
import VRController from "./VRController";
import VRMovementController from "./VRMoveController";

const store = createXRStore();
function CameraWrapper() {
    const { camera } = useThree(); // Lấy camera từ ngữ cảnh
    return <VRController camera={camera} />;
  }
export default function Play() {
    const [bgImg, setBgImg] = useState(null);
    const [scene, setScene] = useState(1);

    const handleTele = () => {
        if (scene === 1) {
            setScene(2);
        } else {
            setScene(1);
        }
    };

    return (
        <KeyboardControls
            map={[
                { name: "forward", keys: ["ArrowUp", "w", "W"] },
                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                { name: "left", keys: ["ArrowLeft", "a", "A"] },
                { name: "right", keys: ["ArrowRight", "d", "D"] },
            ]}
        >
            <button onClick={() => store.enterAR()}>Enter AR</button>

            <Canvas
                shadows
                camera={{ fov: 60, position: [30, 30, 30] }}
                onCreated={({ gl }) => {
                    gl.setSize(window.innerWidth, window.innerHeight);
                }}
            >
                <XR store={store}>
                    <ambientLight intensity={0.4} />
                    <pointLight intensity={1.5} position={[100, 100, 100]} />

                    {scene === 1 ? <Scene1 bgImg={bgImg} /> : <Scene2 />}

                    <mesh onClick={handleTele} position={[-10, 10, 10]}>
                        <boxGeometry args={[3, 3, 3]} />
                        <meshLambertMaterial attach="material" color="blue" />
                    </mesh>

                    {/* <OrbitControls makeDefault /> */}
                    <CameraWrapper />
                    <VRMovementController/>
                    
                </XR>
            </Canvas>
            <SelectBg setBgImg={setBgImg} />
            
        </KeyboardControls>
    );
}
