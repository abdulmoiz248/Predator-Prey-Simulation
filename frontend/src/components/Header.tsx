import { BookOpen, Github, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Header() {
  return (
    <div className="w-full mb-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
          Lotka-Volterra Simulator
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore the dynamics of predator-prey populations using the classic Lotka-Volterra model and its extensions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gradient-to-r from-violet-50 to-pink-50 rounded-lg border border-violet-100 shadow-sm">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="bg-violet-100 p-2 rounded-full mr-3">
            <Info className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <h2 className="font-medium text-violet-800">Ecological Modeling</h2>
            <p className="text-sm text-gray-600">Simulate population dynamics between rabbits, wolves, and foxes</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="border-violet-200">
                  <BookOpen className="h-4 w-4 mr-2 text-violet-600" />
                  <span className="hidden sm:inline">Documentation</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn more about the Lotka-Volterra model</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="border-pink-200">
                  <Github className="h-4 w-4 mr-2 text-pink-600" />
                  <span className="hidden sm:inline">Source Code</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View the source code on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
