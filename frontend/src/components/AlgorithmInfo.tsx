import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calculator } from "lucide-react"

interface AlgorithmInfoSection {
  title: string
  description: string
  equations?: string[]
  parameters?: string[]
  benefits?: string[]
}

interface AlgorithmInfoProps {
  algorithmInfo: AlgorithmInfoSection[]
  includeFoxes: boolean
  coresUsed: number | null
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithmInfo, includeFoxes, coresUsed }) => {
  return (
    <Card className="border-none shadow-lg bg-white dark:bg-black/20 backdrop-blur-sm mb-8 animate-fade-in overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-50/50 to-pink-50/50 dark:from-violet-950/30 dark:to-pink-950/30">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-violet-500 animate-pulse-slow" />
          Lotka-Volterra Model
        </CardTitle>
        <div className="text-muted-foreground text-sm">Understanding the mathematical model behind the simulation</div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-3 text-violet-700 dark:text-violet-300">The Equations</h3>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="mb-3">The Lotka-Volterra model consists of a pair of differential equations:</p>
              <div className="space-y-2 font-mono text-center">
                <p className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                  dR/dt = αR - βRW
                </p>
                <p className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                  dW/dt = δRW - γW
                </p>
                {includeFoxes && (
                  <p className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 transition-colors animate-fade-in">
                    dF/dt = ηRF - ζF
                  </p>
                )}
              </div>
              <div className="mt-4 text-sm">
                <p className="mb-1">Where:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    R = Rabbit population
                  </li>
                  <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    W = Wolf population
                  </li>
                  {includeFoxes && (
                    <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors animate-fade-in">
                      F = Fox population
                    </li>
                  )}
                  <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    α (alpha) = Rabbit growth rate
                  </li>
                  <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    β (beta) = Wolf predation rate
                  </li>
                  <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    γ (gamma) = Wolf death rate
                  </li>
                  <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    δ (delta) = Wolf reproduction rate
                  </li>
                  {includeFoxes && (
                    <>
                      <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors animate-fade-in">
                        ε (epsilon) = Fox predation rate
                      </li>
                      <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors animate-fade-in">
                        ζ (zeta) = Fox death rate
                      </li>
                      <li className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors animate-fade-in">
                        η (eta) = Fox reproduction rate
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="animate-fade-in-up motion-safe:animate-delay-200">
            <h3 className="text-lg font-semibold mb-3 text-violet-700 dark:text-violet-300">Parallel Implementation</h3>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="mb-3">
                This simulation uses parallel processing to calculate population changes across multiple grid cells
                simultaneously:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li className="hover:translate-x-1 transition-transform">
                  <span className="font-medium text-violet-600 dark:text-violet-400">Spatial Grid:</span> The ecosystem
                  is divided into a grid of cells, each with its own population dynamics
                </li>
                <li className="hover:translate-x-1 transition-transform">
                  <span className="font-medium text-violet-600 dark:text-violet-400">Multi-core Processing:</span>{" "}
                  Calculations for each grid cell are distributed across available CPU cores
                </li>
                <li className="hover:translate-x-1 transition-transform">
                  <span className="font-medium text-violet-600 dark:text-violet-400">Performance Gains:</span> Parallel
                  processing provides significant speedup for large simulations
                </li>
                <li className="hover:translate-x-1 transition-transform">
                  <span className="font-medium text-violet-600 dark:text-violet-400">Realistic Modeling:</span> The grid
                  approach allows for spatial heterogeneity in population distributions
                </li>
              </ul>
              {coresUsed && (
                <div className="mt-3 p-2 bg-violet-50 dark:bg-violet-900/30 rounded border border-violet-200 dark:border-violet-800 text-sm animate-pulse-slow">
                  <p className="font-medium text-violet-700 dark:text-violet-300">
                    Your simulation is using {coresUsed} CPU cores for parallel processing
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AlgorithmInfo
