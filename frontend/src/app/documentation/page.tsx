"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, FileText, Calculator, HelpCircle, ChevronRight, ExternalLink, Download } from "lucide-react"
import Header from "@/components/Header"

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-[#9bafd9] via-[#c3cfe2] to-[#f5f7fa] dark:from-[#1a1c2e] dark:via-[#2a2d4a] dark:to-[#3a3f68] animate-gradient-x">
      <div className="container mx-auto max-w-7xl">
        <Header />

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-violet-500/10 to-pink-500/10 dark:from-violet-500/20 dark:to-pink-500/20 p-6">
            <h1 className="text-3xl font-bold mb-2">Lotka-Volterra Simulator Documentation</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Comprehensive guide to understanding, using, and extending the Lotka-Volterra predator-prey simulation
              model.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-800">
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

            <div className="p-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>About the Lotka-Volterra Simulator</h2>
                  <p>
                    The Lotka-Volterra Simulator is an interactive tool for exploring predator-prey population dynamics
                    using the classic Lotka-Volterra model and its extensions. This simulator allows researchers,
                    students, and ecology enthusiasts to visualize and analyze how populations change over time under
                    different parameter settings.
                  </p>

                  <h3>Key Features</h3>
                  <ul>
                    <li>
                      <strong>Interactive Simulation:</strong> Adjust parameters in real-time and observe their effects
                      on population dynamics
                    </li>
                    <li>
                      <strong>Multi-species Support:</strong> Model ecosystems with rabbits, wolves, and optionally
                      foxes
                    </li>
                    <li>
                      <strong>Parallel Processing:</strong> Utilizes multi-core processing for efficient computation
                    </li>
                    <li>
                      <strong>Comprehensive Visualization:</strong> Multiple chart types including line, area, bar, and
                      phase space plots
                    </li>
                    <li>
                      <strong>Detailed Statistics:</strong> Track population ranges, growth rates, and other key metrics
                    </li>
                    <li>
                      <strong>PDF Reports:</strong> Generate and download detailed reports of simulation results
                    </li>
                  </ul>

                  <h3>Applications</h3>
                  <p>The Lotka-Volterra model has applications across various fields:</p>
                  <ul>
                    <li>
                      <strong>Ecology:</strong> Study predator-prey relationships and population cycles
                    </li>
                    <li>
                      <strong>Conservation Biology:</strong> Predict effects of interventions on endangered species
                    </li>
                    <li>
                      <strong>Education:</strong> Teach principles of population dynamics and mathematical modeling
                    </li>
                    <li>
                      <strong>Research:</strong> Test hypotheses about ecological interactions
                    </li>
                  </ul>

                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <Button className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Get Started
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download Sample Data
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="model" className="mt-0 space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>The Lotka-Volterra Model</h2>
                  <p>
                    The Lotka-Volterra model, also known as the predator-prey equations, is a pair of first-order
                    nonlinear differential equations that describe the dynamics of biological systems in which two
                    species interact, one as a predator and one as prey.
                  </p>

                  <h3>Basic Equations</h3>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 font-mono">
                    <p className="mb-2">For prey population (e.g., rabbits):</p>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-center">
                      dR/dt = αR - βRW
                    </div>

                    <p className="mt-4 mb-2">For predator population (e.g., wolves):</p>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-center">
                      dW/dt = δRW - γW
                    </div>
                  </div>

                  <h3>Parameters</h3>
                  <ul>
                    <li>
                      <strong>α (alpha):</strong> Prey growth rate - the natural growth rate of rabbits in the absence
                      of predation
                    </li>
                    <li>
                      <strong>β (beta):</strong> Predation rate - the rate at which predators destroy prey
                    </li>
                    <li>
                      <strong>γ (gamma):</strong> Predator death rate - the natural death rate of predators in the
                      absence of food
                    </li>
                    <li>
                      <strong>δ (delta):</strong> Predator reproduction rate - the efficiency of turning consumed prey
                      into predator births
                    </li>
                  </ul>

                  <h3>Extended Model with Foxes</h3>
                  <p>
                    Our simulator extends the classic model to include a third species (foxes), creating a more complex
                    ecosystem:
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 font-mono">
                    <p className="mb-2">For prey population:</p>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-center">
                      dR/dt = αR - βRW - εRF
                    </div>

                    <p className="mt-4 mb-2">For wolf population:</p>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-center">
                      dW/dt = δRW - γW
                    </div>

                    <p className="mt-4 mb-2">For fox population:</p>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-center">
                      dF/dt = ηRF - ζF
                    </div>
                  </div>

                  <h3>Model Assumptions</h3>
                  <ol>
                    <li>The prey population finds ample food at all times</li>
                    <li>The predator population depends entirely on the prey population for food</li>
                    <li>The rate of change of population is proportional to its size</li>
                    <li>The environment does not change in favor of one species</li>
                    <li>Predators have limitless appetite</li>
                  </ol>

                  <h3>Limitations</h3>
                  <p>
                    While useful for understanding basic dynamics, the classic Lotka-Volterra model has several
                    limitations:
                  </p>
                  <ul>
                    <li>No carrying capacity for the prey population</li>
                    <li>No time delay in the predator response</li>
                    <li>No age structure in either population</li>
                    <li>No spatial component or migration</li>
                    <li>Assumes continuous population sizes rather than discrete individuals</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="tutorial" className="mt-0 space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Tutorial: Running Your First Simulation</h2>

                  <h3>Step 1: Configure Basic Parameters</h3>
                  <p>Start by setting up the basic parameters for your simulation:</p>
                  <ol>
                    <li>
                      Set the <strong>Start Year</strong> and <strong>End Year</strong> for your simulation (e.g., 2023
                      to 2033)
                    </li>
                    <li>
                      Adjust the <strong>Initial Rabbits</strong> and <strong>Initial Wolves</strong> populations
                    </li>
                    <li>
                      Optionally enable foxes by toggling the <strong>Enable Foxes</strong> switch
                    </li>
                  </ol>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Tip:</strong> For a stable simulation, start with approximately 100 rabbits and 20 wolves.
                      If foxes are enabled, start with about 10-15 foxes.
                    </p>
                  </div>

                  <h3>Step 2: Configure Model Parameters</h3>
                  <p>Next, set up the model parameters that control the population dynamics:</p>
                  <ul>
                    <li>
                      <strong>Alpha (α):</strong> Rabbit growth rate (suggested: 0.1-0.3)
                    </li>
                    <li>
                      <strong>Beta (β):</strong> Wolf predation rate (suggested: 0.01-0.02)
                    </li>
                    <li>
                      <strong>Gamma (γ):</strong> Wolf death rate (suggested: 0.1-0.3)
                    </li>
                    <li>
                      <strong>Delta (δ):</strong> Wolf reproduction rate (suggested: 0.001-0.005)
                    </li>
                  </ul>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Tip:</strong> You can click the "Apply Optimal Values" button to automatically set
                      parameters that produce stable oscillations.
                    </p>
                  </div>

                  <h3>Step 3: Run the Simulation</h3>
                  <p>Once your parameters are configured:</p>
                  <ol>
                    <li>
                      Click the <strong>Start Simulation</strong> button
                    </li>
                    <li>Watch as the simulation progresses through each year</li>
                    <li>Observe the population statistics updating in real-time</li>
                  </ol>

                  <h3>Step 4: Analyze Results</h3>
                  <p>After the simulation completes:</p>
                  <ol>
                    <li>Explore different chart types (Line, Area, Bar, Phase Space)</li>
                    <li>Review the population statistics to see min/max values and growth rates</li>
                    <li>Download the PDF report for a comprehensive analysis</li>
                  </ol>

                  <h3>Step 5: Experiment with Different Parameters</h3>
                  <p>
                    Try running multiple simulations with different parameters to observe how they affect the ecosystem:
                  </p>
                  <ul>
                    <li>Increase alpha to see faster rabbit growth</li>
                    <li>Decrease gamma to make wolves survive longer</li>
                    <li>Enable foxes to create a more complex ecosystem</li>
                    <li>Compare results between different parameter sets</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="api" className="mt-0 space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>API Reference</h2>
                  <p>
                    The Lotka-Volterra Simulator provides a WebSocket API that allows programmatic control of
                    simulations. This is useful for integrating the simulator into other applications or running batch
                    simulations.
                  </p>

                  <h3>WebSocket Connection</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
                    {`// Connect to the simulator WebSocket server
const socket = io("http://localhost:5000");`}
                  </pre>

                  <h3>Starting a Simulation</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
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

                  <h3>Event Listeners</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
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

                  <h3>Data Structures</h3>
                  <h4>Year Update Data</h4>
                  <pre className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
                    {`{
  year: number,      // Current simulation year
  rabbits: number,   // Current rabbit population
  wolves: number,    // Current wolf population
  foxes: number      // Current fox population (if enabled)
}`}
                  </pre>

                  <h4>Performance Update Data</h4>
                  <pre className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
                    {`{
  year: number,           // Current simulation year
  cores: number,          // Number of CPU cores used
  timePerYear: number,    // Time taken to compute this year (seconds)
  memoryUsage: number     // Memory usage in MB
}`}
                  </pre>

                  <h4>PDF Ready Data</h4>
                  <pre className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
                    {`{
  pdfUrl: string,         // URL to download the PDF report
  executionTime: number,  // Total execution time in seconds
  cores: number           // Number of CPU cores used
}`}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-0 space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Frequently Asked Questions</h2>

                  <div className="space-y-6">
                    <div>
                      <h3>What is the Lotka-Volterra model?</h3>
                      <p>
                        The Lotka-Volterra model is a set of differential equations that describe the dynamics of
                        biological systems in which two species interact as predator and prey. It was developed
                        independently by Alfred J. Lotka and Vito Volterra in the 1920s.
                      </p>
                    </div>

                    <div>
                      <h3>Why do the population graphs show oscillations?</h3>
                      <p>
                        The oscillations are a key feature of predator-prey dynamics. As prey (rabbit) populations
                        increase, predator (wolf) populations also increase due to abundant food. This leads to more
                        predation, causing prey populations to decrease. With less food available, predator populations
                        then decrease, allowing prey populations to recover, and the cycle continues.
                      </p>
                    </div>

                    <div>
                      <h3>What parameters create stable oscillations?</h3>
                      <p>For stable oscillations, try these parameter ranges:</p>
                      <ul>
                        <li>Alpha (prey growth): 0.1-0.3</li>
                        <li>Beta (predation rate): 0.01-0.02</li>
                        <li>Gamma (predator death): 0.1-0.3</li>
                        <li>Delta (predator reproduction): 0.001-0.005</li>
                      </ul>
                      <p>
                        You can click the "Apply Optimal Values" button to automatically set parameters that produce
                        stable oscillations.
                      </p>
                    </div>

                    <div>
                      <h3>Why does the simulation use parallel processing?</h3>
                      <p>
                        Parallel processing allows the simulator to distribute calculations across multiple CPU cores,
                        significantly improving performance for complex simulations. This is especially important when
                        running spatial models or simulations with many years and species.
                      </p>
                    </div>

                    <div>
                      <h3>Can I export my simulation results?</h3>
                      <p>
                        Yes, after a simulation completes, you can download a comprehensive PDF report by clicking the
                        "Download PDF Report" button. This report includes all charts, statistics, and parameter
                        settings from your simulation.
                      </p>
                    </div>

                    <div>
                      <h3>What does the "Phase Space" chart show?</h3>
                      <p>
                        The Phase Space chart plots predator population against prey population, rather than against
                        time. This reveals the cyclic nature of the relationship between the two populations and can
                        show whether the system reaches a stable limit cycle.
                      </p>
                    </div>

                    <div>
                      <h3>How can I connect to the simulator from my own application?</h3>
                      <p>
                        The simulator provides a WebSocket API that allows programmatic control. See the API Reference
                        section for details on how to connect, start simulations, and receive data.
                      </p>
                    </div>

                    <div>
                      <h3>Is the code open source?</h3>
                      <p>
                        Yes, the Lotka-Volterra Simulator is open source and available on GitHub. You can fork the
                        repository, submit pull requests, or use the code in your own projects under the MIT license.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
