'use client'

import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Ring, Text, Trail, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Animation presets
const animationPresets = {
  molecularOrbital: {
    name: 'Molecular Orbital Visualization',
    description: 'Electron orbital paths around molecular structures',
    speed: 0.5,
    complexity: 'high'
  },
  enzymeBinding: {
    name: 'Enzyme-Substrate Binding',
    description: 'Drug molecule binding to target enzyme',
    speed: 0.3,
    complexity: 'medium'
  },
  cellMembrane: {
    name: 'Cell Membrane Permeation',
    description: 'Drug crossing cellular barriers',
    speed: 0.7,
    complexity: 'high'
  },
  proteinFolding: {
    name: 'Protein Folding Dynamics',
    description: 'Therapeutic protein structure formation',
    speed: 0.4,
    complexity: 'very-high'
  }
}

// Molecular orbital component
const MolecularOrbital = ({ radius = 2, color = '#40296e', speed = 1 }: {
  radius?: number
  color?: string
  speed?: number
}) => {
  const orbitalRef = useRef<THREE.Group>(null)
  const electronRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (orbitalRef.current) {
      orbitalRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2
      orbitalRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.1) * 0.3
    }
    
    if (electronRef.current) {
      const time = state.clock.elapsedTime * speed
      electronRef.current.position.x = Math.cos(time) * radius
      electronRef.current.position.y = Math.sin(time * 0.7) * radius * 0.5
      electronRef.current.position.z = Math.sin(time) * radius
    }
  })

  return (
    <group ref={orbitalRef}>
      {/* Orbital rings */}
      <Ring args={[radius - 0.1, radius + 0.1, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </Ring>
      <Ring args={[radius - 0.1, radius + 0.1, 64]} rotation={[0, Math.PI / 2, Math.PI / 3]}>
        <meshStandardMaterial color={color} transparent opacity={0.2} />
      </Ring>
      <Ring args={[radius - 0.1, radius + 0.1, 64]} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <meshStandardMaterial color={color} transparent opacity={0.25} />
      </Ring>
      
      {/* Electron */}
      <Trail
        width={0.1}
        length={20}
        color={color}
        attenuation={(t) => t * t}
      >
        <Sphere ref={electronRef} args={[0.05, 16, 16]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Trail>
    </group>
  )
}

// Enhanced molecular structure with animations
const AnimatedMolecularStructure = ({ position = [0, 0, 0], scale = 1, animationType = 'breathing' }: {
  position?: [number, number, number]
  scale?: number
  animationType?: 'breathing' | 'rotation' | 'vibration' | 'pulsing'
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const atomsRef = useRef<THREE.Mesh[]>([])
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      
      switch (animationType) {
        case 'breathing':
          groupRef.current.scale.setScalar(scale * (1 + Math.sin(time * 2) * 0.1))
          break
        case 'rotation':
          groupRef.current.rotation.y = time * 0.5
          groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
          break
        case 'vibration':
          groupRef.current.position.x = position[0] + Math.sin(time * 8) * 0.05
          groupRef.current.position.y = position[1] + Math.cos(time * 6) * 0.03
          break
        case 'pulsing':
          const pulse = (Math.sin(time * 3) + 1) * 0.5
          groupRef.current.scale.setScalar(scale * (0.8 + pulse * 0.4))
          break
      }
    }
    
    // Individual atom animations
    atomsRef.current.forEach((atom, index) => {
      if (atom) {
        const offset = index * 0.5
        atom.rotation.y = state.clock.elapsedTime * (1 + index * 0.1)
        atom.position.y += Math.sin(state.clock.elapsedTime * 2 + offset) * 0.002
      }
    })
  })

  const atoms = useMemo(() => [
    { pos: [0, 0, 0], color: '#404040', element: 'C' },
    { pos: [1.2, 0.8, 0.3], color: '#3050f8', element: 'N' },
    { pos: [-1.1, 0.6, -0.2], color: '#ff0d0d', element: 'O' },
    { pos: [0.5, -1.2, 0.5], color: '#404040', element: 'C' },
    { pos: [-0.8, -0.9, 0.8], color: '#ffff30', element: 'S' },
    { pos: [2.1, 0.2, -0.6], color: '#ffffff', element: 'H' },
  ], [])

  return (
    <group ref={groupRef} position={position}>
      {atoms.map((atom, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.1} floatIntensity={0.1}>
          <group position={atom.pos as [number, number, number]}>
            <Sphere
              ref={(el) => { if (el) atomsRef.current[index] = el }}
              args={[0.2, 16, 16]}
            >
              <meshStandardMaterial
                color={atom.color}
                emissive={atom.color}
                emissiveIntensity={0.2}
                metalness={0.4}
                roughness={0.3}
              />
            </Sphere>
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.1}
              color={atom.color}
              anchorX="center"
              anchorY="middle"
            >
              {atom.element}
            </Text>
          </group>
        </Float>
      ))}
      
      {/* Connection bonds with animation */}
      {atoms.slice(0, -1).map((_, index) => (
        <group key={`bond-${index}`}>
          <mesh
            position={[
              (atoms[index].pos[0] + atoms[index + 1].pos[0]) / 2,
              (atoms[index].pos[1] + atoms[index + 1].pos[1]) / 2,
              (atoms[index].pos[2] + atoms[index + 1].pos[2]) / 2
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
            <meshStandardMaterial color="#62c6c2" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Enzyme binding animation
const EnzymeBindingAnimation = () => {
  const enzymeRef = useRef<THREE.Group>(null)
  const substrateRef = useRef<THREE.Group>(null)
  const [bindingPhase, setBindingPhase] = useState(0)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    const phase = (Math.sin(time * 0.5) + 1) * 0.5 // 0 to 1
    
    if (enzymeRef.current && substrateRef.current) {
      // Enzyme stays mostly stable with slight breathing
      enzymeRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.05)
      
      // Substrate approaches and binds
      const approachDistance = 3 - phase * 2.5
      substrateRef.current.position.x = approachDistance
      substrateRef.current.rotation.y = time * (2 - phase * 1.5)
      
      // Scale changes during binding
      substrateRef.current.scale.setScalar(0.8 + phase * 0.4)
    }
    
    setBindingPhase(phase)
  })

  return (
    <group>
      {/* Enzyme (larger, more complex structure) */}
      <group ref={enzymeRef} position={[-0.5, 0, 0]}>
        <AnimatedMolecularStructure 
          position={[0, 0, 0]} 
          scale={1.5} 
          animationType="breathing"
        />
        {/* Binding site visualization */}
        <Ring args={[0.8, 1, 32]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial 
            color="#40296e" 
            transparent 
            opacity={0.3 + bindingPhase * 0.2}
          />
        </Ring>
      </group>
      
      {/* Substrate (smaller molecule) */}
      <group ref={substrateRef}>
        <AnimatedMolecularStructure 
          position={[0, 0, 0]} 
          scale={0.8} 
          animationType="vibration"
        />
      </group>
      
      {/* Binding energy visualization */}
      {bindingPhase > 0.7 && (
        <Sparkles
          count={20}
          scale={[4, 4, 4]}
          size={3}
          speed={0.5}
          color="#62c6c2"
        />
      )}
    </group>
  )
}

// Cell membrane permeation
const MembranePermeation = () => {
  const drugRef = useRef<THREE.Group>(null)
  const [permeationPhase, setPermeationPhase] = useState(0)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.3
    const phase = (Math.sin(time) + 1) * 0.5
    
    if (drugRef.current) {
      // Drug moves through membrane layers
      drugRef.current.position.z = -3 + phase * 6
      drugRef.current.rotation.y = time * 2
      
      // Size changes as it passes through
      const sizeModifier = phase < 0.5 ? 
        1 - (phase * 0.4) : // Shrinking while entering
        0.6 + ((phase - 0.5) * 0.8) // Expanding while exiting
      
      drugRef.current.scale.setScalar(sizeModifier)
    }
    
    setPermeationPhase(phase)
  })

  return (
    <group>
      {/* Membrane layers */}
      {[-1, 0, 1].map((z, index) => (
        <group key={index} position={[0, 0, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[6, 6]} />
            <meshStandardMaterial 
              color={index === 1 ? "#62c6c2" : "#40296e"}
              transparent 
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Membrane proteins/channels */}
          {Array.from({ length: 8 }, (_, i) => (
            <Float key={i} speed={0.5 + i * 0.1}>
              <Sphere 
                position={[
                  (Math.cos(i * Math.PI / 4) * 2),
                  (Math.sin(i * Math.PI / 4) * 2),
                  0
                ]}
                args={[0.1, 8, 8]}
              >
                <meshStandardMaterial color="#2E2A2B" />
              </Sphere>
            </Float>
          ))}
        </group>
      ))}
      
      {/* Drug molecule */}
      <group ref={drugRef}>
        <AnimatedMolecularStructure 
          animationType={permeationPhase > 0.3 && permeationPhase < 0.7 ? 'pulsing' : 'rotation'}
        />
        
        {/* Trail effect */}
        <Trail
          width={0.5}
          length={10}
          color="#62c6c2"
          attenuation={(t) => t * t}
        >
          <Sphere args={[0.1, 8, 8]}>
            <meshStandardMaterial 
              color="#62c6c2" 
              emissive="#62c6c2"
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Trail>
      </group>
    </group>
  )
}

// Main component
const AdvancedAnimations = () => {
  const [selectedAnimation, setSelectedAnimation] = useState('molecularOrbital')
  const [isPlaying, setIsPlaying] = useState(true)

  const renderAnimation = () => {
    switch (selectedAnimation) {
      case 'molecularOrbital':
        return (
          <group>
            <MolecularOrbital radius={2} color="#40296e" speed={1} />
            <MolecularOrbital radius={2.8} color="#62c6c2" speed={0.7} />
            <AnimatedMolecularStructure animationType="breathing" />
          </group>
        )
      case 'enzymeBinding':
        return <EnzymeBindingAnimation />
      case 'cellMembrane':
        return <MembranePermeation />
      case 'proteinFolding':
        return (
          <group>
            {Array.from({ length: 5 }, (_, i) => (
              <AnimatedMolecularStructure
                key={i}
                position={[
                  Math.cos(i * Math.PI / 2.5) * 3,
                  Math.sin(i * Math.PI / 2.5) * 3,
                  Math.sin(i) * 1
                ]}
                scale={0.6 + i * 0.1}
                animationType={['breathing', 'rotation', 'vibration', 'pulsing'][i % 4] as 'breathing' | 'rotation' | 'vibration' | 'pulsing'}
              />
            ))}
          </group>
        )
      default:
        return <AnimatedMolecularStructure />
    }
  }

  return (
    <div className="w-full h-screen bg-background relative">
      {/* Controls */}
      <div className="absolute top-6 left-6 z-10 bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-sm border border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">3D Molecular Animations</h3>
        
        <div className="space-y-4">
          {Object.entries(animationPresets).map(([key, preset]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAnimation(key)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedAnimation === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              <div className="font-medium">{preset.name}</div>
              <div className={`text-xs mt-1 ${
                selectedAnimation === key ? 'text-primary-foreground/80' : 'text-muted-foreground'
              }`}>
                {preset.description}
              </div>
            </motion.button>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              isPlaying
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {isPlaying ? 'Pause Animation' : 'Play Animation'}
          </button>
        </div>
      </div>

      {/* Animation Info */}
      <div className="absolute top-6 right-6 z-10 bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-xs border border-border">
        <h4 className="font-semibold text-foreground mb-2">
          {animationPresets[selectedAnimation as keyof typeof animationPresets]?.name}
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          {animationPresets[selectedAnimation as keyof typeof animationPresets]?.description}
        </p>
        <div className="text-xs text-muted-foreground">
          <div>Speed: {animationPresets[selectedAnimation as keyof typeof animationPresets]?.speed}x</div>
          <div className="capitalize">
            Complexity: {animationPresets[selectedAnimation as keyof typeof animationPresets]?.complexity}
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#62c6c2" />
        <pointLight position={[10, -10, 5]} intensity={0.3} color="#40296e" />
        
        {isPlaying && renderAnimation()}
        
        <gridHelper args={[20, 20]} position={[0, -4, 0]} />
      </Canvas>
    </div>
  )
}

export default AdvancedAnimations 