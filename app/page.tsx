"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { RakatCounter } from "@/components/dashboard/rakat-counter"
import { PrayerTracker } from "@/components/dashboard/prayer-tracker"
import { QuranProgress } from "@/components/dashboard/quran-progress"
import { CharityVault } from "@/components/dashboard/charity-vault"
import { QadaaTracker } from "@/components/dashboard/qadaa-tracker"
import { FridayOasis } from "@/components/dashboard/friday-oasis"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"

// Initial data - in a real app, this would come from a database
const initialCharities = [
  { id: "1", category: "صدقة جارية", amount: 5000, icon: "dripping" as const },
  { id: "2", category: "زكاة مال", amount: 12500, icon: "coins" as const },
  { id: "3", category: "تبرع عام", amount: 2300, icon: "gift" as const },
]

const initialQadaa = [
  { id: "fajr", name: "صلاة الفجر", completed: 150, total: 500 },
  { id: "dhuhr", name: "صلاة الظهر", completed: 200, total: 400 },
  { id: "asr", name: "صلاة العصر", completed: 180, total: 350 },
  { id: "maghrib", name: "صلاة المغرب", completed: 250, total: 300 },
  { id: "isha", name: "صلاة العشاء", completed: 220, total: 450 },
]

const initialFridayTasks = [
  { id: "kahf", label: "قراءة سورة الكهف", completed: false },
  { id: "salawat", label: "الإكثار من الصلاة على النبي ﷺ", completed: false },
  { id: "dua", label: "الدعاء في ساعة الإجابة", completed: false },
  { id: "ghusl", label: "الاغتسال والتطيب", completed: false },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])
  
  // Prayer tracking state
  const [completedPrayers, setCompletedPrayers] = useState<Record<string, { fard: boolean; sunnah: boolean }>>({})
  
  // Calculate total rakat (example: 17 rakat per day × 365 days × years + today's prayers)
  const baseRakat = 17 * 365 * 5 // 5 years of prayers
  const todayFardRakat = Object.entries(completedPrayers).reduce((acc, [id, prayer]) => {
    if (prayer.fard) {
      const rakatMap: Record<string, number> = { fajr: 2, dhuhr: 4, asr: 4, maghrib: 3, isha: 4 }
      return acc + (rakatMap[id] || 0)
    }
    return acc
  }, 0)
  const todaySunnahRakat = Object.entries(completedPrayers).reduce((acc, [id, prayer]) => {
    if (prayer.sunnah) {
      const sunnahMap: Record<string, number> = { fajr: 2, dhuhr: 4, asr: 0, maghrib: 2, isha: 2 }
      return acc + (sunnahMap[id] || 0)
    }
    return acc
  }, 0)
  const totalRakat = baseRakat + todayFardRakat + todaySunnahRakat

  // Quran progress state
  const [quranPagesRead, setQuranPagesRead] = useState(245)

  // Qadaa state
  const [qadaaItems, setQadaaItems] = useState(initialQadaa)

  // Friday tasks state
  const [fridayTasks, setFridayTasks] = useState(initialFridayTasks)

  const handlePrayerComplete = (prayerId: string, completed: boolean, isSunnah: boolean) => {
    setCompletedPrayers(prev => ({
      ...prev,
      [prayerId]: {
        ...prev[prayerId],
        [isSunnah ? 'sunnah' : 'fard']: completed
      }
    }))
  }

  const handleAddQuranPages = (pages: number) => {
    setQuranPagesRead(prev => Math.min(prev + pages, 604))
  }

  const handleQadaaUpdate = (id: string, increment: boolean) => {
    setQadaaItems(prev => prev.map(item => {
      if (item.id === id) {
        const newCompleted = increment 
          ? Math.min(item.completed + 1, item.total)
          : Math.max(item.completed - 1, 0)
        return { ...item, completed: newCompleted }
      }
      return item
    }))
  }

  const handleFridayTaskToggle = (id: string, completed: boolean) => {
    setFridayTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed } : task
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="md:mr-64 min-h-screen">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <Header />

            {/* Hero - Total Rakat Counter */}
            <RakatCounter totalRakat={totalRakat} />

            {/* Daily Prayer Tracker */}
            <PrayerTracker 
              completedPrayers={completedPrayers}
              onPrayerComplete={handlePrayerComplete}
            />

            {/* Two Column Layout for Quran & Friday */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Quran Progress */}
              <QuranProgress 
                pagesRead={quranPagesRead}
                totalPages={604}
                onAddPages={handleAddQuranPages}
              />

              {/* Friday Oasis */}
              <FridayOasis 
                tasks={fridayTasks}
                onTaskToggle={handleFridayTaskToggle}
              />
            </div>

            {/* Charity Vault */}
            <CharityVault charities={initialCharities} />

            {/* Qadaa Tracker */}
            <QadaaTracker 
              qadaaItems={qadaaItems}
              onUpdate={handleQadaaUpdate}
            />
          </div>
        )}
      </main>
    </div>
  )
}
