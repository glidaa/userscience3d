import React, { Suspense, useRef} from 'react';

import { Canvas } from '@react-three/fiber'

import {PerspectiveCamera, Stars} from "@react-three/drei";

import Clouds from './Clouds';

import Background from './Background';
import useMouse from '@react-hook/mouse-position'
//Implement click feature
function Container() {
    const ref =useRef(null);
    const mouse = useMouse(ref, {
      enterDelay: 100,
      leaveDelay: 100,
    })
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    return (
        <>
         <div ref={ref}>
            <Canvas
               
                pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
             
                onCreated={({ gl }) => {
                  
                    gl.setSize(window.innerWidth,window.innerHeight)
                }}>
                <fog attach="fog" args={[0x03544e,0.001]} />
                <PerspectiveCamera makeDefault  position={[0,0,1]} rotation = {[1.16,-0.12,0.27]}/>
                <ambientLight color={0x555555}/>
                <directionalLight color={0xff8c19} position={[0, 0,0]}/>
                <pointLight color={0xcc6600} intensity={50} distance={450} decay={1.7} position={[200, 300, 100]}/>
                <pointLight color={0xd8547e} intensity={50} distance={450} decay={1.7} position={[100, 300, 100]}/>
                <pointLight color={0x3677ac} intensity={50} distance={450} decay={1.7} position={[300, 300, 200]}/>
                <Clouds count={100} mouse={mouse}/>
                <Suspense fallback={null}>
                    <Background count={100} mouse={{x:mouse.x-( window.innerWidth / 2),y:(window.innerHeight / 2)-mouse.y}}/>
                </Suspense>
                <Clouds count={500} mouse={{x:mouse.x- (window.innerWidth / 2),y: (window.innerHeight / 2)-mouse.y}}/>
                <Stars
                radius={100} 
                depth={50} 
                count={5000} 
                factor={4} 
                saturation={0} 
                 />
            </Canvas>
           
      Hover me and see where I am relative to the element:
      <br />
      x: ${mouse.x- (window.innerWidth / 2)}
      y: ${mouse.y - (window.innerHeight / 2)}
    </div>
        </>
    )}

export default Container;
