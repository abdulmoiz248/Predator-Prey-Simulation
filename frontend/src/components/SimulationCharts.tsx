"use client"

import type React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChartIcon, Activity, BarChart3, PieChartIcon, Cpu } from "lucide-react"

interface SimulationChartsProps {
  populationData: any[]
  performanceData: any[]
 
  activeTab: string
  setActiveTab: (tab: string) => void
  colors: Record<string, string>
  COLORS: string[]
}

const SimulationCharts: React.FC<SimulationChartsProps> = ({
  populationData,
  performanceData,
 
  activeTab,
  setActiveTab,
  colors,
  COLORS,
}) => {
  // Prepare phase data
  const getPhaseData = () =>
    populationData.map((d) => ({
      rabbits: d.rabbits,
      wolves: d.wolves,
      foxes: d.foxes || 0,
      year: d.year,
    }))

  return (
    <div className="border-none shadow-lg mb-8 bg-white dark:bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden animate-fade-in">
      <div className="p-6 pb-0 bg-gradient-to-r from-violet-50/50 to-pink-50/50 dark:from-violet-950/30 dark:to-pink-950/30">
        <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
          Simulation Results
        </div>
        <div className="text-muted-foreground mb-4">Population dynamics over time</div>
        <Tabs defaultValue="line" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl bg-gray-100/80 dark:bg-gray-900/50 backdrop-blur-sm">
            <TabsTrigger
              value="line"
              className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 transition-all duration-300"
            >
              <LineChartIcon className="w-4 h-4 mr-2" />
              Line
            </TabsTrigger>
            <TabsTrigger
              value="area"
              className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 transition-all duration-300"
            >
              <Activity className="w-4 h-4 mr-2" />
              Area
            </TabsTrigger>
            <TabsTrigger
              value="bar"
              className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Bar
            </TabsTrigger>
            <TabsTrigger
              value="phase"
              className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 transition-all duration-300"
            >
              <PieChartIcon className="w-4 h-4 mr-2" />
              Phase Space
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 transition-all duration-300"
            >
              <Cpu className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>
          <div className="h-[500px] p-4 bg-white dark:bg-gray-900/10">
            <TabsContent value="line" className="h-full animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={populationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700/50" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottomRight", offset: -10 }} />
                  <YAxis label={{ value: "Population", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                    itemStyle={{ padding: "4px 0" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rabbits"
                    name="Rabbits"
                    stroke={colors.rabbits}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 8, strokeWidth: 0, fill: colors.rabbits }}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="wolves"
                    name="Wolves"
                    stroke={colors.wolves}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 8, strokeWidth: 0, fill: colors.wolves }}
                    animationDuration={1500}
                  />
                 
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="area" className="h-full animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={populationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700/50" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottomRight", offset: -10 }} />
                  <YAxis label={{ value: "Population", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="rabbits"
                    name="Rabbits"
                    stroke={colors.rabbits}
                    fill={`${colors.rabbits}40`}
                    activeDot={{ r: 8 }}
                    animationDuration={1500}
                  />
                  <Area
                    type="monotone"
                    dataKey="wolves"
                    name="Wolves"
                    stroke={colors.wolves}
                    fill={`${colors.wolves}40`}
                    activeDot={{ r: 8 }}
                    animationDuration={1500}
                  />
                
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="bar" className="h-full animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={populationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700/50" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottomRight", offset: -10 }} />
                  <YAxis label={{ value: "Population", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="rabbits"
                    name="Rabbits"
                    fill={colors.rabbits}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar
                    dataKey="wolves"
                    name="Wolves"
                    fill={colors.wolves}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                 
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="phase" className="h-full animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700/50" />
                  <XAxis type="number" dataKey="rabbits" name="Rabbits" label={{ value: "Rabbits" }} />
                  <YAxis type="number" dataKey="wolves" name="Wolves" label={{ value: "Wolves" }} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Scatter
                    name="Rabbits vs Wolves"
                    data={getPhaseData()}
                    fill={colors.rabbits}
                    animationDuration={1500}
                  />
                
                </ScatterChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="performance" className="h-full animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700/50" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottomRight", offset: -10 }} />
                  <YAxis yAxisId="left" label={{ value: "Time per Year (s)", angle: -90, position: "insideLeft" }} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "Memory Usage (MB)", angle: -90, position: "insideRight" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="timePerYear"
                    name="Time per Year (s)"
                    stroke={colors.primary}
                    strokeWidth={2}
                    animationDuration={1500}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="memoryUsage"
                    name="Memory Usage (MB)"
                    stroke={colors.accent}
                    strokeWidth={2}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default SimulationCharts
