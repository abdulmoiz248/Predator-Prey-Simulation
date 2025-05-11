"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Download, AlertTriangle } from "lucide-react"

interface SimulationStatusProps {
  connected: boolean
  simulationRunning: boolean
  currentYear: number | null
  progress: number
  executionTime: number | null
  coresUsed: number | null
  error: string | null
  pdfUrl: string | null
  onDownloadPdf: () => void
}

const SimulationStatus: React.FC<SimulationStatusProps> = ({
  connected,
  simulationRunning,
  currentYear,
  progress,
  executionTime,
  coresUsed,
  error,
  pdfUrl,
  onDownloadPdf,
}) => {
  return (
    <div className="border shadow-sm rounded-lg p-4 bg-white dark:bg-black/20 backdrop-blur-sm h-full flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="font-medium">Connection:</span>
        <Badge
          variant={connected ? "default" : "destructive"}
          className={
            connected
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors animate-pulse-slow"
              : "animate-pulse"
          }
        >
          {connected ? "Connected" : "Disconnected"}
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium">Simulation:</span>
        <Badge
          variant="outline"
          className={
            simulationRunning
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors animate-pulse"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
          }
        >
          {simulationRunning ? "Running" : "Idle"}
        </Badge>
      </div>
      {currentYear !== null && (
        <div className="flex items-center justify-between animate-fade-in">
          <span className="font-medium">Current Year:</span>
          <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/50 transition-colors">
            {currentYear}
          </Badge>
        </div>
      )}
      {simulationRunning && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex justify-between text-sm">
            <span>Progress:</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>
      )}
      {executionTime !== null && (
        <div className="flex items-center justify-between animate-fade-in">
          <span className="font-medium">Execution Time:</span>
          <Badge
            variant="outline"
            className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
          >
            {executionTime.toFixed(2)} seconds
          </Badge>
        </div>
      )}
      {coresUsed !== null && (
        <div className="flex items-center justify-between animate-fade-in">
          <span className="font-medium">CPU Cores Used:</span>
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
          >
            {coresUsed} cores
          </Badge>
        </div>
      )}
      {error && (
        <Alert variant="destructive" className="animate-shake">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {pdfUrl && (
        <Button
          variant="outline"
          className="w-full border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-900/50 text-violet-700 dark:text-violet-300 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
          onClick={onDownloadPdf}
        >
          <Download className="mr-2 h-4 w-4 animate-bounce-slow" />
          Download PDF Report
        </Button>
      )}
    </div>
  )
}

export default SimulationStatus
