import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, Download, AlertTriangle, Activity } from "lucide-react";

interface SimulationStatusProps {
  connected: boolean;
  simulationRunning: boolean;
  currentYear: number | null;
  progress: number;
  executionTime: number | null;
  coresUsed: number | null;
  error: string | null;
  pdfUrl: string | null;
  onDownloadPdf: () => void;
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
    <div className="border shadow-sm rounded-lg p-4 bg-white h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Connection:</span>
        <Badge
          variant={connected ? "default" : "destructive"}
          className={connected ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
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
              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
          }
        >
          {simulationRunning ? "Running" : "Idle"}
        </Badge>
      </div>
      {currentYear !== null && (
        <div className="flex items-center justify-between">
          <span className="font-medium">Current Year:</span>
          <Badge className="bg-violet-100 text-violet-800 hover:bg-violet-100">{currentYear}</Badge>
        </div>
      )}
      {simulationRunning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress:</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      {executionTime !== null && (
        <div className="flex items-center justify-between">
          <span className="font-medium">Execution Time:</span>
          <Badge variant="outline" className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100">
            {executionTime.toFixed(2)} seconds
          </Badge>
        </div>
      )}
      {coresUsed !== null && (
        <div className="flex items-center justify-between">
          <span className="font-medium">CPU Cores Used:</span>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            {coresUsed} cores
          </Badge>
        </div>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {pdfUrl && (
        <Button
          variant="outline"
          className="w-full border-violet-200 hover:bg-violet-50 text-violet-700"
          onClick={onDownloadPdf}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
      )}
    </div>
  );
};

export default SimulationStatus; 