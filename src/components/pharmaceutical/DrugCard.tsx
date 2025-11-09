'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pill, Heart, Star } from "lucide-react"
import { motion } from "framer-motion"

interface DrugCardProps {
  name: string
  description: string
  strength: string
  price: string
  inStock: boolean
  prescriptionRequired: boolean
  rating: number
}

const DrugCard: React.FC<DrugCardProps> = ({
  name,
  description,
  strength,
  price,
  inStock,
  prescriptionRequired,
  rating
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full border-2 border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-primary" />
              <Badge variant={prescriptionRequired ? "destructive" : "secondary"} className="bg-secondary text-secondary-foreground">
                {prescriptionRequired ? "Prescription" : "OTC"}
              </Badge>
            </div>
            <Heart className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
          </div>
          
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
          
          <Badge variant="outline" className="w-fit border-primary text-primary">
            {inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? 'fill-secondary text-secondary'
                    : 'text-muted-foreground/20'
                }`}
              />
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Strength:</span> {strength}
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="text-2xl font-bold text-primary">
              {price}
            </div>
            
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DrugCard 