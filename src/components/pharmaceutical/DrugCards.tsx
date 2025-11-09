'use client'

import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Ring, Text } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Heart, Shield, Brain, Zap, Pill, Star, X } from 'lucide-react'
import * as THREE from 'three'

// Define proper types
interface Atom {
  pos: [number, number, number]
  element: string
  color: string
}

interface Bond {
  from: number
  to: number
  type: string
}

interface MolecularStructure {
  atoms: Atom[]
  bonds: Bond[]
}

interface Drug {
  id: number
  name: string
  category: string
  description: string
  molecule: string
  formula: string
  strength: string
  indication: string
  mechanism: string
  color: string
  icon: React.ComponentType<{ className?: string }>
  rating: number
  inStock: boolean
  featured: boolean
  molecularStructure: MolecularStructure
}

// Drug data with molecular structures
const drugData: Drug[] = [
  {
    id: 1,
    name: 'CardioVital Pro',
    category: 'Cardiovascular',
    description: 'Advanced ACE inhibitor for hypertension management',
    molecule: 'Lisinopril',
    formula: 'C21H31N3O5',
    strength: '10mg, 20mg tablets',
    indication: 'Hypertension, Heart Failure',
    mechanism: 'ACE Inhibition',
    color: '#ff6b6b',
    icon: Heart,
    rating: 4.8,
    inStock: true,
    featured: true,
    molecularStructure: {
      atoms: [
        { pos: [0, 0, 0], element: 'C', color: '#404040' },
        { pos: [1.5, 0.5, 0], element: 'N', color: '#3050f8' },
        { pos: [-1.2, 0.8, 0], element: 'O', color: '#ff0d0d' },
        { pos: [0.8, -1.4, 0.5], element: 'C', color: '#404040' },
        { pos: [-0.5, 1.8, -0.3], element: 'H', color: '#ffffff' },
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 0, to: 2, type: 'double' },
        { from: 0, to: 3, type: 'single' },
        { from: 2, to: 4, type: 'single' },
      ]
    }
  },
  {
    id: 2,
    name: 'NeuroBoost Complex',
    category: 'Neurological',
    description: 'Nootropic compound for cognitive enhancement',
    molecule: 'Piracetam',
    formula: 'C6H10N2O2',
    strength: '800mg capsules',
    indication: 'Cognitive Enhancement, Memory Support',
    mechanism: 'AMPA Receptor Modulation',
    color: '#4ecdc4',
    icon: Brain,
    rating: 4.6,
    inStock: true,
    featured: false,
    molecularStructure: {
      atoms: [
        { pos: [0, 0, 0], element: 'C', color: '#404040' },
        { pos: [1.2, 0.8, 0], element: 'N', color: '#3050f8' },
        { pos: [-1.1, 0.6, 0], element: 'O', color: '#ff0d0d' },
        { pos: [0.5, -1.2, 0], element: 'C', color: '#404040' },
        { pos: [2.1, 0.2, 0.8], element: 'H', color: '#ffffff' },
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 0, to: 2, type: 'single' },
        { from: 1, to: 3, type: 'double' },
        { from: 3, to: 4, type: 'single' },
      ]
    }
  },
  {
    id: 3,
    name: 'ImmuneShield Plus',
    category: 'Immunology',
    description: 'Monoclonal antibody for autoimmune disorders',
    molecule: 'Adalimumab',
    formula: 'C6553H10019N1747O2013S42',
    strength: '40mg/0.8ml injection',
    indication: 'Rheumatoid Arthritis, Crohn&apos;s Disease',
    mechanism: 'TNF-α Inhibition',
    color: '#45b7d1',
    icon: Shield,
    rating: 4.9,
    inStock: true,
    featured: true,
    molecularStructure: {
      atoms: [
        { pos: [0, 0, 0], element: 'C', color: '#404040' },
        { pos: [1.4, 0.3, 0.5], element: 'N', color: '#3050f8' },
        { pos: [-1.3, 0.5, 0], element: 'O', color: '#ff0d0d' },
        { pos: [0.7, -1.1, -0.3], element: 'S', color: '#ffff30' },
        { pos: [-0.8, 1.6, 0.2], element: 'H', color: '#ffffff' },
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 0, to: 2, type: 'single' },
        { from: 1, to: 3, type: 'single' },
        { from: 2, to: 4, type: 'single' },
      ]
    }
  },
  {
    id: 4,
    name: 'MetaboLite Pro',
    category: 'Endocrinology',
    description: 'Advanced insulin sensitizer for diabetes management',
    molecule: 'Metformin HCl',
    formula: 'C4H11N5·HCl',
    strength: '500mg, 850mg tablets',
    indication: 'Type 2 Diabetes Mellitus',
    mechanism: 'Glucose Production Inhibition',
    color: '#96ceb4',
    icon: Zap,
    rating: 4.7,
    inStock: true,
    featured: false,
    molecularStructure: {
      atoms: [
        { pos: [0, 0, 0], element: 'C', color: '#404040' },
        { pos: [1.3, 0.6, 0], element: 'N', color: '#3050f8' },
        { pos: [-1.2, 0.4, 0], element: 'N', color: '#3050f8' },
        { pos: [0.6, -1.3, 0], element: 'C', color: '#404040' },
        { pos: [2.1, 0.1, 0.5], element: 'H', color: '#ffffff' },
      ],
      bonds: [
        { from: 0, to: 1, type: 'double' },
        { from: 0, to: 2, type: 'single' },
        { from: 1, to: 3, type: 'single' },
        { from: 3, to: 4, type: 'single' },
      ]
    }
  },
  {
    id: 5,
    name: 'RespiClear Advanced',
    category: 'Respiratory',
    description: 'Long-acting bronchodilator for asthma control',
    molecule: 'Salmeterol',
    formula: 'C25H37NO4',
    strength: '25mcg inhaler',
    indication: 'Asthma, COPD',
    mechanism: 'β2-Adrenergic Agonism',
    color: '#feca57',
    icon: Pill,
    rating: 4.5,
    inStock: false,
    featured: false,
    molecularStructure: {
      atoms: [
        { pos: [0, 0, 0], element: 'C', color: '#404040' },
        { pos: [1.5, 0.4, 0], element: 'O', color: '#ff0d0d' },
        { pos: [-1.1, 0.7, 0], element: 'N', color: '#3050f8' },
        { pos: [0.8, -1.2, 0], element: 'C', color: '#404040' },
        { pos: [-0.3, 1.9, 0], element: 'H', color: '#ffffff' },
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 0, to: 2, type: 'single' },
        { from: 1, to: 3, type: 'double' },
        { from: 2, to: 4, type: 'single' },
      ]
    }
  },
  {
    id: 6,
    name: 'OncoGuard Targeted',
    category: 'Oncology',
    description: 'Targeted therapy for specific cancer mutations',
    molecule: 'Imatinib',
    formula: 'C29H31N7O',
    strength: '100mg, 400mg tablets',
    indication: 'Chronic Myeloid Leukemia, GIST',
    mechanism: 'Tyrosine Kinase Inhibition',
    color: '#ff7675',
    icon: Shield,
    rating: 4.8,
    inStock: true,
    featured: true,
    molecularStructure: {
      atoms: [
        { pos: [0, 0, 0], element: 'C', color: '#404040' },
        { pos: [1.4, 0.5, 0], element: 'N', color: '#3050f8' },
        { pos: [-1.2, 0.3, 0], element: 'N', color: '#3050f8' },
        { pos: [0.7, -1.4, 0], element: 'O', color: '#ff0d0d' },
        { pos: [-0.5, 1.7, 0], element: 'C', color: '#404040' },
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 0, to: 2, type: 'double' },
        { from: 1, to: 3, type: 'single' },
        { from: 2, to: 4, type: 'single' },
      ]
    }
  }
]

// 3D Molecular Structure Component
const MolecularStructure3D = ({ structure, drugColor, isHovered }: {
  structure: MolecularStructure
  drugColor: string
  isHovered: boolean
}) => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (isHovered ? 0.8 : 0.3)
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={isHovered ? 1.2 : 1}>
        {/* Atoms */}
        {structure.atoms.map((atom: Atom, index: number) => (
          <group key={`atom-${index}`} position={atom.pos}>
            <Sphere args={[0.15, 16, 16]}>
              <meshStandardMaterial
                color={atom.color}
                emissive={atom.color}
                emissiveIntensity={0.1}
                metalness={0.3}
                roughness={0.4}
              />
            </Sphere>
            <Text
              position={[0, 0.25, 0]}
              fontSize={0.08}
              color={atom.color}
              anchorX="center"
              anchorY="middle"
            >
              {atom.element}
            </Text>
          </group>
        ))}
        
        {/* Bonds */}
        {structure.bonds.map((bond: Bond, index: number) => {
          const fromAtom = structure.atoms[bond.from]
          const toAtom = structure.atoms[bond.to]
          const midPoint = [
            (fromAtom.pos[0] + toAtom.pos[0]) / 2,
            (fromAtom.pos[1] + toAtom.pos[1]) / 2,
            (fromAtom.pos[2] + toAtom.pos[2]) / 2
          ]
          const distance = Math.sqrt(
            Math.pow(toAtom.pos[0] - fromAtom.pos[0], 2) +
            Math.pow(toAtom.pos[1] - fromAtom.pos[1], 2) +
            Math.pow(toAtom.pos[2] - fromAtom.pos[2], 2)
          )
          
          return (
            <group key={`bond-${index}`} position={midPoint as [number, number, number]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
                <meshStandardMaterial
                  color={drugColor}
                  opacity={0.8}
                  transparent
                />
              </mesh>
            </group>
          )
        })}
        
        {/* Orbital rings for visual appeal */}
        <Ring args={[1.2, 1.25, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={drugColor} transparent opacity={0.1} />
        </Ring>
        <Ring args={[1.5, 1.55, 32]} rotation={[0, Math.PI / 2, Math.PI / 4]}>
          <meshStandardMaterial color={drugColor} transparent opacity={0.08} />
        </Ring>
      </group>
    </Float>
  )
}

// Individual Drug Card Component
const DrugCard = ({ drug, isSelected, onClick }: {
  drug: Drug
  isSelected: boolean
  onClick: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = drug.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className={`
        relative bg-card rounded-2xl shadow-lg overflow-hidden cursor-pointer border-2 transition-all duration-300
        ${isSelected ? 'border-primary shadow-2xl' : 'border-transparent hover:border-secondary'}
        ${!drug.inStock ? 'opacity-75' : ''}
      `}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {drug.featured && (
        <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
          Featured
        </div>
      )}
      
      {/* Stock Status */}
      <div className={`absolute top-4 left-4 z-10 px-2 py-1 rounded-full text-xs font-semibold ${
        drug.inStock ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {drug.inStock ? 'In Stock' : 'Out of Stock'}
      </div>

      {/* 3D Molecular Visualization */}
      <div className="h-48 relative">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color={drug.color} />
          
          <MolecularStructure3D 
            structure={drug.molecularStructure}
            drugColor={drug.color}
            isHovered={isHovered}
          />
        </Canvas>
        
        {/* Category Icon Overlay */}
        <div className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}
             style={{ backgroundColor: drug.color }}>
          <IconComponent className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>

      {/* Drug Information */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">{drug.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{drug.category}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-foreground">{drug.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{drug.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Molecule:</span>
            <span className="font-medium text-foreground">{drug.molecule}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Formula:</span>
            <span className="font-mono text-foreground">{drug.formula}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Strength:</span>
            <span className="font-medium text-foreground">{drug.strength}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Mechanism:</span>
            <span className="text-xs font-medium text-primary">{drug.mechanism}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Main Drug Cards Component
const DrugCards = () => {
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)

  const categories = ['All', ...Array.from(new Set(drugData.map(drug => drug.category)))]
  
  const filteredDrugs = drugData.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.molecule.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.indication.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || drug.category === selectedCategory
    const matchesStock = !showOnlyInStock || drug.inStock
    
    return matchesSearch && matchesCategory && matchesStock
  })

  return (
    <div className="w-full bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          Pharmaceutical Product Portfolio
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Explore our advanced pharmaceutical compounds with interactive 3D molecular visualizations
        </motion.p>
      </div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex flex-wrap gap-4 items-center"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search drugs, molecules, or indications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Stock Filter */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyInStock}
            onChange={(e) => setShowOnlyInStock(e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <span className="text-sm text-foreground">In stock only</span>
        </label>
      </motion.div>

      {/* Drug Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <AnimatePresence>
          {filteredDrugs.map((drug) => (
            <DrugCard
              key={drug.id}
              drug={drug}
              isSelected={selectedDrug?.id === drug.id}
              onClick={() => setSelectedDrug(selectedDrug?.id === drug.id ? null : drug)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredDrugs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-full flex flex-col items-center justify-center py-16 text-center"
        >
          <Pill className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No drugs found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-full flex flex-col items-center justify-center py-16 text-center"
        >
          <Pill className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No drugs found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
        </motion.div>
      )}

      {/* Detailed Drug Information Modal */}
      <AnimatePresence>
        {selectedDrug && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDrug(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{selectedDrug.name}</h3>
                  <p className="text-muted-foreground">{selectedDrug.category} • {selectedDrug.molecule}</p>
                </div>
                <button
                  onClick={() => setSelectedDrug(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Drug Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Formula:</span> {selectedDrug.formula}</p>
                    <p><span className="font-medium">Strength:</span> {selectedDrug.strength}</p>
                    <p><span className="font-medium">Indication:</span> {selectedDrug.indication}</p>
                    <p><span className="font-medium">Mechanism:</span> {selectedDrug.mechanism}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedDrug.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DrugCards 