"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Star, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FridayTask {
  id: string
  label: string
  completed: boolean
}

interface FridayOasisProps {
  tasks: FridayTask[]
  onTaskToggle: (id: string, completed: boolean) => void
}

export function FridayOasis({ tasks, onTaskToggle }: FridayOasisProps) {
  const [isFriday, setIsFriday] = useState(false)

  useEffect(() => {
    const today = new Date()
    setIsFriday(today.getDay() === 5)
  }, [])

  const completedCount = tasks.filter(t => t.completed).length
  const allCompleted = completedCount === tasks.length

  if (!isFriday) {
    return (
      <Card className="bg-muted/30 border-border border-dashed">
        <CardContent className="py-8">
          <div className="text-center">
            <Star className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">واحة الجمعة</h3>
            <p className="text-sm text-muted-foreground/70 mt-2">
              يظهر هذا القسم يوم الجمعة المبارك
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn(
      "border-2 transition-all duration-500",
      allCompleted 
        ? "bg-primary/5 border-primary shadow-lg shadow-primary/10" 
        : "bg-card border-primary/30"
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            واحة الجمعة
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={cn(
              "transition-colors",
              allCompleted 
                ? "bg-primary text-primary-foreground" 
                : "bg-primary/10 text-primary"
            )}
          >
            {completedCount} / {tasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300",
                task.completed 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              )}
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={(checked) => onTaskToggle(task.id, checked as boolean)}
                className="h-6 w-6 border-primary data-[state=checked]:bg-primary"
              />
              <label
                htmlFor={task.id}
                className={cn(
                  "flex-1 cursor-pointer text-lg transition-all",
                  task.completed 
                    ? "text-primary font-semibold" 
                    : "text-foreground"
                )}
              >
                {task.label}
              </label>
              {task.completed && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </div>
          ))}
        </div>

        {allCompleted && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center animate-pulse">
            <p className="text-primary font-semibold flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              بارك الله فيك! أتممت سنن الجمعة
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            {"\"خير يوم طلعت عليه الشمس يوم الجمعة\""}
          </p>
          <p className="text-xs text-muted-foreground/70 text-center mt-1">صحيح مسلم</p>
        </div>
      </CardContent>
    </Card>
  )
}
