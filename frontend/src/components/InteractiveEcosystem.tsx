"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Rabbit, Dog, RabbitIcon as Fox, Leaf, Maximize2, Minimize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Animal {
  id: number
  type: "rabbit" | "wolf" | "fox"
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

interface Plant {
  id: number
  x: number
  y: number
  size: number
  growth: number
}

interface InteractiveEcosystemProps {
  enableFoxes?: boolean
}

const InteractiveEcosystem: React.FC<InteractiveEcosystemProps> = ({ enableFoxes = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [animals, setAnimals] = useState<Animal[]>([])
  const [plants, setPlants] = useState<Plant[]>([])
  const [stats, setStats] = useState({
    rabbits: 0,
    wolves: 0,
    foxes: 0,
    plants: 0,
  })
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  // Initialize ecosystem
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create initial animals
    const initialAnimals: Animal[] = []

    // Add rabbits
    for (let i = 0; i < 10; i++) {
      initialAnimals.push({
        id: i,
        type: "rabbit",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 8,
      })
    }

    // Add wolves
    for (let i = 0; i < 3; i++) {
      initialAnimals.push({
        id: i + 10,
        type: "wolf",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: 12,
      })
    }

    // Add foxes if enabled
    if (enableFoxes) {
      for (let i = 0; i < 3; i++) {
        initialAnimals.push({
          id: i + 20,
          type: "fox",
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          size: 10,
        })
      }
    }

    // Create initial plants
    const initialPlants: Plant[] = []
    for (let i = 0; i < 20; i++) {
      initialPlants.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 3 + Math.random() * 5,
        growth: 0.01 + Math.random() * 0.02,
      })
    }

    setAnimals(initialAnimals)
    setPlants(initialPlants)

    // Update stats
    setStats({
      rabbits: initialAnimals.filter((a) => a.type === "rabbit").length,
      wolves: initialAnimals.filter((a) => a.type === "wolf").length,
      foxes: initialAnimals.filter((a) => a.type === "fox").length,
      plants: initialPlants.length,
    })

    // Start animation
    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [enableFoxes])

  // Animation loop
  const animate = (time: number) => {
    if (!canvasRef.current || isPaused) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw and update plants
    const updatedPlants = [...plants]
    updatedPlants.forEach((plant) => {
      // Draw plant
      ctx.beginPath()
      ctx.fillStyle = `rgba(0, ${100 + Math.floor(plant.size * 10)}, 0, 0.7)`
      ctx.arc(plant.x, plant.y, plant.size, 0, Math.PI * 2)
      ctx.fill()

      // Grow plant
      plant.size += plant.growth * (deltaTime / 1000)
      if (plant.size > 12) plant.size = 12
    })

    // Occasionally add new plants
    if (Math.random() < 0.01 * (deltaTime / 1000) && plants.length < 30) {
      updatedPlants.push({
        id: plants.length + Math.floor(Math.random() * 1000),
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2,
        growth: 0.01 + Math.random() * 0.02,
      })
    }

    // Update and draw animals
    const updatedAnimals = [...animals]
    updatedAnimals.forEach((animal) => {
      // Move animal
      animal.x += animal.vx * (deltaTime / 16)
      animal.y += animal.vy * (deltaTime / 16)

      // Bounce off walls
      if (animal.x < 0 || animal.x > canvas.width) {
        animal.vx *= -1
        animal.x = Math.max(0, Math.min(animal.x, canvas.width))
      }
      if (animal.y < 0 || animal.y > canvas.height) {
        animal.vy *= -1
        animal.y = Math.max(0, Math.min(animal.y, canvas.height))
      }

      // Occasionally change direction
      if (Math.random() < 0.02 * (deltaTime / 1000)) {
        animal.vx = (Math.random() - 0.5) * (animal.type === "rabbit" ? 2 : animal.type === "wolf" ? 1.5 : 1.8)
        animal.vy = (Math.random() - 0.5) * (animal.type === "rabbit" ? 2 : animal.type === "wolf" ? 1.5 : 1.8)
      }

      // Draw animal
      ctx.beginPath()
      if (animal.type === "rabbit") {
        ctx.fillStyle = "#8b5cf6"
      } else if (animal.type === "wolf") {
        ctx.fillStyle = "#f43f5e"
      } else {
        ctx.fillStyle = "#f59e0b"
      }
      ctx.arc(animal.x, animal.y, animal.size, 0, Math.PI * 2)
      ctx.fill()

      // Draw direction indicator
      ctx.beginPath()
      ctx.strokeStyle = "white"
      ctx.moveTo(animal.x, animal.y)
      ctx.lineTo(animal.x + animal.vx * 5, animal.y + animal.vy * 5)
      ctx.stroke()
    })

    // Interactions
    // Rabbits eat plants
    updatedAnimals.forEach((animal) => {
      if (animal.type === "rabbit") {
        updatedPlants.forEach((plant, index) => {
          const dx = animal.x - plant.x
          const dy = animal.y - plant.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < animal.size + plant.size) {
            // Rabbit eats plant
            plant.size -= 1
            if (plant.size <= 0) {
              updatedPlants.splice(index, 1)
            }

            // Occasionally reproduce
            if (Math.random() < 0.1 * (deltaTime / 1000) && updatedAnimals.length < 50) {
              updatedAnimals.push({
                id: updatedAnimals.length + Math.floor(Math.random() * 1000),
                type: "rabbit",
                x: animal.x + (Math.random() - 0.5) * 20,
                y: animal.y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: 8,
              })
            }
          }
        })
      }
    })

    // Wolves hunt rabbits
    updatedAnimals.forEach((predator) => {
      if (predator.type === "wolf") {
        for (let i = updatedAnimals.length - 1; i >= 0; i--) {
          const prey = updatedAnimals[i]
          if (prey.type === "rabbit") {
            const dx = predator.x - prey.x
            const dy = predator.y - prey.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Chase rabbits
            if (distance < 100) {
              predator.vx = (-dx / distance) * 2
              predator.vy = (-dy / distance) * 2
            }

            if (distance < predator.size + prey.size) {
              // Wolf eats rabbit
              updatedAnimals.splice(i, 1)

              // Occasionally reproduce
              if (Math.random() < 0.05 * (deltaTime / 1000) && updatedAnimals.length < 50) {
                updatedAnimals.push({
                  id: updatedAnimals.length + Math.floor(Math.random() * 1000),
                  type: "wolf",
                  x: predator.x + (Math.random() - 0.5) * 20,
                  y: predator.y + (Math.random() - 0.5) * 20,
                  vx: (Math.random() - 0.5) * 1.5,
                  vy: (Math.random() - 0.5) * 1.5,
                  size: 12,
                })
              }
              break
            }
          }
        }
      }
    })

    // Foxes hunt rabbits
    if (enableFoxes) {
      updatedAnimals.forEach((predator) => {
        if (predator.type === "fox") {
          for (let i = updatedAnimals.length - 1; i >= 0; i--) {
            const prey = updatedAnimals[i]
            if (prey.type === "rabbit") {
              const dx = predator.x - prey.x
              const dy = predator.y - prey.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              // Chase rabbits
              if (distance < 80) {
                predator.vx = (-dx / distance) * 1.8
                predator.vy = (-dy / distance) * 1.8
              }

              if (distance < predator.size + prey.size) {
                // Fox eats rabbit
                updatedAnimals.splice(i, 1)

                // Occasionally reproduce
                if (Math.random() < 0.03 * (deltaTime / 1000) && updatedAnimals.length < 50) {
                  updatedAnimals.push({
                    id: updatedAnimals.length + Math.floor(Math.random() * 1000),
                    type: "fox",
                    x: predator.x + (Math.random() - 0.5) * 20,
                    y: predator.y + (Math.random() - 0.5) * 20,
                    vx: (Math.random() - 0.5) * 1.8,
                    vy: (Math.random() - 0.5) * 1.8,
                    size: 10,
                  })
                }
                break
              }
            }
          }
        }
      })
    }

    // Natural death
    for (let i = updatedAnimals.length - 1; i >= 0; i--) {
      if (Math.random() < 0.0005 * (deltaTime / 1000)) {
        updatedAnimals.splice(i, 1)
      }
    }

    // Update state
    setAnimals(updatedAnimals)
    setPlants(updatedPlants)

    // Update stats
    setStats({
      rabbits: updatedAnimals.filter((a) => a.type === "rabbit").length,
      wolves: updatedAnimals.filter((a) => a.type === "wolf").length,
      foxes: updatedAnimals.filter((a) => a.type === "fox").length,
      plants: updatedPlants.length,
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const resetEcosystem = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current

    // Create new animals
    const newAnimals: Animal[] = []

    // Add rabbits
    for (let i = 0; i < 10; i++) {
      newAnimals.push({
        id: i,
        type: "rabbit",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 8,
      })
    }

    // Add wolves
    for (let i = 0; i < 3; i++) {
      newAnimals.push({
        id: i + 10,
        type: "wolf",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: 12,
      })
    }

    // Add foxes if enabled
    if (enableFoxes) {
      for (let i = 0; i < 3; i++) {
        newAnimals.push({
          id: i + 20,
          type: "fox",
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          size: 10,
        })
      }
    }

    // Create new plants
    const newPlants: Plant[] = []
    for (let i = 0; i < 20; i++) {
      newPlants.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 3 + Math.random() * 5,
        growth: 0.01 + Math.random() * 0.02,
      })
    }

    setAnimals(newAnimals)
    setPlants(newPlants)

    // Update stats
    setStats({
      rabbits: newAnimals.filter((a) => a.type === "rabbit").length,
      wolves: newAnimals.filter((a) => a.type === "wolf").length,
      foxes: newAnimals.filter((a) => a.type === "fox").length,
      plants: newPlants.length,
    })
  }

  return (
    <Card
      className={`border shadow-md overflow-hidden transition-all duration-500 ${expanded ? "fixed inset-4 z-50" : ""}`}
    >
      <CardHeader className="pb-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 dark:from-emerald-500/20 dark:to-blue-500/20 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-emerald-500" />
          Interactive Ecosystem
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={togglePause}>
            {isPaused ? "▶" : "⏸"}
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={resetEcosystem}>
            ↺
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setExpanded(!expanded)}>
            {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={expanded ? window.innerWidth - 64 : 600}
            height={expanded ? window.innerHeight - 160 : 300}
            className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 w-full"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge variant="secondary" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
              <Rabbit className="h-3 w-3 mr-1 text-violet-500" />
              Rabbits: {stats.rabbits}
            </Badge>
            <Badge variant="secondary" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
              <Dog className="h-3 w-3 mr-1 text-pink-500" />
              Wolves: {stats.wolves}
            </Badge>
            {enableFoxes && (
              <Badge variant="secondary" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
                <Fox className="h-3 w-3 mr-1 text-amber-500" />
                Foxes: {stats.foxes}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm">
              <Leaf className="h-3 w-3 mr-1 text-emerald-500" />
              Plants: {stats.plants}
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2 text-xs bg-white/80 dark:bg-black/50 backdrop-blur-sm p-1 rounded">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-violet-500 mr-1"></div>
              <span>Rabbits eat plants and reproduce</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
              <span>Wolves hunt rabbits</span>
            </div>
            {enableFoxes && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                <span>Foxes also hunt rabbits</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InteractiveEcosystem
