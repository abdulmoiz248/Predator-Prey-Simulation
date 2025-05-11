"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info, Rabbit, Dog, Dna, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SimulationParametersProps {
  startYear: number
  endYear: number
  initialRabbits: number
  initialWolves: number
  initialFoxes: number
  alpha: number
  beta: number
  gamma: number
  delta: number
  foxPredationRate: number
  foxDeathRate: number
  foxReproductionRate: number
  enableFoxes: boolean
  simulationRunning: boolean
  onChange: (changes: Partial<SimulationParametersProps>) => void
  onStart: () => void
  connected: boolean
}

const SimulationParameters: React.FC<SimulationParametersProps> = ({
  startYear,
  endYear,
  initialRabbits,
  initialWolves,
  alpha,
  beta,
  gamma,
  delta,
  simulationRunning,
  onChange,
  onStart,
  connected,
}) => {
  // Suggested values for Lotka-Volterra model
  const suggestions = {
    alpha: 0.2,
    beta: 0.01,
    gamma: 0.2,
    delta: 0.002,
    initialRabbits: 100,
    initialWolves: 20,
    initialFoxes: 15,
  }

  const applyOptimalValues = () => {
    onChange({
      alpha: suggestions.alpha,
      beta: suggestions.beta,
      gamma: suggestions.gamma,
      delta: suggestions.delta,
      initialRabbits: suggestions.initialRabbits,
      initialWolves: suggestions.initialWolves,
      initialFoxes: suggestions.initialFoxes,
    })
  }

  return (
    <Card className="border shadow-sm h-full bg-gradient-to-b from-[#84ffc9]/90 via-[#aab2ff]/90 to-[#eca0ff]/90 dark:from-[#84ffc9]/30 dark:via-[#aab2ff]/30 dark:to-[#eca0ff]/30 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          <div className="flex items-center">
            <Info className="w-5 h-5 mr-2 text-violet-500 animate-pulse-slow" />
            Simulation Parameters
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={applyOptimalValues}
                  disabled={simulationRunning}
                  className="text-xs bg-[#eca0ff]/80 dark:bg-[#eca0ff]/40 text-black dark:text-white hover:bg-[#eca0ff] dark:hover:bg-[#eca0ff]/60 transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                >
                  Apply Optimal Values
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gradient-to-br from-[#84ffc9]/90 to-[#eca0ff]/90 dark:from-[#84ffc9]/50 dark:to-[#eca0ff]/50 border-none shadow-lg backdrop-blur-md">
                <p className="font-medium">Apply suggested values for a stable Lotka-Volterra simulation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startYear" className="text-sm font-medium">
              Start Year
            </Label>
            <Input
              id="startYear"
              type="number"
              value={startYear}
              onChange={(e) => onChange({ startYear: Number.parseInt(e.target.value) })}
              disabled={simulationRunning}
              className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-500 bg-white/70 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endYear" className="text-sm font-medium">
              End Year
            </Label>
            <Input
              id="endYear"
              type="number"
              value={endYear}
              onChange={(e) => onChange({ endYear: Number.parseInt(e.target.value) })}
              disabled={simulationRunning}
              className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-500 bg-white/70 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Rabbit className="w-4 h-4 mr-1 text-violet-500" />
              <Label htmlFor="initialRabbits" className="text-sm font-medium">
                Initial Rabbits
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 ml-1 text-gray-400 hover:text-violet-500 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suggested: {suggestions.initialRabbits}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="initialRabbits"
              type="number"
              min={10}
              max={500}
              step={10}
              value={initialRabbits}
              onChange={(e) => onChange({ initialRabbits: Number(e.target.value) })}
              disabled={simulationRunning}
              className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-500 bg-white/70 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Dog className="w-4 h-4 mr-1 text-pink-500" />
              <Label htmlFor="initialWolves" className="text-sm font-medium">
                Initial Wolves
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 ml-1 text-gray-400 hover:text-pink-500 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suggested: {suggestions.initialWolves}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="initialWolves"
              type="number"
              min={5}
              max={200}
              step={5}
              value={initialWolves}
              onChange={(e) => onChange({ initialWolves: Number(e.target.value) })}
              disabled={simulationRunning}
              className="border-pink-200 dark:border-pink-800 focus:border-pink-500 dark:focus:border-pink-500 bg-white/70 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-pink-500/20"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100/50 dark:border-gray-800/50">
          <h3 className="text-md font-semibold mb-3 flex items-center">
            <Dna className="w-4 h-4 mr-1 text-violet-500 animate-spin-slow" />
            Model Parameters
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="alpha" className="text-sm font-medium">
                  Alpha (Rabbit Growth)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 ml-1 text-gray-400 hover:text-violet-500 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suggested: {suggestions.alpha.toFixed(3)}</p>
                      <p className="text-xs text-gray-500">Rabbit population growth rate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="alpha"
                type="number"
                min={0.01}
                max={0.5}
                step={0.01}
                value={alpha}
                onChange={(e) => onChange({ alpha: Number(e.target.value) })}
                disabled={simulationRunning}
                className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-500 bg-white/70 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="beta" className="text-sm font-medium">
                  Beta (Predation)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 ml-1 text-gray-400 hover:text-pink-500 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suggested: {suggestions.beta.toFixed(3)}</p>
                      <p className="text-xs text-gray-500">Rate at which wolves consume rabbits</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="beta"
                type="number"
                min={0.001}
                max={0.1}
                step={0.001}
                value={beta}
                onChange={(e) => onChange({ beta: Number(e.target.value) })}
                disabled={simulationRunning}
                className="border-pink-200 dark:border-pink-800 focus:border-pink-500 dark:focus:border-pink-500 bg-white/70 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-pink-500/20"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="gamma" className="text-sm font-medium">
                  Gamma (Wolf Death)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 ml-1 text-gray-400 hover:text-violet-500 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suggested: {suggestions.gamma.toFixed(3)}</p>
                      <p className="text-xs text-gray-500">Natural death rate of wolves</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="gamma"
                type="number"
                min={0.01}
                max={0.5}
                step={0.01}
                value={gamma}
                onChange={(e) => onChange({ gamma: Number(e.target.value) })}
                disabled={simulationRunning}
                className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-500 bg-white/70 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="delta" className="text-sm font-medium">
                  Delta (Wolf Reproduction)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 ml-1 text-gray-400 hover:text-pink-500 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suggested: {suggestions.delta.toFixed(4)}</p>
                      <p className="text-xs text-gray-500">Efficiency of converting prey into predator births</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="delta"
                type="number"
                min={0.0001}
                max={0.01}
                step={0.0001}
                value={delta}
                onChange={(e) => onChange({ delta: Number(e.target.value) })}
                disabled={simulationRunning}
                className="border-pink-200 dark:border-pink-800 focus:border-pink-500 dark:focus:border-pink-500 bg-white/70 dark:bg-black/20 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-pink-500/20"
              />
            </div>
          </div>
        </div>

        <div className="bg-violet-50/80 dark:bg-violet-900/30 p-3 rounded-md border border-violet-100 dark:border-violet-800 mt-2 backdrop-blur-sm hover:shadow-md transition-all duration-300 animate-pulse-slow">
          <h4 className="text-sm font-medium text-violet-800 dark:text-violet-300 mb-1">
            Lotka-Volterra Model Suggestions
          </h4>
          <p className="text-xs text-violet-700 dark:text-violet-400">
            For a stable predator-prey simulation, try these parameter ranges:
          </p>
          <ul className="text-xs text-violet-700 dark:text-violet-400 mt-1 space-y-1">
            <li className="hover:translate-x-1 transition-transform">• Alpha (prey growth): 0.1-0.3</li>
            <li className="hover:translate-x-1 transition-transform">• Beta (predation rate): 0.01-0.02</li>
            <li className="hover:translate-x-1 transition-transform">• Gamma (predator death): 0.1-0.3</li>
            <li className="hover:translate-x-1 transition-transform">• Delta (predator reproduction): 0.001-0.005</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onStart}
          disabled={simulationRunning || !connected}
          className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 animate-shimmer"
        >
          {simulationRunning ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin">...</span>
              Running Simulation...
            </>
          ) : (
            <>
              <span className="mr-2 h-4 w-4 animate-pulse">▶</span>
              Start Simulation
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SimulationParameters
