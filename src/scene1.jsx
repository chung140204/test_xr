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