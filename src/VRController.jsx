import { useFrame, useThree } from "@react-three/fiber";
import { useXR } from "@react-three/xr";
import { useRef } from "react";

export default function VRZoomController() {
  const { camera } = useThree(); // Lấy camera từ ngữ cảnh
  const { controllers = [] } = useXR();
  const zoomSpeed = useRef(0.5); // Tốc độ zoom
  const minFov = 30;
  const maxFov = 90;
  const deadzone = 0.1; // Độ nhạy joystick

  useFrame(() => {
    controllers.forEach((controller) => {
      const gamepad = controller.inputSource?.gamepad;
      if (!gamepad || gamepad.axes.length < 2) return;

      const zoomInput = gamepad.axes[1]; // Trục Y joystick
      if (Math.abs(zoomInput) > deadzone) {
        camera.fov += zoomInput * zoomSpeed.current;
        camera.fov = Math.max(minFov, Math.min(maxFov, camera.fov));
        camera.updateProjectionMatrix(); // Cập nhật camera sau khi đổi fov
      }
    });
  });

  return null;
}