"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronLeft, ChevronRight, Settings, Play, BarChart3, Download, Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const steps = [
  {
    title: "Configure Parameters",
    description: "Set up your simulation by adjusting the population parameters and model coefficients.",
    icon: <Settings className="h-8 w-8 text-violet-500" />,
    tips: [
      "Start with the suggested optimal values for stable oscillations",
      "Increase rabbit growth rate (alpha) for faster population growth",
      "Decrease wolf death rate (gamma) to make predators more resilient",
    ],
  },
  {
    title: "Run Simulation",
    description: "Start the simulation and watch as the predator-prey dynamics unfold over time.",
    icon: <Play className="h-8 w-8 text-green-500" />,
    tips: [
      "Run for at least 10 years to observe complete oscillation cycles",
      "Watch how predator populations lag behind prey populations",
      "Enable foxes to see how a third species affects the ecosystem",
    ],
  },
  {
    title: "Analyze Results",
    description: "Explore the simulation results through various charts and visualizations.",
    icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
    tips: [
      "The line chart shows population changes over time",
      "The phase space view reveals cyclic patterns in population dynamics",
      "Compare different parameter sets to see how they affect stability",
    ],
  },
  {
    title: "Export Report",
    description: "Download a comprehensive PDF report of your simulation results for further analysis.",
    icon: <Download className="h-8 w-8 text-amber-500" />,
    tips: [
      "The PDF includes all charts and statistical analysis",
      "Reports can be used for educational purposes or research",
      "Compare multiple reports to understand parameter sensitivity",
    ],
  },
]

const QuickStartGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  return (
    <Card className="border shadow-md overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-violet-500/10 to-amber-500/10 dark:from-violet-500/20 dark:to-amber-500/20">
        <CardTitle className="text-xl font-semibold flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-violet-500" />
          Quick Start Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900/50 p-4">
            <ul className="space-y-2">
              {steps.map((step, index) => (
                <li key={index}>
                  <Button
                    variant={currentStep === index ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      currentStep === index
                        ? "bg-violet-500 text-white"
                        : "hover:bg-violet-100 dark:hover:bg-violet-900/30"
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <Badge
                      className={`mr-2 ${
                        currentStep === index
                          ? "bg-white text-violet-500"
                          : "bg-violet-100 text-violet-500 dark:bg-violet-900/50"
                      }`}
                    >
                      {index + 1}
                    </Badge>
                    {step.title}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-2/3 p-6 flex flex-col items-center text-center">
            <div className="mb-6 p-4 rounded-full bg-violet-100 dark:bg-violet-900/30">{steps[currentStep].icon}</div>
            <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{steps[currentStep].description}</p>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800 w-full">
              <div className="flex items-center mb-2">
                <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                <h4 className="font-medium text-amber-700 dark:text-amber-400">Pro Tips</h4>
              </div>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-2">
                {steps[currentStep].tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between w-full mt-6">
              <Button variant="outline" onClick={prevStep} className="flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" onClick={nextStep} className="flex items-center">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickStartGuide
