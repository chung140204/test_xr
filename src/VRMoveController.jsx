import { useXR } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function VRMovementController({ camera }) {
  const { controllers = [] } = useXR();
  const moveSpeed = useRef(0.05); // Tốc độ di chuyển
  const deadzone = 0.1;

  useFrame(() => {
    controllers.forEach((controller) => {
      const gamepad = controller.inputSource?.gamepad;
      if (!gamepad || gamepad.axes.length < 4) return;

      const moveX = gamepad.axes[2]; // X-axis (trái/phải)
      const moveZ = gamepad.axes[3]; // Y-axis (lên/xuống)

      if (Math.abs(moveX) > deadzone || Math.abs(moveZ) > deadzone) {
        // Tính hướng di chuyển dựa trên hướng nhìn của camera
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0; // Chỉ move trên mặt phẳng ngang
        direction.normalize();

        // Vector vuông góc với hướng nhìn (để move trái/phải)
        const right = new THREE.Vector3();
        right.crossVectors(direction, camera.up);

        // Move tới/lùi và trái/phải
        camera.position.addScaledVector(direction, -moveZ * moveSpeed.current);
        camera.position.addScaledVector(right, moveX * moveSpeed.current);
      }
    });
  });

  return null;
}
