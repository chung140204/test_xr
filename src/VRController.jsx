import { useXR } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function VRController({ camera }) {
  const { controllers = [] } = useXR(); // Gán giá trị mặc định là mảng rỗng
  const zoomSpeed = useRef(0.1); // Tốc độ zoom

  // Lắng nghe joystick và nút bấm
  useFrame(() => {
    if (controllers.length > 0) { // Kiểm tra controllers có phần tử
      controllers.forEach((controller) => {
        if (controller.inputSource.gamepad) {
          const gamepad = controller.inputSource.gamepad;

          // Truy cập joystick
          const axes = gamepad.axes; // Trục joystick
          const zoomDirection = axes[1]; // Trục Y của joystick

          // Zoom in/out bằng joystick
          camera.position.z += zoomDirection * zoomSpeed.current;
          camera.position.z = Math.max(1, Math.min(camera.position.z, 10)); // Giới hạn khoảng cách

          // Xử lý nút bấm (ví dụ: nút đầu tiên)
          if (gamepad.buttons[0].pressed) {
            console.log("Button 0 pressed!");
          }
        }
      });
    }
  });

  return null; // Thành phần này không cần render gì
}