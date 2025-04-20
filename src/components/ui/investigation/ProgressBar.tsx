'use client'

import React from 'react'

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const roundedProgress = Math.round(progress)
  
  return (
    <div className="w-full bg-gray-800 rounded-full h-2.5 mb-1">
      <div 
        className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${roundedProgress}%` }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0%</span>
        <span>{roundedProgress}%</span>
        <span>100%</span>
      </div>
    </div>
  )
}