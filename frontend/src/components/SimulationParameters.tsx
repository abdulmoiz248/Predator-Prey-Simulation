import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Rabbit, Dog, Dna } from "lucide-react";

interface SimulationParametersProps {
  startYear: number;
  endYear: number;
  initialRabbits: number;
  initialWolves: number;
  initialFoxes: number;
  alpha: number;
  beta: number;
  gamma: number;
  delta: number;
  foxPredationRate: number;
  foxDeathRate: number;
  foxReproductionRate: number;
  enableFoxes: boolean;
  simulationRunning: boolean;
  onChange: (changes: Partial<SimulationParametersProps>) => void;
  onStart: () => void;
  connected: boolean;
}

const SimulationParameters: React.FC<SimulationParametersProps> = ({
  startYear,
  endYear,
  initialRabbits,
  initialWolves,
  initialFoxes,
  alpha,
  beta,
  gamma,
  delta,
  foxPredationRate,
  foxDeathRate,
  foxReproductionRate,
  enableFoxes,
  simulationRunning,
  onChange,
  onStart,
  connected,
}) => {
  return (
    <Card className="border shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Info className="w-5 h-5 mr-2 text-violet-500" />
          Simulation Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startYear" className="text-sm font-medium">
              Start Year
            </Label>
            <Input
              id="startYear"
              type="number"
              value={startYear}
              onChange={e => onChange({ startYear: Number.parseInt(e.target.value) })}
              disabled={simulationRunning}
              className="border-violet-200 focus:border-violet-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endYear" className="text-sm font-medium">
              End Year
            </Label>
            <Input
              id="endYear"
              type="number"
              value={endYear}
              onChange={e => onChange({ endYear: Number.parseInt(e.target.value) })}
              disabled={simulationRunning}
              className="border-violet-200 focus:border-violet-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="initialRabbits" className="text-sm font-medium flex items-center">
                <Rabbit className="w-4 h-4 mr-1 text-violet-500" />
                Initial Rabbits
              </Label>
              <span className="text-sm text-violet-600 font-medium">{initialRabbits}</span>
            </div>
            <Slider
              id="initialRabbits"
              min={10}
              max={500}
              step={10}
              value={[initialRabbits]}
              onValueChange={(value: number[]) => onChange({ initialRabbits: value[0] })}
              disabled={simulationRunning}
              className="py-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="initialWolves" className="text-sm font-medium flex items-center">
                <Dog className="w-4 h-4 mr-1 text-pink-500" />
                Initial Wolves
              </Label>
              <span className="text-sm text-pink-600 font-medium">{initialWolves}</span>
            </div>
            <Slider
              id="initialWolves"
              min={5}
              max={200}
              step={5}
              value={[initialWolves]}
              onValueChange={(value: number[]) => onChange({ initialWolves: value[0] })}
              disabled={simulationRunning}
              className="py-2"
            />
          </div>
        </div>
        {/* Fox parameters */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-semibold flex items-center">
              <Dog className="w-4 h-4 mr-1 text-amber-500" />
              Fox Parameters
            </h3>
            <div className="flex items-center">
              <Label htmlFor="enableFoxes" className="mr-2 text-sm">
                Enable Foxes
              </Label>
              <input
                id="enableFoxes"
                type="checkbox"
                checked={enableFoxes}
                onChange={e => onChange({ enableFoxes: e.target.checked })}
                disabled={simulationRunning}
                className="rounded text-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>
          {enableFoxes && (
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="initialFoxes" className="text-sm font-medium">
                    Initial Foxes
                  </Label>
                  <span className="text-sm text-amber-600 font-medium">{initialFoxes}</span>
                </div>
                <Slider
                  id="initialFoxes"
                  min={0}
                  max={100}
                  step={5}
                  value={[initialFoxes]}
                  onValueChange={(value: number[]) => onChange({ initialFoxes: value[0] })}
                  disabled={simulationRunning}
                  className="py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="foxPredationRate" className="text-sm font-medium">
                      Fox Predation Rate
                    </Label>
                    <span className="text-sm text-amber-600 font-medium">{foxPredationRate.toFixed(4)}</span>
                  </div>
                  <Slider
                    id="foxPredationRate"
                    min={0.0001}
                    max={0.05}
                    step={0.0001}
                    value={[foxPredationRate]}
                    onValueChange={(value: number[]) => onChange({ foxPredationRate: value[0] })}
                    disabled={simulationRunning}
                    className="py-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="foxDeathRate" className="text-sm font-medium">
                      Fox Death Rate
                    </Label>
                    <span className="text-sm text-amber-600 font-medium">{foxDeathRate.toFixed(3)}</span>
                  </div>
                  <Slider
                    id="foxDeathRate"
                    min={0.01}
                    max={0.5}
                    step={0.01}
                    value={[foxDeathRate]}
                    onValueChange={(value: number[]) => onChange({ foxDeathRate: value[0] })}
                    disabled={simulationRunning}
                    className="py-2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="foxReproductionRate" className="text-sm font-medium">
                    Fox Reproduction Rate
                  </Label>
                  <span className="text-sm text-amber-600 font-medium">{foxReproductionRate.toFixed(4)}</span>
                </div>
                <Slider
                  id="foxReproductionRate"
                  min={0.0001}
                  max={0.01}
                  step={0.0001}
                  value={[foxReproductionRate]}
                  onValueChange={(value: number[]) => onChange({ foxReproductionRate: value[0] })}
                  disabled={simulationRunning}
                  className="py-2"
                />
              </div>
            </div>
          )}
        </div>
        <div className="pt-2 border-t border-gray-100">
          <h3 className="text-md font-semibold mb-3 flex items-center">
            <Dna className="w-4 h-4 mr-1 text-violet-500" />
            Model Parameters
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="alpha" className="text-sm font-medium">
                  Alpha (Rabbit Growth)
                </Label>
                <span className="text-sm text-violet-600 font-medium">{alpha.toFixed(3)}</span>
              </div>
              <Slider
                id="alpha"
                min={0.01}
                max={0.5}
                step={0.01}
                value={[alpha]}
                onValueChange={(value: number[]) => onChange({ alpha: value[0] })}
                disabled={simulationRunning}
                className="py-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="beta" className="text-sm font-medium">
                  Beta (Predation)
                </Label>
                <span className="text-sm text-pink-600 font-medium">{beta.toFixed(3)}</span>
              </div>
              <Slider
                id="beta"
                min={0.001}
                max={0.1}
                step={0.001}
                value={[beta]}
                onValueChange={(value: number[]) => onChange({ beta: value[0] })}
                disabled={simulationRunning}
                className="py-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="gamma" className="text-sm font-medium">
                  Gamma (Wolf Death)
                </Label>
                <span className="text-sm text-violet-600 font-medium">{gamma.toFixed(3)}</span>
              </div>
              <Slider
                id="gamma"
                min={0.01}
                max={0.5}
                step={0.01}
                value={[gamma]}
                onValueChange={(value: number[]) => onChange({ gamma: value[0] })}
                disabled={simulationRunning}
                className="py-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="delta" className="text-sm font-medium">
                  Delta (Wolf Reproduction)
                </Label>
                <span className="text-sm text-pink-600 font-medium">{delta.toFixed(4)}</span>
              </div>
              <Slider
                id="delta"
                min={0.0001}
                max={0.01}
                step={0.0001}
                value={[delta]}
                onValueChange={(value: number[]) => onChange({ delta: value[0] })}
                disabled={simulationRunning}
                className="py-2"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onStart}
          disabled={simulationRunning || !connected}
          className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white"
        >
          {simulationRunning ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin">...</span>
              Running Simulation...
            </>
          ) : (
            <>
              <span className="mr-2 h-4 w-4">▶</span>
              Start Simulation
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimulationParameters; 