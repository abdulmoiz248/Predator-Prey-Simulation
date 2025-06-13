import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { BarChart3, Info } from "lucide-react"

interface PopulationStatisticsProps {
  stats: {
    rabbitGrowth: string | number
    wolfGrowth: string | number
  
    maxRabbits: number
    minRabbits: number
    maxWolves: number
    minWolves: number
  
    currentRabbits: number
    currentWolves: number
  
    avgRabbitGrowth: string | number
    avgWolfGrowth: string | number
  
  } | null
   
  pieData: any[]
  COLORS: string[]
}

const PopulationStatistics: React.FC<PopulationStatisticsProps> = ({ stats, pieData, COLORS }) => {
  return (
    <Card className="border shadow-sm bg-white dark:bg-black/20 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-2 bg-gradient-to-r from-violet-50/50 to-pink-50/50 dark:from-violet-950/30 dark:to-pink-950/30">
        <CardTitle className="text-xl font-semibold flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-violet-500 animate-pulse-slow" />
          Population Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {stats ? (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-violet-50 dark:bg-violet-900/30 p-3 rounded-lg border border-violet-100 dark:border-violet-800 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group">
                <div className="text-sm text-violet-700 dark:text-violet-300 mb-1 group-hover:font-medium transition-all">
                  Rabbits
                </div>
                <div className="text-xl font-bold text-violet-900 dark:text-violet-100 group-hover:scale-110 transition-transform origin-left">
                  {stats.currentRabbits}
                </div>
                <div
                  className={`text-sm ${Number(stats.rabbitGrowth) >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {Number(stats.rabbitGrowth) >= 0 ? "↑" : "↓"} {Math.abs(Number(stats.rabbitGrowth))}%
                </div>
              </div>
              <div className="bg-pink-50 dark:bg-pink-900/30 p-3 rounded-lg border border-pink-100 dark:border-pink-800 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group">
                <div className="text-sm text-pink-700 dark:text-pink-300 mb-1 group-hover:font-medium transition-all">
                  Wolves
                </div>
                <div className="text-xl font-bold text-pink-900 dark:text-pink-100 group-hover:scale-110 transition-transform origin-left">
                  {stats.currentWolves}
                </div>
                <div
                  className={`text-sm ${Number(stats.wolfGrowth) >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {Number(stats.wolfGrowth) >= 0 ? "↑" : "↓"} {Math.abs(Number(stats.wolfGrowth))}%
                </div>
              </div>
            
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md">
                <div className="text-sm font-medium mb-1">Population Range</div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between hover:bg-violet-50 dark:hover:bg-violet-900/20 p-1 rounded transition-colors">
                    <span className="text-violet-700 dark:text-violet-300">Rabbits:</span>
                    <span>
                      {stats.minRabbits} - {stats.maxRabbits}
                    </span>
                  </div>
                  <div className="flex justify-between hover:bg-pink-50 dark:hover:bg-pink-900/20 p-1 rounded transition-colors">
                    <span className="text-pink-700 dark:text-pink-300">Wolves:</span>
                    <span>
                      {stats.minWolves} - {stats.maxWolves}
                    </span>
                  </div>
                
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md">
                <div className="text-sm font-medium mb-1">Avg. Growth Rate</div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between hover:bg-violet-50 dark:hover:bg-violet-900/20 p-1 rounded transition-colors">
                    <span className="text-violet-700 dark:text-violet-300">Rabbits:</span>
                    <span
                      className={
                        Number(stats.avgRabbitGrowth) >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {Number(stats.avgRabbitGrowth) >= 0 ? "+" : ""}
                      {stats.avgRabbitGrowth}%
                    </span>
                  </div>
                  <div className="flex justify-between hover:bg-pink-50 dark:hover:bg-pink-900/20 p-1 rounded transition-colors">
                    <span className="text-pink-700 dark:text-pink-300">Wolves:</span>
                    <span
                      className={
                        Number(stats.avgWolfGrowth) >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {Number(stats.avgWolfGrowth) >= 0 ? "+" : ""}
                      {stats.avgWolfGrowth}%
                    </span>
                  </div>
                 
                </div>
              </div>
            </div>
            {pieData.length > 0 && (
              <div className="mt-4 h-[120px] animate-fade-in">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(4px)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center text-gray-500 dark:text-gray-400 animate-pulse">
            <Info className="h-12 w-12 mb-2 text-gray-300 dark:text-gray-700" />
            <p>Run a simulation to see population statistics</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PopulationStatistics
