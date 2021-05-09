import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import {PerspectiveCamera, Stars, useTextureLoader} from "@react-three/drei";




function Nebula({ count, mouse }) {
    const mesh = useRef()
    const light = useRef()
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width

    const dummy = useMemo(() => new THREE.Object3D(), [])
    // Generate some random positions, speed factors and timings
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() /10000
            const xFactor =  100
            const yFactor =  100
            const zFactor =  Math.random() * 10
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])
    // The innards of this hook will run every frame
    useFrame(state => {
        // Makes the light follow the mouse
        light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
        // Run through the randomized data to calculate some movement
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            // There is no sense or reason to any of this, just messing around with trigonometric functions
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            particle.mx += (mouse.current[0] - particle.mx) * 0.01
            particle.my += (mouse.current[1] * -1 - particle.my) * 0.01
            // Update the dummy object
            dummy.position.set(
                (particle.mx / 10) + Math.cos((t / 10) ) + (Math.cos(t * 1) * factor) / 10,
                (particle.my / 100) + Math.sin((t / 10) ) + (Math.sin(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s*5, (particle.my / 1000) +Math.sin((t / 10) ) + (Math.cos(t * 2) * factor) / 10,s * 5)
            dummy.updateMatrix()
            // And apply the matrix to the instanced item
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
            <pointLight ref={light} color={0xcc6600} intensity={10} distance={40}  position={[200, 300, 0]}/>
            <pointLight ref={light} color={0xd8547e} intensity={5} distance={40}  position={[100, 300, 100]}/>
            <pointLight  ref={light} color={0x3677ac} intensity={12} distance={440} d position={[300, 300, 200]}/>
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} />
                <meshPhongMaterial attach="material" color="#050505" />
            </instancedMesh>
        </>
    )
}
export default Nebula;


