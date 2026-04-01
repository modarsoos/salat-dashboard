"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface RakatCounterProps {
  totalRakat: number
}

export function RakatCounter({ totalRakat }: RakatCounterProps) {
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // Animation duration in ms
    const steps = 60
    const increment = totalRakat / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), totalRakat)
      setDisplayCount(current)

      if (step >= steps) {
        clearInterval(timer)
        setDisplayCount(totalRakat)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [totalRakat])

  return (
    <Card className="p-8 bg-card border-border relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="relative z-10 text-center">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">إجمالي الركعات في حياتك</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-6xl sm:text-7xl font-bold text-primary tabular-nums">
            {displayCount.toLocaleString('ar-SA')}
          </span>
          <span className="text-2xl text-muted-foreground">ركعة</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          ما يقرب من {Math.floor(totalRakat / 17).toLocaleString('ar-SA')} يوم من الصلوات المكتملة
        </p>
      </div>
    </Card>
  )
}
