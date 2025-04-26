import { Physics } from '@react-three/rapier';
import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import PlayerControls from './PlayerControl';
import { Ground } from './Ground';
import CubeContent from './CubeContent';
import Background from './Background';
import PivotObj from './PivotObj';

function Scene1({ bgImg }) {
  const { camera } = useThree();
  const zoomSpeed = useRef(0.1); // Tốc độ zoom
  const { controllers = [] } = useXR(); // Đảm bảo controllers luôn là một mảng

  // Lắng nghe sự kiện joystick
  useFrame(() => {
    if (controllers.length > 0) {
      controllers.forEach((controller) => {
        if (controller.inputSource.gamepad) {
          const axes = controller.inputSource.gamepad.axes; // Truy cập joystick
          const zoomDirection = axes[1]; // Trục Y của joystick
          camera.zoom += zoomDirection * zoomSpeed.current; // Điều chỉnh zoom
          camera.zoom = Math.max(1, Math.min(camera.zoom, 10)); // Giới hạn zoom
          camera.updateProjectionMatrix();
        }
      });
    }
  });

  return (
    <group>
      {/* <PointerLockControls /> */}
      {/* <Physics>
        <PlayerControls />
        <Ground />
        <CubeContent />
      </Physics> */}
      <Background bgImg={bgImg} />
      {/* <PivotObj /> */}
    </group>
  );
}

export default Scene1;