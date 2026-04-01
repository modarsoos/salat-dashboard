"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"

function getHijriDate(): string {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    calendar: 'islamic-umalqura',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  return today.toLocaleDateString('ar-SA-u-ca-islamic-umalqura', options)
}

function getGregorianDate(): string {
  const today = new Date()
  return today.toLocaleDateString('ar-SA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function Header() {
  const [hijriDate, setHijriDate] = useState("")
  const [gregorianDate, setGregorianDate] = useState("")
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    setHijriDate(getHijriDate())
    setGregorianDate(getGregorianDate())
    
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting("صباح الخير")
    } else if (hour < 17) {
      setGreeting("مساء النور")
    } else {
      setGreeting("مساء الخير")
    }
  }, [])

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{greeting}، أخي المسلم</h2>
          <p className="text-muted-foreground mt-1">نسأل الله أن يتقبل منا ومنكم صالح الأعمال</p>
        </div>
        <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-lg">
          <Calendar className="h-5 w-5 text-primary" />
          <div className="text-left">
            <p className="font-semibold text-foreground">{hijriDate}</p>
            <p className="text-sm text-muted-foreground">{gregorianDate}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
