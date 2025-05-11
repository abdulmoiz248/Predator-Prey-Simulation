import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface AlgorithmInfoSection {
  title: string;
  description: string;
  equations?: string[];
  parameters?: string[];
  benefits?: string[];
}

interface AlgorithmInfoProps {
  algorithmInfo: AlgorithmInfoSection[];
  includeFoxes: boolean;
  coresUsed: number | null;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithmInfo, includeFoxes, coresUsed }) => {
  return (
    <Card className="border-none shadow-lg bg-white mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-violet-500" />
          Lotka-Volterra Model
        </CardTitle>
        <div className="text-muted-foreground text-sm">Understanding the mathematical model behind the simulation</div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">The Equations</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="mb-3">The Lotka-Volterra model consists of a pair of differential equations:</p>
              <div className="space-y-2 font-mono text-center">
                <p className="bg-white p-2 rounded border border-gray-200">dR/dt = αR - βRW</p>
                <p className="bg-white p-2 rounded border border-gray-200">dW/dt = δRW - γW</p>
                {includeFoxes && (
                  <p className="bg-white p-2 rounded border border-gray-200">dF/dt = ηRF - ζF</p>
                )}
              </div>
              <div className="mt-4 text-sm">
                <p className="mb-1">Where:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>R = Rabbit population</li>
                  <li>W = Wolf population</li>
                  {includeFoxes && <li>F = Fox population</li>}
                  <li>α (alpha) = Rabbit growth rate</li>
                  <li>β (beta) = Wolf predation rate</li>
                  <li>γ (gamma) = Wolf death rate</li>
                  <li>δ (delta) = Wolf reproduction rate</li>
                  {includeFoxes && (
                    <>
                      <li>ε (epsilon) = Fox predation rate</li>
                      <li>ζ (zeta) = Fox death rate</li>
                      <li>η (eta) = Fox reproduction rate</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Parallel Implementation</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="mb-3">
                This simulation uses parallel processing to calculate population changes across multiple grid cells
                simultaneously:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  <span className="font-medium">Spatial Grid:</span> The ecosystem is divided into a grid of cells,
                  each with its own population dynamics
                </li>
                <li>
                  <span className="font-medium">Multi-core Processing:</span> Calculations for each grid cell are
                  distributed across available CPU cores
                </li>
                <li>
                  <span className="font-medium">Performance Gains:</span> Parallel processing provides significant
                  speedup for large simulations
                </li>
                <li>
                  <span className="font-medium">Realistic Modeling:</span> The grid approach allows for spatial
                  heterogeneity in population distributions
                </li>
              </ul>
              {coresUsed && (
                <div className="mt-3 p-2 bg-violet-50 rounded border border-violet-200 text-sm">
                  <p className="font-medium text-violet-700">
                    Your simulation is using {coresUsed} CPU cores for parallel processing
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmInfo; 