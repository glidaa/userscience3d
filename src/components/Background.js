import React, {useReducer} from 'react';
import { extend, useFrame,useLoader} from '@react-three/fiber'
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
extend({ BloomEffect, EffectComposer, EffectPass, RenderPass})


function reducer(state, action) {
  switch (action.type) {
    case 'loaded':
      return state;
    default:
      throw new Error();
  }
}

const loadClouds=(texture,count)=>{
  var cloudParticles=[]
  var  cloudGeo = new THREE.PlaneBufferGeometry(500,500);
   var cloudMaterial = new THREE.MeshLambertMaterial({
     map:texture,
     transparent: true
   });
   
   for(let p=0; p<count; p++) {
       let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
       cloud.position.set(
           Math.random()*800 -400,
           500,
           Math.random()*500-500
         );
         cloud.rotation.x = 1.16;
         cloud.rotation.y = -0.12;
         cloud.rotation.z = Math.random()*2*Math.PI;
         cloud.material.opacity = 0.55;
       cloudParticles.push(cloud);
      
     }
     
     return cloudParticles;
}
  
function Background({ count, mouse }) {

    let cloudRefs=[]

    const texture =useLoader(THREE.TextureLoader,"assets/smoke.png")
    // eslint-disable-next-line no-unused-vars
    const [state] = useReducer(reducer,loadClouds(texture,count));
    useFrame(()=>{
        // eslint-disable-next-line array-callback-return
      cloudRefs.map((cloud)=>{
      cloud.current.rotation.z-=0.01
      cloud.current.position.x+=mouse.x*0.001
          return null;
      })
    })
    return (
        <>

        {
            state.map((cloud)=>{ var ref=React.createRef();
         cloudRefs.push(ref)
             return <primitive ref={ref} object={cloud}/>})}
        </>
        
    )
}
export default Background;