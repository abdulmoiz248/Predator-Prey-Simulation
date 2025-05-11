import { BookOpen, Github, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Header() {
  return (
    <div className="w-full mb-8 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
          Lotka-Volterra Simulator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto animate-fade-in-up">
          Explore the dynamics of predator-prey populations using the classic Lotka-Volterra model and its extensions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gradient-to-r from-violet-50/90 to-pink-50/90 dark:from-violet-950/30 dark:to-pink-950/30 backdrop-blur-sm rounded-lg border border-violet-100 dark:border-violet-800 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up">
        <div className="flex items-center mb-4 sm:mb-0 group">
          <div className="bg-violet-100 dark:bg-violet-900 p-2 rounded-full mr-3 shadow-sm group-hover:shadow-violet-200 dark:group-hover:shadow-violet-800 transition-all duration-300 group-hover:scale-105">
            <Info className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="font-medium text-violet-800 dark:text-violet-300 group-hover:text-violet-900 dark:group-hover:text-violet-200 transition-colors">
              Ecological Modeling
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Simulate population dynamics between rabbits, wolves, and foxes
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-violet-200 dark:border-violet-800 hover:bg-violet-100/50 dark:hover:bg-violet-900/50 transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="h-4 w-4 mr-2 text-violet-600 dark:text-violet-400" />
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
                <Button
                  variant="outline"
                  size="sm"
                  className="border-pink-200 dark:border-pink-800 hover:bg-pink-100/50 dark:hover:bg-pink-900/50 transition-all duration-300 hover:scale-105"
                >
                  <Github className="h-4 w-4 mr-2 text-pink-600 dark:text-pink-400" />
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
