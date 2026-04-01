"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, TrendingUp, Droplet, Coins, Gift } from "lucide-react"

interface CharityItem {
  id: string
  category: string
  amount: number
  icon: "dripping" | "coins" | "gift"
}

const iconMap = {
  dripping: Droplet,
  coins: Coins,
  gift: Gift,
}

interface CharityVaultProps {
  charities: CharityItem[]
  currency?: string
}

const categoryColors: Record<string, string> = {
  "صدقة جارية": "bg-primary/10 text-primary border-primary/20",
  "زكاة مال": "bg-accent/10 text-accent border-accent/20",
  "تبرع عام": "bg-chart-3/10 text-chart-3 border-chart-3/20",
}

export function CharityVault({ charities, currency = "ر.س" }: CharityVaultProps) {
  const totalCharity = charities.reduce((acc, item) => acc + item.amount, 0)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            صندوق الصدقات
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary text-lg px-4 py-1">
            {totalCharity.toLocaleString('ar-SA')} {currency}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {charities.map((item) => {
            const IconComponent = iconMap[item.icon]
            return (
              <div 
                key={item.id}
                className={`p-5 rounded-xl border-2 ${categoryColors[item.category] || "bg-muted/50 border-border"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className="h-6 w-6 text-primary" />
                  <TrendingUp className="h-4 w-4 opacity-60" />
                </div>
                <h4 className="font-semibold mb-1">{item.category}</h4>
                <p className="text-2xl font-bold">
                  {item.amount.toLocaleString('ar-SA')} {currency}
                </p>
              </div>
            )
          })}
        </div>

        {/* Impact Message */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg text-center">
          <p className="text-muted-foreground">
            {"\"من تصدق بعدل تمرة من كسب طيب، ولا يقبل الله إلا الطيب، فإن الله يأخذها بيمينه\""}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">صحيح البخاري</p>
        </div>
      </CardContent>
    </Card>
  )
}
