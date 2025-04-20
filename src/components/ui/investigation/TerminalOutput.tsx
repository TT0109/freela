'use client'

import React, { useEffect, useRef } from 'react'

interface TerminalOutputProps {
  lines: string[]
}

export default function TerminalOutput({ lines }: TerminalOutputProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])
  
  return (
    <div 
      ref={terminalRef}
      className="bg-black p-4 rounded-lg h-full overflow-y-auto font-mono text-sm text-green-500"
    >
      {lines.map((line, index) => (
        <div key={index} className="mb-2">
          <span className="text-gray-500 mr-2">&gt;</span>
          <span className={index === lines.length - 1 ? 'typing-animation' : ''}>
            {line}
          </span>
          {index === lines.length - 1 && (
            <span className="animate-pulse ml-1">_</span>
          )}
        </div>
      ))}
      
      <style jsx>{`
        .typing-animation {
          overflow: hidden;
          border-right: 0.15em solid transparent;
          white-space: nowrap;
          animation: typing 3s steps(40, end);
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}