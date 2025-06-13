"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Code,
  FileText,
  Calculator,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Download,
  Search,
  Github,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Header from "@/components/Header"


export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
     <div className="pt-5">
       <Header/>
       </div>

      <div className="container max-w-7xl px-4 py-8">
        <div className="mx-auto">
         

          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-800">
              <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-indigo-500/20 p-8 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/50"
                      >
                        v2.4.0
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50"
                      >
                        Stable
                      </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                      Lotka-Volterra Simulator Documentation
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                      Comprehensive guide to understanding, using, and extending the Lotka-Volterra predator-prey
                      simulation model.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      Get Started
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Demo
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-gray-200 dark:border-gray-800 px-4">
                  <TabsList className="flex h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="overview"
                      className="flex items-center px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 rounded-none bg-transparent"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="model"
                      className="flex items-center px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 rounded-none bg-transparent"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      The Model
                    </TabsTrigger>
                    <TabsTrigger
                      value="tutorial"
                      className="flex items-center px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 rounded-none bg-transparent"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Tutorial
                    </TabsTrigger>
                    <TabsTrigger
                      value="api"
                      className="flex items-center px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 rounded-none bg-transparent"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      API Reference
                    </TabsTrigger>
                    <TabsTrigger
                      value="faq"
                      className="flex items-center px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 rounded-none bg-transparent"
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      FAQ
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 md:p-8">
                  <TabsContent value="overview" className="mt-0 space-y-8">
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold tracking-tight mb-4">About the Lotka-Volterra Simulator</h2>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            The Lotka-Volterra Simulator is an interactive tool for exploring predator-prey population
                            dynamics using the classic Lotka-Volterra model and its extensions. This simulator allows
                            researchers, students, and ecology enthusiasts to visualize and analyze how populations
                            change over time under different parameter settings.
                          </p>
                        </div>
                        <div className="w-full md:w-80 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4">
                          <img
                            src="/ss.png"
                            alt="Lotka-Volterra Simulation"
                            className="w-full h-auto rounded-md mb-3"
                          />
                          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Example of population oscillations in a predator-prey system
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-gray-200 dark:border-gray-800">
                          <CardContent className="p-4 flex gap-3 items-start">
                            <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-md">
                              <Calculator className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Interactive Simulation</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Adjust parameters in real-time and observe their effects on population dynamics
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-gray-200 dark:border-gray-800">
                          <CardContent className="p-4 flex gap-3 items-start">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-md">
                              <Code className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Multi-species Support</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Model ecosystems with rabbits, wolves, and optionally foxes
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-gray-200 dark:border-gray-800">
                          <CardContent className="p-4 flex gap-3 items-start">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Comprehensive Visualization</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Multiple chart types including line, area, bar, and phase space plots
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-gray-200 dark:border-gray-800">
                          <CardContent className="p-4 flex gap-3 items-start">
                            <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-md">
                              <Download className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">PDF Reports</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Generate and download detailed reports of simulation results
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold mt-8 mb-4">Applications</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The Lotka-Volterra model has applications across various fields:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Ecology:</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {" "}
                              Study predator-prey relationships and population cycles
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Conservation Biology:</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {" "}
                              Predict effects of interventions on endangered species
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Education:</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {" "}
                              Teach principles of population dynamics and mathematical modeling
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Research:</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {" "}
                              Test hypotheses about ecological interactions
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50 rounded-xl p-6 border border-violet-100 dark:border-violet-900/30">
                        <h3 className="text-xl font-semibold mb-3">Ready to get started?</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Explore the Lotka-Volterra model and start creating your own simulations today.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4" />
                            Get Started
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download Sample Data
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            View on GitHub
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="model" className="mt-0 space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <h2 className="text-2xl font-bold tracking-tight mb-4">The Lotka-Volterra Model</h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        The Lotka-Volterra model, also known as the predator-prey equations, is a pair of first-order
                        nonlinear differential equations that describe the dynamics of biological systems in which two
                        species interact, one as a predator and one as prey.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Basic Equations</h3>
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                            <p className="mb-3 font-medium">For prey population (e.g., rabbits):</p>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center mb-6">
                              <span className="text-lg font-mono">dR/dt = αR - βRW</span>
                            </div>

                            <p className="mb-3 font-medium">For predator population (e.g., wolves):</p>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                              <span className="text-lg font-mono">dW/dt = δRW - γW</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-4">Parameters</h3>
                          <div className="space-y-3">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-3">
                                <div className="bg-violet-100 dark:bg-violet-900/30 w-10 h-10 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 font-medium">
                                  α
                                </div>
                                <div>
                                  <div className="font-medium">Alpha (α)</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Prey growth rate - the natural growth rate of rabbits in the absence of predation
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 dark:bg-indigo-900/30 w-10 h-10 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">
                                  β
                                </div>
                                <div>
                                  <div className="font-medium">Beta (β)</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Predation rate - the rate at which predators destroy prey
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-3">
                                <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium">
                                  γ
                                </div>
                                <div>
                                  <div className="font-medium">Gamma (γ)</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Predator death rate - the natural death rate of predators in the absence of food
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 w-10 h-10 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-400 font-medium">
                                  δ
                                </div>
                                <div>
                                  <div className="font-medium">Delta (δ)</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Predator reproduction rate - the efficiency of turning consumed prey into predator
                                    births
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">Extended Model with Foxes</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Our simulator extends the classic model to include a third species (foxes), creating a more
                        complex ecosystem:
                      </p>

                      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
                        <p className="mb-3 font-medium">For prey population:</p>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center mb-6">
                          <span className="text-lg font-mono">dR/dt = αR - βRW - εRF</span>
                        </div>

                        <p className="mb-3 font-medium">For wolf population:</p>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center mb-6">
                          <span className="text-lg font-mono">dW/dt = δRW - γW</span>
                        </div>

                        <p className="mb-3 font-medium">For fox population:</p>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                          <span className="text-lg font-mono">dF/dt = ηRF - ζF</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Model Assumptions</h3>
                          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <ol className="divide-y divide-gray-200 dark:divide-gray-700">
                              <li className="p-4 flex items-center gap-3">
                                <span className="bg-violet-100 dark:bg-violet-900/30 w-6 h-6 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 text-sm font-medium">
                                  1
                                </span>
                                <span>The prey population finds ample food at all times</span>
                              </li>
                              <li className="p-4 flex items-center gap-3">
                                <span className="bg-violet-100 dark:bg-violet-900/30 w-6 h-6 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 text-sm font-medium">
                                  2
                                </span>
                                <span>The predator population depends entirely on the prey population for food</span>
                              </li>
                              <li className="p-4 flex items-center gap-3">
                                <span className="bg-violet-100 dark:bg-violet-900/30 w-6 h-6 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 text-sm font-medium">
                                  3
                                </span>
                                <span>The rate of change of population is proportional to its size</span>
                              </li>
                              <li className="p-4 flex items-center gap-3">
                                <span className="bg-violet-100 dark:bg-violet-900/30 w-6 h-6 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 text-sm font-medium">
                                  4
                                </span>
                                <span>The environment does not change in favor of one species</span>
                              </li>
                              <li className="p-4 flex items-center gap-3">
                                <span className="bg-violet-100 dark:bg-violet-900/30 w-6 h-6 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 text-sm font-medium">
                                  5
                                </span>
                                <span>Predators have limitless appetite</span>
                              </li>
                            </ol>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-4">Limitations</h3>
                          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                            <p className="mb-3">
                              While useful for understanding basic dynamics, the classic Lotka-Volterra model has
                              several limitations:
                            </p>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400"></div>
                                <span>No carrying capacity for the prey population</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400"></div>
                                <span>No time delay in the predator response</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400"></div>
                                <span>No age structure in either population</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400"></div>
                                <span>No spatial component or migration</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400"></div>
                                <span>Assumes continuous population sizes rather than discrete individuals</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tutorial" className="mt-0 space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <h2 className="text-2xl font-bold tracking-tight mb-4">
                        Tutorial: Running Your First Simulation
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="md:col-span-2">
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Follow this step-by-step guide to run your first Lotka-Volterra simulation. This tutorial
                            will walk you through setting up parameters, running the simulation, and analyzing the
                            results.
                          </p>

                          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50 rounded-xl p-5 border border-violet-100 dark:border-violet-900/30 mb-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-md">
                                <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                              </div>
                              <h4 className="font-medium">Before You Begin</h4>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Make sure you have the simulator installed and running. If you haven't installed it yet,
                              refer to the installation guide in the documentation.
                            </p>
                          </div>
                        </div>

                        <div className="hidden md:block">
                          <img
                            src="/placeholder.svg?height=200&width=300"
                            alt="Tutorial Preview"
                            className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-800"
                          />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="bg-violet-100 dark:bg-violet-900/30 w-8 h-8 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 font-medium">
                                1
                              </div>
                              <h3 className="text-lg font-semibold">Configure Basic Parameters</h3>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="mb-4">Start by setting up the basic parameters for your simulation:</p>
                            <ol className="space-y-3 mb-4">
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>
                                  Set the <strong>Start Year</strong> and <strong>End Year</strong> for your simulation
                                  (e.g., 2023 to 2033)
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>
                                  Adjust the <strong>Initial Rabbits</strong> and <strong>Initial Wolves</strong>{" "}
                                  populations
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>
                                  Optionally enable foxes by toggling the <strong>Enable Foxes</strong> switch
                                </span>
                              </li>
                            </ol>
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="bg-violet-100 dark:bg-violet-900/30 p-1 rounded">
                                  <BookOpen className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                </div>
                                <strong>Tip:</strong> For a stable simulation, start with approximately 100 rabbits and
                                20 wolves. If foxes are enabled, start with about 10-15 foxes.
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="bg-violet-100 dark:bg-violet-900/30 w-8 h-8 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 font-medium">
                                2
                              </div>
                              <h3 className="text-lg font-semibold">Configure Model Parameters</h3>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="mb-4">
                              Next, set up the model parameters that control the population dynamics:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="bg-violet-100 dark:bg-violet-900/30 w-6 h-6 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 font-medium text-sm">
                                    α
                                  </div>
                                  <span className="font-medium">Alpha (α)</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Rabbit growth rate (suggested: 0.1-0.3)
                                </p>
                              </div>

                              <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="bg-indigo-100 dark:bg-indigo-900/30 w-6 h-6 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                                    β
                                  </div>
                                  <span className="font-medium">Beta (β)</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Wolf predation rate (suggested: 0.01-0.02)
                                </p>
                              </div>

                              <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="bg-purple-100 dark:bg-purple-900/30 w-6 h-6 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium text-sm">
                                    γ
                                  </div>
                                  <span className="font-medium">Gamma (γ)</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Wolf death rate (suggested: 0.1-0.3)
                                </p>
                              </div>

                              <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="bg-pink-100 dark:bg-pink-900/30 w-6 h-6 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-400 font-medium text-sm">
                                    δ
                                  </div>
                                  <span className="font-medium">Delta (δ)</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Wolf reproduction rate (suggested: 0.001-0.005)
                                </p>
                              </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="bg-violet-100 dark:bg-violet-900/30 p-1 rounded">
                                  <BookOpen className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                </div>
                                <strong>Tip:</strong> You can click the "Apply Optimal Values" button to automatically
                                set parameters that produce stable oscillations.
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="bg-violet-100 dark:bg-violet-900/30 w-8 h-8 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 font-medium">
                                3
                              </div>
                              <h3 className="text-lg font-semibold">Run the Simulation</h3>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="mb-4">Once your parameters are configured:</p>
                            <ol className="space-y-3">
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>
                                  Click the <strong>Start Simulation</strong> button
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Watch as the simulation progresses through each year</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Observe the population statistics updating in real-time</span>
                              </li>
                            </ol>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="bg-violet-100 dark:bg-violet-900/30 w-8 h-8 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 font-medium">
                                4
                              </div>
                              <h3 className="text-lg font-semibold">Analyze Results</h3>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="mb-4">After the simulation completes:</p>
                            <ol className="space-y-3">
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Explore different chart types (Line, Area, Bar, Phase Space)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Review the population statistics to see min/max values and growth rates</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Download the PDF report for a comprehensive analysis</span>
                              </li>
                            </ol>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="bg-violet-100 dark:bg-violet-900/30 w-8 h-8 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 font-medium">
                                5
                              </div>
                              <h3 className="text-lg font-semibold">Experiment with Different Parameters</h3>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="mb-4">
                              Try running multiple simulations with different parameters to observe how they affect the
                              ecosystem:
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Increase alpha to see faster rabbit growth</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Decrease gamma to make wolves survive longer</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Enable foxes to create a more complex ecosystem</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Compare results between different parameter sets</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="api" className="mt-0 space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <h2 className="text-2xl font-bold tracking-tight mb-4">API Reference</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        The Lotka-Volterra Simulator provides a WebSocket API that allows programmatic control of
                        simulations. This is useful for integrating the simulator into other applications or running
                        batch simulations.
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                          <div className="space-y-8">
                            <div>
                              <h3 className="text-xl font-semibold mb-4">WebSocket Connection</h3>
                              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-violet-100 dark:bg-violet-900/30 p-1 rounded">
                                      <Code className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <span className="font-medium text-sm">Connect to WebSocket</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    JavaScript
                                  </Badge>
                                </div>
                                <pre className="p-4 font-mono text-sm overflow-x-auto">
                                  {`// Connect to the simulator WebSocket server
const socket = io("http://localhost:5000");`}
                                </pre>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold mb-4">Starting a Simulation</h3>
                              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-violet-100 dark:bg-violet-900/30 p-1 rounded">
                                      <Code className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <span className="font-medium text-sm">Start Simulation</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    JavaScript
                                  </Badge>
                                </div>
                                <pre className="p-4 font-mono text-sm overflow-x-auto">
                                  {`// Configure simulation parameters
const params = {
  start_year: 2023,
  end_year: 2033,
  rabbits: 100,
  wolves: 20,
  foxes: 0,
  alpha: 0.1,
  beta: 0.01,
  gamma: 0.05,
  delta: 0.001,
  enable_foxes: false,
  fox_predation_rate: 0.005,
  fox_death_rate: 0.08,
  fox_reproduction_rate: 0.0005
};

// Start the simulation
socket.emit("start_simulation", params);`}
                                </pre>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold mb-4">Event Listeners</h3>
                              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-violet-100 dark:bg-violet-900/30 p-1 rounded">
                                      <Code className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <span className="font-medium text-sm">Event Listeners</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    JavaScript
                                  </Badge>
                                </div>
                                <pre className="p-4 font-mono text-sm overflow-x-auto">
                                  {`// Listen for year updates
socket.on("year_update", (data) => {
  console.log(\`Year: \${data.year}, Rabbits: \${data.rabbits}, Wolves: \${data.wolves}\`);
});

// Listen for performance updates
socket.on("performance_update", (data) => {
  console.log(\`Cores: \${data.cores}, Time per year: \${data.timePerYear}s\`);
});

// Listen for PDF generation
socket.on("pdf_ready", (data) => {
  console.log(\`Simulation complete! PDF available at: \${data.pdfUrl}\`);
  console.log(\`Execution time: \${data.executionTime}s\`);
});

// Listen for errors
socket.on("error", (data) => {
  console.error(\`Error: \${data.message}\`);
});`}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-4">
                          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-32">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                              <h3 className="font-medium">Data Structures</h3>
                            </div>
                            <div className="p-4 space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Year Update Data</h4>
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                                  <pre className="font-mono text-xs overflow-x-auto">
                                    {`{
  year: number,      // Current simulation year
  rabbits: number,   // Current rabbit population
  wolves: number,    // Current wolf population
  foxes: number      // Current fox population (if enabled)
}`}
                                  </pre>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium mb-2">Performance Update Data</h4>
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                                  <pre className="font-mono text-xs overflow-x-auto">
                                    {`{
  year: number,           // Current simulation year
  cores: number,          // Number of CPU cores used
  timePerYear: number,    // Time taken to compute this year (seconds)
  memoryUsage: number     // Memory usage in MB
}`}
                                  </pre>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium mb-2">PDF Ready Data</h4>
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                                  <pre className="font-mono text-xs overflow-x-auto">
                                    {`{
  pdfUrl: string,         // URL to download the PDF report
  executionTime: number,  // Total execution time in seconds
  cores: number           // Number of CPU cores used
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="faq" className="mt-0 space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-3">What is the Lotka-Volterra model?</h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            The Lotka-Volterra model is a set of differential equations that describe the dynamics of
                            biological systems in which two species interact as predator and prey. It was developed
                            independently by Alfred J. Lotka and Vito Volterra in the 1920s.
                          </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-3">
                            Why do the population graphs show oscillations?
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            The oscillations are a key feature of predator-prey dynamics. As prey (rabbit) populations
                            increase, predator (wolf) populations also increase due to abundant food. This leads to more
                            predation, causing prey populations to decrease. With less food available, predator
                            populations then decrease, allowing prey populations to recover, and the cycle continues.
                          </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-3">What parameters create stable oscillations?</h3>
                          <div className="space-y-3">
                            <p className="text-gray-700 dark:text-gray-300">
                              For stable oscillations, try these parameter ranges:
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                                <span className="font-medium">Alpha (prey growth):</span> 0.1-0.3
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                                <span className="font-medium">Beta (predation rate):</span> 0.01-0.02
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                                <span className="font-medium">Gamma (predator death):</span> 0.1-0.3
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                                <span className="font-medium">Delta (predator reproduction):</span> 0.001-0.005
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              You can click the "Apply Optimal Values" button to automatically set parameters that
                              produce stable oscillations.
                            </p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-3">
                            Why does the simulation use parallel processing?
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            Parallel processing allows the simulator to distribute calculations across multiple CPU
                            cores, significantly improving performance for complex simulations. This is especially
                            important when running spatial models or simulations with many years and species.
                          </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-3">Can I export my simulation results?</h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            Yes, after a simulation completes, you can download a comprehensive PDF report by clicking
                            the "Download PDF Report" button. This report includes all charts, statistics, and parameter
                            settings from your simulation.
                          </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-3">What does the "Phase Space" chart show?</h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            The Phase Space chart plots predator population against prey population, rather than against
                            time. This reveals the cyclic nature of the relationship between the two populations and can
                            show whether the system reaches a stable limit cycle.
                          </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-3">
                            How can I connect to the simulator from my own application?
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            The simulator provides a WebSocket API that allows programmatic control. See the API
                            Reference section for details on how to connect, start simulations, and receive data.
                          </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-3">Is the code open source?</h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            Yes, the Lotka-Volterra Simulator is open source and available on GitHub. You can fork the
                            repository, submit pull requests, or use the code in your own projects under the MIT
                            license.
                          </p>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <Github className="h-4 w-4" />
                              <span>View Source</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <div className="flex items-center justify-between py-6 border-t border-gray-200 dark:border-gray-800 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Last updated:</span>
                <span>June 10, 2025</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <span>Previous</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
