"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  BookOpen, 
  Heart, 
  Clock, 
  MessageCircle,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { id: "quran", label: "القرآن الكريم", icon: BookOpen },
  { id: "charity", label: "الصدقات", icon: Heart },
  { id: "qadaa", label: "القضاء", icon: Clock },
  { id: "anbih", label: "أنبه", icon: MessageCircle },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-[60] md:hidden bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-[40] md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        data-theme={resolvedTheme}
        className={cn(
          "fixed top-0 right-0 h-full w-64 z-[50] flex flex-col",
          "bg-sidebar text-sidebar-foreground",
          "transform transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          !isOpen && "translate-x-full md:translate-x-0",
          isOpen && "translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-primary">هل صليت اليوم</h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">Did you Pray Today?</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onTabChange(item.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    activeTab === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <p className="text-xs text-sidebar-foreground/50 text-center">
            اجعل كل يوم خطوة نحو الجنة
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-center gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>الوضع الفاتح</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>الوضع الداكن</span>
                </>
              )
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>
    </>
  )
}
