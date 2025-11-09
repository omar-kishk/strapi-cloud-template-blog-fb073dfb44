'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sphere, Line } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Updated supply chain data with proper structure
const supplyChainData = {
  headquarters: {
    id: 'hq-riyadh',
    name: 'BAB Pharma HQ',
    location: 'Riyadh, Saudi Arabia',
    position: [0, 0, 0] as [number, number, number],
    type: 'headquarters' as const,
    status: 'active' as const
  },
  suppliers: [
    { 
      id: 'supplier-eu',
      name: 'European Pharma Partners', 
      location: 'Germany', 
      position: [-6, 2, -2] as [number, number, number], 
      type: 'supplier' as const,
      status: 'active' as const
    },
    { 
      id: 'supplier-in',
      name: 'Indian Generic Manufacturers', 
      location: 'India', 
      position: [8, -1, -3] as [number, number, number], 
      type: 'supplier' as const,
      status: 'active' as const
    },
    { 
      id: 'supplier-us',
      name: 'US Medical Device Corp', 
      location: 'USA', 
      position: [-8, 3, -1] as [number, number, number], 
      type: 'supplier' as const,
      status: 'active' as const
    },
    { 
      id: 'supplier-ch',
      name: 'Swiss Pharmaceutical AG', 
      location: 'Switzerland', 
      position: [-5, 4, -2] as [number, number, number], 
      type: 'supplier' as const,
      status: 'active' as const
    },
    { 
      id: 'supplier-kr',
      name: 'Korean Bio Solutions', 
      location: 'South Korea', 
      position: [7, 2, -4] as [number, number, number], 
      type: 'supplier' as const,
      status: 'active' as const
    },
  ],
  distributors: [
    { 
      id: 'dist-north',
      name: 'Northern Region Hub', 
      location: 'Tabuk', 
      position: [-2, 3, 1] as [number, number, number], 
      type: 'distributor' as const,
      status: 'active' as const
    },
    { 
      id: 'dist-east',
      name: 'Eastern Region Hub', 
      location: 'Dammam', 
      position: [3, -1, 1] as [number, number, number], 
      type: 'distributor' as const,
      status: 'active' as const
    },
    { 
      id: 'dist-west',
      name: 'Western Region Hub', 
      location: 'Jeddah', 
      position: [-3, -2, 1] as [number, number, number], 
      type: 'distributor' as const,
      status: 'active' as const
    },
    { 
      id: 'dist-south',
      name: 'Southern Region Hub', 
      location: 'Abha', 
      position: [1, -3, 1] as [number, number, number], 
      type: 'distributor' as const,
      status: 'active' as const
    },
    { 
      id: 'dist-central',
      name: 'Central Region Hub', 
      location: 'Riyadh', 
      position: [0, 1, 1] as [number, number, number], 
      type: 'distributor' as const,
      status: 'active' as const
    },
  ],
  customers: [
    { 
      id: 'customer-nupco',
      name: 'NUPCO Government', 
      location: 'Riyadh', 
      position: [2, 2, 2] as [number, number, number], 
      type: 'government' as const,
      status: 'active' as const
    },
    { 
      id: 'customer-hospitals',
      name: 'Private Hospitals', 
      location: 'Multiple Cities', 
      position: [-1, 2, 2] as [number, number, number], 
      type: 'hospital' as const,
      status: 'active' as const
    },
    { 
      id: 'customer-pharmacies',
      name: 'Retail Pharmacies', 
      location: 'Nationwide', 
      position: [1, -2, 2] as [number, number, number], 
      type: 'pharmacy' as const,
      status: 'active' as const
    },
    { 
      id: 'customer-clinics',
      name: 'Healthcare Centers', 
      location: 'Regional', 
      position: [-2, -1, 2] as [number, number, number], 
      type: 'clinic' as const,
      status: 'active' as const
    },
  ]
}

// Type definition for supply chain nodes
type SupplyChainNode = {
  id: string
  name: string
  location: string
  position: [number, number, number]
  type: 'headquarters' | 'supplier' | 'distributor' | 'government' | 'hospital' | 'pharmacy' | 'clinic'
  status: 'active' | 'pending' | 'inactive'
}

// Node component for different types of locations
const SupplyChainNode = ({ 
  node, 
  isSelected, 
  onClick 
}: { 
  node: SupplyChainNode, 
  isSelected: boolean, 
  onClick: () => void 
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      if (isSelected) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
      }
    }
  })

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'headquarters': return '#40296e'
      case 'supplier': return '#62c6c2'
      case 'distributor': return '#2E2A2B'
      case 'government': return '#ff6b6b'
      case 'hospital': return '#4ecdc4'
      case 'pharmacy': return '#45b7d1'
      case 'clinic': return '#96ceb4'
      default: return '#cccccc'
    }
  }

  const getNodeSize = (type: string) => {
    switch (type) {
      case 'headquarters': return 0.3
      case 'supplier': return 0.2
      case 'distributor': return 0.25
      default: return 0.15
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.1}>
      <group position={node.position}>
        <Sphere 
          ref={meshRef}
          args={[getNodeSize(node.type), 16, 16]}
          onClick={onClick}
        >
          <meshStandardMaterial 
            color={getNodeColor(node.type)}
            emissive={getNodeColor(node.type)}
            emissiveIntensity={isSelected ? 0.3 : 0.1}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* Pulsing ring for headquarters */}
        {node.type === 'headquarters' && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.5, 32]} />
            <meshStandardMaterial 
              color="#40296e" 
              transparent 
              opacity={0.3}
            />
          </mesh>
        )}
        
        {/* Node label */}
        <Text
          position={[0, getNodeSize(node.type) + 0.3, 0]}
          fontSize={0.1}
          color={getNodeColor(node.type)}
          anchorX="center"
          anchorY="middle"
        >
          {node.name}
        </Text>
      </group>
    </Float>
  )
}

// Connection lines between nodes
const ConnectionLines = () => {
  const { headquarters, suppliers, distributors, customers } = supplyChainData
  
  return (
    <>
      {/* Supplier to HQ connections */}
      {suppliers.map((supplier, index) => (
        <Line
          key={`supplier-${index}`}
          points={[supplier.position, headquarters.position]}
          color="#62c6c2"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}
      
      {/* HQ to distributor connections */}
      {distributors.map((distributor, index) => (
        <Line
          key={`distributor-${index}`}
          points={[headquarters.position, distributor.position]}
          color="#40296e"
          lineWidth={3}
          transparent
          opacity={0.7}
        />
      ))}
      
      {/* Distributor to customer connections */}
      {customers.map((customer, index) => (
        <Line
          key={`customer-${index}`}
          points={[distributors[index % distributors.length].position, customer.position]}
          color="#2E2A2B"
          lineWidth={2}
          transparent
          opacity={0.5}
        />
      ))}
    </>
  )
}

// Data flow particles
const DataFlowParticles = () => {
  const particlesRef = useRef<THREE.InstancedMesh>(null)
  const particleCount = 20
  
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < particleCount; i++) {
        const t = (time * 0.5 + i * 0.1) % 1
        const matrix = new THREE.Matrix4()
        
        // Create flowing motion along supply chain paths
        const startPos = supplyChainData.suppliers[i % supplyChainData.suppliers.length].position
        const endPos = supplyChainData.headquarters.position
        
        const position = new THREE.Vector3().lerpVectors(
          new THREE.Vector3(...startPos),
          new THREE.Vector3(...endPos),
          t
        )
        
        matrix.makeTranslation(position.x, position.y, position.z)
        matrix.scale(new THREE.Vector3(0.05, 0.05, 0.05))
        
        particlesRef.current.setMatrixAt(i, matrix)
      }
      
      particlesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial 
        color="#62c6c2" 
        emissive="#62c6c2"
        emissiveIntensity={0.5}
        transparent 
        opacity={0.8} 
      />
    </instancedMesh>
  )
}

// 3D Scene component
const SupplyChainScene = ({ selectedNode, onNodeSelect }: { selectedNode: SupplyChainNode | null, onNodeSelect: (node: SupplyChainNode | null) => void }) => {
  const allNodes: SupplyChainNode[] = [
    supplyChainData.headquarters,
    ...supplyChainData.suppliers,
    ...supplyChainData.distributors,
    ...supplyChainData.customers
  ]

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#62c6c2" />
      
      {/* Supply chain nodes */}
      {allNodes.map((node, index) => (
        <SupplyChainNode
          key={`node-${index}`}
          node={node}
          isSelected={selectedNode?.name === node.name}
          onClick={() => onNodeSelect(node)}
        />
      ))}
      
      {/* Connection lines */}
      <ConnectionLines />
      
      {/* Data flow particles */}
      <DataFlowParticles />
      
      {/* Background grid - remove opacity prop */}
      <gridHelper args={[20, 20]} position={[0, -5, 0]} />
    </>
  )
}

// Main component
const SupplyChainMap = () => {
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const nodeTypeStats = {
    suppliers: supplyChainData.suppliers.length,
    distributors: supplyChainData.distributors.length,
    customers: supplyChainData.customers.length,
  }

  return (
    <div className="w-full h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        className="absolute top-6 left-6 z-10"
      >
        <h2 className="text-3xl font-bold text-foreground mb-2">Global Supply Chain Network</h2>
        <p className="text-muted-foreground">Interactive visualization of BAB Pharma&apos;s worldwide operations</p>
      </motion.div>

      {/* Statistics Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
        className="absolute top-6 right-6 z-10 bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-border"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Network Statistics</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-sm text-foreground">Global Suppliers: {nodeTypeStats.suppliers}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground/60 rounded-full"></div>
            <span className="text-sm text-foreground">Distribution Hubs: {nodeTypeStats.distributors}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-foreground">Customer Networks: {nodeTypeStats.customers}</span>
          </div>
        </div>
      </motion.div>

      {/* Node Information Panel */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-6 left-6 z-10 bg-card/95 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-md border border-border"
        >
          <h3 className="text-xl font-semibold text-foreground mb-2">{selectedNode.name}</h3>
          <p className="text-muted-foreground mb-3">{selectedNode.location}</p>
          <div className="text-sm text-muted-foreground capitalize">
            Type: {selectedNode.type.replace('-', ' ')}
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Close Details
          </button>
        </motion.div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <SupplyChainScene 
          selectedNode={selectedNode} 
          onNodeSelect={setSelectedNode} 
        />
      </Canvas>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading Supply Chain Network...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupplyChainMap 