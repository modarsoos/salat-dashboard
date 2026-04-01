"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus } from "lucide-react"

interface QuranProgressProps {
  pagesRead: number
  totalPages: number
  onAddPages: (pages: number) => void
}

const TOTAL_QURAN_PAGES = 604

export function QuranProgress({ pagesRead, totalPages = TOTAL_QURAN_PAGES, onAddPages }: QuranProgressProps) {
  const [todayPages, setTodayPages] = useState("")
  const [finishDateStr, setFinishDateStr] = useState("")
  
  const percentage = Math.min((pagesRead / totalPages) * 100, 100)
  const remainingPages = totalPages - pagesRead
  
  // Calculate finish date on client side only to avoid hydration mismatch
  useEffect(() => {
    const daysRemaining = Math.ceil(remainingPages / 5)
    const finishDate = new Date()
    finishDate.setDate(finishDate.getDate() + daysRemaining)
    setFinishDateStr(finishDate.toLocaleDateString('ar-SA', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }))
  }, [remainingPages])
  
  const handleAddPages = () => {
    const pages = parseInt(todayPages)
    if (pages > 0) {
      onAddPages(pages)
      setTodayPages("")
    }
  }

  // SVG circle parameters
  const size = 200
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          رحلة الختمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Circular Progress */}
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-muted/30"
              />
              {/* Progress circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="text-primary transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{Math.round(percentage)}%</span>
              <span className="text-sm text-muted-foreground">مكتمل</span>
            </div>
          </div>

          {/* Stats & Input */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">الصفحات المقروءة</p>
                <p className="text-2xl font-bold text-foreground">{pagesRead.toLocaleString('ar-SA')}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">المتبقي</p>
                <p className="text-2xl font-bold text-foreground">{remainingPages.toLocaleString('ar-SA')}</p>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">تاريخ الختم المتوقع</p>
              <p className="text-lg font-semibold text-primary">
                {finishDateStr || "جاري الحساب..."}
              </p>
              <p className="text-xs text-muted-foreground mt-1">بمعدل ٥ صفحات يومياً</p>
            </div>

            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="ورد اليوم (عدد الصفحات)"
                value={todayPages}
                onChange={(e) => setTodayPages(e.target.value)}
                className="bg-background border-input"
                min="1"
                max="604"
              />
              <Button 
                onClick={handleAddPages}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
