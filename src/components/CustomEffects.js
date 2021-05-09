import React, {useEffect, useRef, useMemo } from 'react';

import {  extend, useFrame, useThree ,useLoader} from '@react-three/fiber'

import * as THREE from 'three';

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

extend({ BloomPass, ShaderPass,TexturePass, RenderPass,ClearPass,EffectComposer})
function CustomEffects({ down }) {
    const composer = useRef();
    const effectRef=useRef();
    const { scene, gl, size, camera,clock } = useThree();
    const texture =useLoader(THREE.TextureLoader,"assets/smoke.png");
    const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
 
    useEffect(() => void composer.current.setSize(size.width, size.height), [size])
    useFrame(() => composer.current.render(clock.getDelta()), 1)

    return (
      <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" clear={false} clearAlpha={false} scene={scene} camera={camera} />

      <texturePass map={texture} opacity={0.2} />
     
    </effectComposer>
    )
  }
  export default CustomEffects;