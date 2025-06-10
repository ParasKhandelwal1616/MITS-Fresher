import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingParticles = () => {
  const particlesRef = useRef();
  const count = 2000;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 20 + 10;
      const speed = Math.random() / 50;
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      const z = Math.random() * 200 - 100;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    particles.forEach((particle, i) => {
      let { time, factor, speed, x, y, z } = particle;

      // Update position
      const t = time + elapsedTime * speed;
      dummy.position.set(
        x + Math.cos(t) * factor,
        y + Math.sin(t) * factor,
        z + Math.cos(t) * factor
      );

      // Set scale
      const scale = Math.cos(t) / 10 + 0.1;
      dummy.scale.set(scale, scale, scale);

      // Update matrix
      dummy.updateMatrix();
      
      // Set the matrix to the instance
      particlesRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[null, null, count]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
    </instancedMesh>
  );
};

export default FloatingParticles;