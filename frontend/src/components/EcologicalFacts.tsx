"use client"

import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronUp, ChevronDown, BookOpen } from "lucide-react"

interface Fact {
  title: string
  description: string
  icon: React.ReactNode
}

interface EcologicalFactsProps {
  facts: Fact[]
  showFacts: boolean
  currentFactIndex: number
  onToggle: () => void
}

const EcologicalFacts: React.FC<EcologicalFactsProps> = ({ facts, showFacts, currentFactIndex, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8"
    >
      <Card className="border-none shadow-lg overflow-hidden bg-white dark:bg-black/20 backdrop-blur-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-violet-50/50 to-pink-50/50 dark:from-violet-950/30 dark:to-pink-950/30">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-violet-500 animate-bounce-slow" />
              Ecological Facts
            </CardTitle>
            <div className="text-muted-foreground text-sm">Learn about predator-prey relationships in nature</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-violet-600 dark:text-violet-400 hover:bg-violet-100/50 dark:hover:bg-violet-900/50 transition-all duration-300"
          >
            {showFacts ? (
              <ChevronUp className="h-4 w-4 animate-bounce-slow" />
            ) : (
              <ChevronDown className="h-4 w-4 animate-bounce-slow" />
            )}
          </Button>
        </CardHeader>
        <AnimatePresence>
          {showFacts && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {facts.map((fact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        className={`border h-full transition-all duration-500 hover:shadow-md ${
                          index === currentFactIndex
                            ? "border-violet-300 dark:border-violet-700 shadow-md bg-violet-50/50 dark:bg-violet-900/20"
                            : "border-gray-200 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800"
                        }`}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-medium flex items-center">
                            <span
                              className={`mr-2 text-violet-500 transition-transform duration-300 ${index === currentFactIndex ? "scale-125" : ""}`}
                            >
                              {fact.icon}
                            </span>
                            {fact.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{fact.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export default EcologicalFacts
