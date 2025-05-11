import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3, Info } from "lucide-react";

interface PopulationStatisticsProps {
  stats: {
    rabbitGrowth: string | number;
    wolfGrowth: string | number;
    foxGrowth: string | number;
    maxRabbits: number;
    minRabbits: number;
    maxWolves: number;
    minWolves: number;
    maxFoxes: number;
    minFoxes: number;
    currentRabbits: number;
    currentWolves: number;
    currentFoxes: number;
    avgRabbitGrowth: string | number;
    avgWolfGrowth: string | number;
    avgFoxGrowth: string | number;
  } | null;
  enableFoxes: boolean;
  pieData: any[];
  COLORS: string[];
}

const PopulationStatistics: React.FC<PopulationStatisticsProps> = ({ stats, enableFoxes, pieData, COLORS }) => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-violet-500" />
          Population Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stats ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-violet-50 p-3 rounded-lg">
                <div className="text-sm text-violet-700 mb-1">Rabbits</div>
                <div className="text-xl font-bold text-violet-900">{stats.currentRabbits}</div>
                <div className={`text-sm ${Number(stats.rabbitGrowth) >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {Number(stats.rabbitGrowth) >= 0 ? "↑" : "↓"} {Math.abs(Number(stats.rabbitGrowth))}%
                </div>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <div className="text-sm text-pink-700 mb-1">Wolves</div>
                <div className="text-xl font-bold text-pink-900">{stats.currentWolves}</div>
                <div className={`text-sm ${Number(stats.wolfGrowth) >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {Number(stats.wolfGrowth) >= 0 ? "↑" : "↓"} {Math.abs(Number(stats.wolfGrowth))}%
                </div>
              </div>
              {enableFoxes && (
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="text-sm text-amber-700 mb-1">Foxes</div>
                  <div className="text-xl font-bold text-amber-900">{stats.currentFoxes}</div>
                  <div className={`text-sm ${Number(stats.foxGrowth) >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {Number(stats.foxGrowth) >= 0 ? "↑" : "↓"} {Math.abs(Number(stats.foxGrowth))}%
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Population Range</div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-violet-700">Rabbits:</span>
                    <span>{stats.minRabbits} - {stats.maxRabbits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pink-700">Wolves:</span>
                    <span>{stats.minWolves} - {stats.maxWolves}</span>
                  </div>
                  {enableFoxes && (
                    <div className="flex justify-between">
                      <span className="text-amber-700">Foxes:</span>
                      <span>{stats.minFoxes} - {stats.maxFoxes}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Avg. Growth Rate</div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-violet-700">Rabbits:</span>
                    <span className={Number(stats.avgRabbitGrowth) >= 0 ? "text-green-600" : "text-red-600"}>
                      {Number(stats.avgRabbitGrowth) >= 0 ? "+" : ""}{stats.avgRabbitGrowth}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pink-700">Wolves:</span>
                    <span className={Number(stats.avgWolfGrowth) >= 0 ? "text-green-600" : "text-red-600"}>
                      {Number(stats.avgWolfGrowth) >= 0 ? "+" : ""}{stats.avgWolfGrowth}%
                    </span>
                  </div>
                  {enableFoxes && (
                    <div className="flex justify-between">
                      <span className="text-amber-700">Foxes:</span>
                      <span className={Number(stats.avgFoxGrowth) >= 0 ? "text-green-600" : "text-red-600"}>
                        {Number(stats.avgFoxGrowth) >= 0 ? "+" : ""}{stats.avgFoxGrowth}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {pieData.length > 0 && (
              <div className="mt-4 h-[120px]">
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
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center text-gray-500">
            <Info className="h-12 w-12 mb-2 text-gray-300" />
            <p>Run a simulation to see population statistics</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PopulationStatistics; 