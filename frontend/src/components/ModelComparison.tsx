"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, ArrowRight, Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ModelComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState("comparison")

  return (
    <Card className="border shadow-md overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Scale className="w-5 h-5 mr-2 text-blue-500" />
          Model Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full rounded-none bg-gray-100 dark:bg-gray-800">
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900"
            >
              Comparison
            </TabsTrigger>
            <TabsTrigger
              value="equations"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900"
            >
              Equations
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900"
            >
              Applications
            </TabsTrigger>
          </TabsList>

          <div className="p-4">
            <TabsContent value="comparison" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Feature</TableHead>
                    <TableHead>Basic Lotka-Volterra</TableHead>
                    <TableHead>Extended Model (with Foxes)</TableHead>
                    <TableHead>Spatial Model</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Species</TableCell>
                    <TableCell>2 (Prey and Predator)</TableCell>
                    <TableCell>3 (Prey and 2 Predators)</TableCell>
                    <TableCell>2+ with spatial distribution</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Spatial Component</TableCell>
                    <TableCell className="text-center">
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Carrying Capacity</TableCell>
                    <TableCell className="text-center">
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Competition</TableCell>
                    <TableCell className="text-center">
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Computational Complexity</TableCell>
                    <TableCell>Low</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>High</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="equations" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Basic Lotka-Volterra</h3>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <div className="space-y-2 font-mono text-center">
                      <p className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                        dR/dt = αR - βRW
                      </p>
                      <p className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                        dW/dt = δRW - γW
                      </p>
                    </div>
                    <div className="mt-4 text-sm">
                      <p className="mb-1">Where:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>R = Rabbit population</li>
                        <li>W = Wolf population</li>
                        <li>α = Rabbit growth rate</li>
                        <li>β = Wolf predation rate</li>
                        <li>γ = Wolf death rate</li>
                        <li>δ = Wolf reproduction rate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    Extended Model (with Foxes)
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <div className="space-y-2 font-mono text-center">
                      <p className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                        dR/dt = αR - βRW - εRF
                      </p>
                      <p className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                        dW/dt = δRW - γW
                      </p>
                      <p className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                        dF/dt = ηRF - ζF
                      </p>
                    </div>
                    <div className="mt-4 text-sm">
                      <p className="mb-1">Additional parameters:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>F = Fox population</li>
                        <li>ε = Fox predation rate</li>
                        <li>ζ = Fox death rate</li>
                        <li>η = Fox reproduction rate</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Ecology</h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-blue-500" />
                        <span>Predicting wildlife population dynamics</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-blue-500" />
                        <span>Conservation planning and management</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-blue-500" />
                        <span>Understanding ecosystem stability</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                    <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Economics</h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-purple-500" />
                        <span>Resource allocation modeling</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-purple-500" />
                        <span>Market competition dynamics</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-purple-500" />
                        <span>Supply and demand oscillations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                    <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Epidemiology</h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-green-500" />
                        <span>Disease spread modeling</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-green-500" />
                        <span>Vaccination strategy optimization</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-1 mt-0.5 text-green-500" />
                        <span>Host-pathogen interaction studies</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Real-World Examples</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">Canadian Lynx and Snowshoe Hare</p>
                      <p>
                        Historical fur trading records from the Hudson's Bay Company show clear predator-prey cycles
                        between lynx and hare populations, closely matching Lotka-Volterra predictions.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Baltic Sea Cod and Sprat</p>
                      <p>
                        Marine biologists have observed Lotka-Volterra dynamics between cod (predator) and sprat (prey)
                        fish populations in the Baltic Sea ecosystem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default ModelComparison
