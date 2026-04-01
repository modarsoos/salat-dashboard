"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Prayer {
  id: string
  name: string
  rakat: number
  sunnah: number
  time?: string
}

const prayers: Prayer[] = [
  { id: "fajr", name: "الفجر", rakat: 2, sunnah: 2 },
  { id: "dhuhr", name: "الظهر", rakat: 4, sunnah: 4 },
  { id: "asr", name: "العصر", rakat: 4, sunnah: 0 },
  { id: "maghrib", name: "المغرب", rakat: 3, sunnah: 2 },
  { id: "isha", name: "العشاء", rakat: 4, sunnah: 2 },
]

interface PrayerTrackerProps {
  onPrayerComplete: (prayerId: string, completed: boolean, isSunnah: boolean) => void
  completedPrayers: Record<string, { fard: boolean; sunnah: boolean }>
}

export function PrayerTracker({ onPrayerComplete, completedPrayers }: PrayerTrackerProps) {
  const totalSunnahToday = prayers.reduce((acc, p) => {
    if (completedPrayers[p.id]?.sunnah) {
      return acc + p.sunnah
    }
    return acc
  }, 0)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground">صلوات اليوم</CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            السنن الرواتب: {totalSunnahToday.toLocaleString('ar-SA')} ركعة
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {prayers.map((prayer) => {
            const isCompleted = completedPrayers[prayer.id]?.fard || false
            const sunnahCompleted = completedPrayers[prayer.id]?.sunnah || false

            return (
              <div
                key={prayer.id}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-300",
                  isCompleted 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="text-center">
                  <h4 className="text-lg font-bold text-foreground mb-2">{prayer.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{prayer.rakat} ركعات</p>
                  
                  {/* Fard Checkbox */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Checkbox
                      id={`fard-${prayer.id}`}
                      checked={isCompleted}
                      onCheckedChange={(checked) => 
                        onPrayerComplete(prayer.id, checked as boolean, false)
                      }
                      className="border-primary data-[state=checked]:bg-primary"
                    />
                    <label 
                      htmlFor={`fard-${prayer.id}`}
                      className={cn(
                        "text-sm cursor-pointer transition-colors",
                        isCompleted ? "text-primary font-semibold" : "text-muted-foreground"
                      )}
                    >
                      {isCompleted ? "تم" : "الفرض"}
                    </label>
                  </div>

                  {/* Sunnah Checkbox */}
                  {prayer.sunnah > 0 && (
                    <div className="flex items-center justify-center gap-2">
                      <Checkbox
                        id={`sunnah-${prayer.id}`}
                        checked={sunnahCompleted}
                        onCheckedChange={(checked) => 
                          onPrayerComplete(prayer.id, checked as boolean, true)
                        }
                        className="border-accent data-[state=checked]:bg-accent"
                      />
                      <label 
                        htmlFor={`sunnah-${prayer.id}`}
                        className={cn(
                          "text-xs cursor-pointer transition-colors",
                          sunnahCompleted ? "text-accent font-semibold" : "text-muted-foreground"
                        )}
                      >
                        السنة ({prayer.sunnah})
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
