'use client';

import { InferenceStep } from '../types/forward-chaining';

interface StepVisualizationProps {
  steps: InferenceStep[];
}

export default function StepVisualization({ steps }: StepVisualizationProps) {
  if (steps.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Belum ada langkah inferensi yang dilakukan
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                {step.stepNumber}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  Langkah {step.stepNumber}
                </h4>
                <p className="text-sm text-gray-500">
                  {new Date(step.timestamp).toLocaleTimeString('id-ID')}
                </p>
              </div>
            </div>
          </div>

          <div className="ml-11 space-y-3">
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Aturan yang Digunakan:
              </p>
              <p className="text-sm text-gray-900">
                {step.firedRule.description}
              </p>
              <div className="mt-2 text-xs text-gray-600">
                <span className="font-medium">Kondisi:</span>{' '}
                {step.firedRule.conditions.join(', ')}
                {' → '}
                <span className="font-medium">Kesimpulan:</span>{' '}
                {step.firedRule.conclusion}
              </div>
            </div>

            <div className="bg-green-50 rounded p-3">
              <p className="text-sm font-medium text-green-800 mb-1">
                Fakta Baru:
              </p>
              <p className="text-sm text-green-900 font-medium">
                {step.newFact.value}
              </p>
              {step.newFact.description && (
                <p className="text-xs text-green-700 mt-1">
                  {step.newFact.description}
                </p>
              )}
            </div>

            <div className="bg-blue-50 rounded p-3">
              <p className="text-sm font-medium text-blue-800 mb-1">
                Working Memory:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {step.currentFacts.map((factId, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {factId}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
