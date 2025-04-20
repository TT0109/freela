'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface Step {
  name: string
  icon: IconType
  time: number
}

interface InvestigationStepsProps {
  steps: Step[]
  currentStep: number
  stepStatus: ('pending' | 'processing' | 'complete' | 'failed')[]
}

export default function InvestigationSteps({ steps, currentStep, stepStatus }: InvestigationStepsProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-400 mb-4">PROCESSO DE INVESTIGAÇÃO</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          const status = stepStatus[index]
          
          return (
            <div 
              key={index}
              className={`flex items-center p-3 rounded-md transition-all duration-300 ${
                currentStep === index 
                  ? 'bg-gray-800 border-l-4 border-green-500' 
                  : 'border-l-4 border-transparent'
              }`}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center mr-3
                ${status === 'pending' ? 'bg-gray-800' : ''}
                ${status === 'processing' ? 'bg-yellow-500 animate-pulse' : ''}
                ${status === 'complete' ? 'bg-green-500' : ''}
                ${status === 'failed' ? 'bg-red-500' : ''}
              `}>
                <Icon className="text-white" />
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${currentStep === index ? 'text-white' : 'text-gray-400'}`}>
                  {step.name}
                </p>
                
                <div className="flex items-center mt-1">
                  <StatusIndicator status={status} />
                  <span className="text-xs text-gray-500 ml-2">
                    {status === 'pending' && 'Aguardando...'}
                    {status === 'processing' && 'Processando...'}
                    {status === 'complete' && 'Concluído'}
                    {status === 'failed' && 'Falhou'}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                {step.time}s
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatusIndicator({ status }: { status: string }) {
  return (
    <div className={`
      w-2 h-2 rounded-full
      ${status === 'pending' ? 'bg-gray-500' : ''}
      ${status === 'processing' ? 'bg-yellow-500 animate-pulse' : ''}
      ${status === 'complete' ? 'bg-green-500' : ''}
      ${status === 'failed' ? 'bg-red-500' : ''}
    `}></div>
  )
}