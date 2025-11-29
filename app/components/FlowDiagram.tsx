'use client';

import { InferenceStep } from '../types/forward-chaining';

interface FlowDiagramProps {
  steps: InferenceStep[];
  currentStep?: number;
}

export default function FlowDiagram({ steps, currentStep = -1 }: FlowDiagramProps) {
  if (steps.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex flex-col items-center space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="w-full">
            {/* Step Container */}
            <div
              className={`relative transition-all duration-500 ${
                currentStep === -1 || index <= currentStep
                  ? 'opacity-100 scale-100'
                  : 'opacity-50 scale-95'
              }`}
            >
              {/* Conditions */}
              <div className="flex justify-center items-center gap-3 mb-4">
                {step.firedRule.conditions.map((condition, condIdx) => (
                  <div
                    key={condIdx}
                    className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2 text-sm font-medium text-blue-900 animate-pulse"
                  >
                    {condition}
                  </div>
                ))}
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-8 bg-gray-400"></div>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Rule Box */}
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 border-2 border-purple-400 rounded-lg px-6 py-3 max-w-md">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-xs font-semibold text-purple-700">RULE</span>
                  </div>
                  <p className="text-sm text-purple-900 font-medium">
                    {step.firedRule.description}
                  </p>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-8 bg-gray-400"></div>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* New Fact */}
              <div className="flex justify-center">
                <div className="bg-green-100 border-2 border-green-400 rounded-lg px-6 py-3 relative">
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold animate-bounce">
                    NEW
                  </div>
                  <p className="text-sm font-bold text-green-900">{step.newFact.value}</p>
                  <p className="text-xs text-green-700 mt-1">ID: {step.newFact.id}</p>
                </div>
              </div>
            </div>

            {/* Connector to next step */}
            {index < steps.length - 1 && (
              <div className="flex justify-center my-6">
                <div className="w-1 h-12 bg-gradient-to-b from-gray-400 to-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
