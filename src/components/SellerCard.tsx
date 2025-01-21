import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { User } from "@/types"

interface SellerCardProps {
  seller: User
}

export function SellerCard({ seller }: SellerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{seller.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
          <span>{seller.rating}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Trust Score: {seller.trustScore}%
        </div>
      </CardContent>
    </Card>
  )
} 