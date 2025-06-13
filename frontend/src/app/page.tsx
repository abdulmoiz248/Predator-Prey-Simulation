"use client"
import { useState, useEffect, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import confetti from "canvas-confetti"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import SimulationParameters from "@/components/SimulationParameters"
import SimulationStatus from "@/components/SimulationStatus"
import PopulationStatistics from "@/components/PopulationStatistics"
import EcologicalFacts from "@/components/EcologicalFacts"
import AlgorithmInfo from "@/components/AlgorithmInfo"
import SimulationCharts from "@/components/SimulationCharts"
import Header from "@/components/Header"
import QuickStartGuide from "@/components/QuickStartGuide"
const ecologicalFacts = [
  {
    title: "Rabbit Reproduction",
    description:
      "Rabbits can reproduce at a rate of 4-8 litters per year with 3-8 kits per litter, making them one of the fastest reproducing mammals.",
    icon: <span>🐇</span>,
  },
  {
    title: "Wolf Pack Behavior",
    description:
      "Wolves are highly social animals that live in packs, which helps them hunt more efficiently and protect their territory.",
    icon: <span>🐺</span>,
  },
  {
    title: "Predator-Prey Balance",
    description:
      "In natural ecosystems, predator and prey populations often cycle, with predator numbers lagging behind prey numbers.",
    icon: <span>⚖️</span>,
  },
  {
    title: "Carrying Capacity",
    description:
      "Ecosystems have a maximum population size they can sustain, known as carrying capacity, determined by available resources.",
    icon: <span>🌱</span>,
  },
  {
    title: "Environmental Factors",
    description:
      "Weather, disease, and food availability can significantly impact both predator and prey populations independently of their interactions.",
    icon: <span>🌦️</span>,
  },
]

const algorithmInfo = [
  {
    title: "Lotka-Volterra Model",
    description:
      "The Lotka-Volterra equations describe the dynamics of biological systems in which two species interact, one as a predator and one as prey.",
    equations: ["dR/dt = αR - βRW", "dW/dt = δRW - γW"],
    parameters: [
      "α (alpha): Rabbit growth rate",
      "β (beta): Predation rate",
      "γ (gamma): Wolf death rate",
      "δ (delta): Wolf reproduction rate",
    ],
  },
  {
    title: "Parallel Processing",
    description:
      "The simulation uses parallel processing to calculate population changes across multiple grid cells simultaneously, utilizing multiple CPU cores for improved performance.",
    benefits: [
      "Faster computation for large simulations",
      "More realistic spatial representation",
      "Better utilization of modern multi-core processors",
    ],
  },
]

export default function Home() {
  // State
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [populationData, setPopulationData] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("line")
  const [progress, setProgress] = useState(0)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [coresUsed, setCoresUsed] = useState<number | null>(null)
  const [performanceData, setPerformanceData] = useState<any[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFacts, setShowFacts] = useState(true)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const { toast } = useToast()
  const factIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Simulation parameters
  const [startYear, setStartYear] = useState(2023)
  const [endYear, setEndYear] = useState(2033)
  const [initialRabbits, setInitialRabbits] = useState(100)
  const [initialWolves, setInitialWolves] = useState(20)

  const [alpha, setAlpha] = useState(0.1)
  const [beta, setBeta] = useState(0.01)
  const [gamma, setGamma] = useState(0.05)
  const [delta, setDelta] = useState(0.001)
 


  // Color schemes
  const colors = {
    primary: "#7c3aed",
    secondary: "#ec4899",
    accent: "#06b6d4",
    rabbits: "#8b5cf6",
    wolves: "#f43f5e",
    foxes: "#f59e0b",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    cardBg: "white",
  }
  const COLORS = ["#8b5cf6", "#f43f5e", "#f59e0b", "#10b981"]

  // Rotate facts every 10 seconds
  useEffect(() => {
    if (showFacts) {
      factIntervalRef.current = setInterval(() => {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % ecologicalFacts.length)
      }, 8000)
    } else if (factIntervalRef.current) {
      clearInterval(factIntervalRef.current)
    }
    return () => {
      if (factIntervalRef.current) {
        clearInterval(factIntervalRef.current)
      }
    }
  }, [showFacts])

  useEffect(() => {
    const newSocket = io("http://localhost:5000")
    newSocket.on("connect", () => {
      setConnected(true)
      setError(null)
      toast({ title: "Connected to server", description: "Ready to run simulations", variant: "default" })
    })
    newSocket.on("disconnect", () => {
      setConnected(false)
      toast({
        title: "Disconnected from server",
        description: "Connection to the server was lost",
        variant: "destructive",
      })
    })
    newSocket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}. Make sure the server is running.`)
      setConnected(false)
      toast({
        title: "Connection Error",
        description: `${err.message}. Make sure the server is running.`,
        variant: "destructive",
      })
    })
    newSocket.on("year_update", (data) => {
      setCurrentYear(data.year)
      setPopulationData((prev) => [
        ...prev,
        {
          year: data.year,
          rabbits: data.rabbits,
          wolves: data.wolves,
          ratio: data.rabbits > 0 ? (data.wolves / data.rabbits).toFixed(2) : 0,
     
        },
      ])
      const totalYears = endYear - startYear
      const currentProgress = data.year - startYear
      const progressPercentage = (currentProgress / totalYears) * 100
      setProgress(progressPercentage)
    })
    newSocket.on("performance_update", (data) => {
      setCoresUsed(data.cores)
      setPerformanceData((prev) => [
        ...prev,
        {
          year: data.year,
          timePerYear: data.timePerYear,
          memoryUsage: data.memoryUsage,
        },
      ])
    })
    newSocket.on("pdf_updated", (data) => {
      setPdfUrl(data.pdfUrl)
      toast({ title: "PDF Updated", description: `PDF report updated for year ${data.upto_year}`, variant: "default" })
    })
    newSocket.on("pdf_ready", (data) => {
      setPdfUrl(data.pdfUrl)
      setSimulationRunning(false)
      setExecutionTime(data.executionTime)
      setCoresUsed(data.cores)
      setShowConfetti(true)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      toast({
        title: "Simulation Complete!",
        description: `Execution time: ${data.executionTime.toFixed(2)} seconds using ${data.cores} CPU cores`,
        action: (
          <ToastAction altText="Download PDF" onClick={() => window.open(data.pdfUrl, "_blank")}>
            Download PDF
          </ToastAction>
        ),
      })
    })
    newSocket.on("error", (data) => {
      setError(data.message)
      setSimulationRunning(false)
      toast({ title: "Simulation Error", description: data.message, variant: "destructive" })
    })
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [endYear, startYear, toast])

  const handleParamChange = (changes: any) => {
    if ("startYear" in changes) setStartYear(changes.startYear)
    if ("endYear" in changes) setEndYear(changes.endYear)
    if ("initialRabbits" in changes) setInitialRabbits(changes.initialRabbits)
    if ("initialWolves" in changes) setInitialWolves(changes.initialWolves)
 
    if ("alpha" in changes) setAlpha(changes.alpha)
    if ("beta" in changes) setBeta(changes.beta)
    if ("gamma" in changes) setGamma(changes.gamma)
    if ("delta" in changes) setDelta(changes.delta)
  
  }

  // Start simulation
  const startSimulation = () => {
    if (!socket || !connected) {
      setError("Not connected to server")
      toast({
        title: "Connection Error",
        description: "Not connected to server. Please try again.",
        variant: "destructive",
      })
      return
    }
    if (endYear <= startYear) {
      setError("End year must be greater than start year")
      toast({
        title: "Invalid Parameters",
        description: "End year must be greater than start year",
        variant: "destructive",
      })
      return
    }
    if (initialRabbits <= 0 || initialWolves <= 0) {
      setError("Initial populations must be greater than zero")
      toast({
        title: "Invalid Parameters",
        description: "Initial populations must be greater than zero",
        variant: "destructive",
      })
      return
    }
    if (alpha <= 0 || beta <= 0 || gamma <= 0 || delta <= 0) {
      setError("All rate parameters must be greater than zero")
      toast({
        title: "Invalid Parameters",
        description: "All rate parameters must be greater than zero",
        variant: "destructive",
      })
      return
    }
    setError(null)
    setSimulationRunning(true)
    setCurrentYear(null)
    setPopulationData([])
    setPerformanceData([])
    setPdfUrl(null)
    setProgress(0)
    setExecutionTime(null)
    setCoresUsed(null)
    const params = {
      start_year: startYear,
      end_year: endYear,
      rabbits: initialRabbits,
      wolves: initialWolves,
   
      alpha: alpha,
      beta: beta,
      gamma: gamma,
      delta: delta,
    }
    socket.emit("start_simulation", params)
    toast({
      title: "Simulation Started",
      description: `Running from year ${startYear} to ${endYear}`,
      variant: "default",
    })
  }

  // Statistics
  const getStatistics = () => {
    if (populationData.length === 0) return null
    const lastData = populationData[populationData.length - 1]
    const firstData = populationData[0]
    const rabbitGrowth =
      firstData.rabbits > 0 ? (((lastData.rabbits - firstData.rabbits) / firstData.rabbits) * 100).toFixed(2) : 0
    const wolfGrowth =
      firstData.wolves > 0 ? (((lastData.wolves - firstData.wolves) / firstData.wolves) * 100).toFixed(2) : 0
    const maxRabbits = Math.max(...populationData.map((d) => d.rabbits))
    const minRabbits = Math.min(...populationData.map((d) => d.rabbits))
    const maxWolves = Math.max(...populationData.map((d) => d.wolves))
    const minWolves = Math.min(...populationData.map((d) => d.wolves))
   const rabbitGrowthRates = []
    const wolfGrowthRates = []
   
    for (let i = 1; i < populationData.length; i++) {
      const prev = populationData[i - 1]
      const curr = populationData[i]
      if (prev.rabbits > 0) rabbitGrowthRates.push(((curr.rabbits - prev.rabbits) / prev.rabbits) * 100)
      if (prev.wolves > 0) wolfGrowthRates.push(((curr.wolves - prev.wolves) / prev.wolves) * 100)
    }
    const avgRabbitGrowth =
      rabbitGrowthRates.length > 0
        ? (rabbitGrowthRates.reduce((sum, rate) => sum + rate, 0) / rabbitGrowthRates.length).toFixed(2)
        : "0.00"
    const avgWolfGrowth =
      wolfGrowthRates.length > 0
        ? (wolfGrowthRates.reduce((sum, rate) => sum + rate, 0) / wolfGrowthRates.length).toFixed(2)
        : "0.00"
    
    return {
      rabbitGrowth,
      wolfGrowth,
     
      maxRabbits,
      minRabbits,
      maxWolves,
      minWolves,
    
      currentRabbits: lastData.rabbits,
      currentWolves: lastData.wolves,
   
      avgRabbitGrowth,
      avgWolfGrowth,
    
    }
  }
  const stats = getStatistics()
  // Pie chart data
  const getPieData = () => {
    if (populationData.length === 0) return []
    const lastData = populationData[populationData.length - 1]
    const data = [
      { name: "Rabbits", value: lastData.rabbits },
      { name: "Wolves", value: lastData.wolves },
    ]
  
    return data
  }

  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-[#9bafd9] via-[#c3cfe2] to-[#f5f7fa] dark:from-[#1a1c2e] dark:via-[#2a2d4a] dark:to-[#3a3f68] animate-gradient-x">
      <div className="container mx-auto max-w-7xl">
        <Header />
       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <div className="lg:col-span-1">
            <SimulationParameters
              startYear={startYear}
              endYear={endYear}
              initialRabbits={initialRabbits}
              initialWolves={initialWolves}
            
              alpha={alpha}
              beta={beta}
              gamma={gamma}
              delta={delta}
            
              simulationRunning={simulationRunning}
              onChange={handleParamChange}
              onStart={startSimulation}
              connected={connected}
            />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <SimulationStatus
              connected={connected}
              simulationRunning={simulationRunning}
              currentYear={currentYear}
              progress={progress}
              executionTime={executionTime}
              coresUsed={coresUsed}
              error={error}
              pdfUrl={pdfUrl}
              onDownloadPdf={() => pdfUrl && window.open(pdfUrl, "_blank")}
            />
            <PopulationStatistics stats={stats}  pieData={getPieData()} COLORS={COLORS} />
          </div>
        </div>

        

       <QuickStartGuide />

        <EcologicalFacts
          facts={ecologicalFacts}
          showFacts={showFacts}
          currentFactIndex={currentFactIndex}
          onToggle={() => setShowFacts((prev) => !prev)}
        />
        <AlgorithmInfo algorithmInfo={algorithmInfo} coresUsed={coresUsed} />
        {populationData.length > 0 && (
          <SimulationCharts
            populationData={populationData}
            performanceData={performanceData}
          
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            colors={colors}
            COLORS={COLORS}
          />
        )}
      </div>
    </main>
  )
}
