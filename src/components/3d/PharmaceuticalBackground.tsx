'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sphere, Ring } from '@react-three/drei'
import * as THREE from 'three'

// Molecular structure component
const MolecularStructure = ({ position, color }: { position: [number, number, number], color: string }) => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  const nodes = useMemo(() => {
    const positions = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      positions.push([
        Math.cos(angle) * 1.5,
        Math.sin(angle * 2) * 0.5,
        Math.sin(angle) * 1.5,
      ])
    }
    return positions
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {nodes.map((nodePos, index) => (
          <group key={index} position={nodePos as [number, number, number]}>
            <Sphere args={[0.1, 16, 16]}>
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
            </Sphere>
            {index < nodes.length - 1 && (
              <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
                <meshStandardMaterial color={color} opacity={0.6} transparent />
              </mesh>
            )}
          </group>
        ))}
        
        {/* Central core */}
        <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* Orbital rings */}
        <Ring args={[1.2, 1.3, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={color} transparent opacity={0.3} />
        </Ring>
        <Ring args={[1.8, 1.9, 32]} rotation={[0, Math.PI / 2, Math.PI / 4]}>
          <meshStandardMaterial color={color} transparent opacity={0.2} />
        </Ring>
      </group>
    </Float>
  )
}

// Floating particles component
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.InstancedMesh>(null)
  const particleCount = 50
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      scales[i] = Math.random() * 0.5 + 0.1
    }
    
    return { positions, scales }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < particleCount; i++) {
        const matrix = new THREE.Matrix4()
        const position = new THREE.Vector3(
          particles.positions[i * 3] + Math.sin(time * 0.5 + i) * 0.5,
          particles.positions[i * 3 + 1] + Math.cos(time * 0.3 + i) * 0.3,
          particles.positions[i * 3 + 2] + Math.sin(time * 0.4 + i) * 0.4
        )
        
        matrix.makeTranslation(position.x, position.y, position.z)
        matrix.scale(new THREE.Vector3(particles.scales[i], particles.scales[i], particles.scales[i]))
        
        particlesRef.current.setMatrixAt(i, matrix)
      }
      
      particlesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial 
        color="#62c6c2" 
        emissive="#62c6c2"
        emissiveIntensity={0.1}
        transparent 
        opacity={0.6} 
      />
    </instancedMesh>
  )
}

// Main scene component
const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#62c6c2" />
      
      {/* Molecular structures */}
      <MolecularStructure position={[-8, 3, -5]} color="#40296e" />
      <MolecularStructure position={[8, -2, -8]} color="#62c6c2" />
      <MolecularStructure position={[0, 5, -10]} color="#2E2A2B" />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Background elements */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[12, 8, -15]} rotation={[0, 0, scrollProgress * 0.5]}>
          <Ring args={[3, 3.2, 64]}>
            <meshStandardMaterial color="#40296e" transparent opacity={0.1} />
          </Ring>
          <Ring args={[4, 4.1, 64]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#62c6c2" transparent opacity={0.08} />
          </Ring>
        </group>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[-12, -6, -12]} rotation={[0, 0, -scrollProgress * 0.3]}>
          <Ring args={[2, 2.1, 32]}>
            <meshStandardMaterial color="#2E2A2B" transparent opacity={0.12} />
          </Ring>
        </group>
      </Float>
    </>
  )
}

// Main component
interface PharmaceuticalBackgroundProps {
  scrollProgress?: number
}

export default function PharmaceuticalBackground({ scrollProgress = 0 }: PharmaceuticalBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Scene scrollProgress={scrollProgress} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.2}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
    </div>
  )
} 