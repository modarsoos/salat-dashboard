"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Clock, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QadaaItem {
  id: string
  name: string
  completed: number
  total: number
}

interface QadaaTrackerProps {
  qadaaItems: QadaaItem[]
  onUpdate: (id: string, increment: boolean) => void
}

export function QadaaTracker({ qadaaItems, onUpdate }: QadaaTrackerProps) {
  const totalRemaining = qadaaItems.reduce((acc, item) => acc + (item.total - item.completed), 0)
  const totalCompleted = qadaaItems.reduce((acc, item) => acc + item.completed, 0)
  const overallProgress = qadaaItems.reduce((acc, item) => acc + item.total, 0) > 0
    ? (totalCompleted / qadaaItems.reduce((acc, item) => acc + item.total, 0)) * 100
    : 0

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            قضاء الصلوات الفائتة
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              المتبقي: <span className="font-bold text-foreground">{totalRemaining.toLocaleString('ar-SA')} يوم</span>
            </span>
            <span className="text-primary font-bold">
              {Math.round(overallProgress)}% مكتمل
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {qadaaItems.map((item) => {
            const progress = item.total > 0 ? (item.completed / item.total) * 100 : 0
            const remaining = item.total - item.completed

            return (
              <div key={item.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.completed.toLocaleString('ar-SA')} / {item.total.toLocaleString('ar-SA')} يوم
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-border hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onUpdate(item.id, false)}
                      disabled={item.completed <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-border hover:bg-primary/10 hover:text-primary"
                      onClick={() => onUpdate(item.id, true)}
                      disabled={item.completed >= item.total}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Progress 
                    value={progress} 
                    className={cn(
                      "h-3",
                      progress >= 100 ? "[&>div]:bg-primary" : "[&>div]:bg-primary/70"
                    )}
                  />
                  {remaining > 0 && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-foreground mix-blend-difference">
                      {remaining.toLocaleString('ar-SA')} متبقي
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Encouragement */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-foreground text-center">
            {"\"من نام عن صلاة أو نسيها فليصلها إذا ذكرها\""}
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">صحيح مسلم</p>
        </div>
      </CardContent>
    </Card>
  )
}
