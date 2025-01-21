import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2">{product.name}</CardTitle>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
          <span>{product.rating}</span>
        </div>
        <div className="text-lg font-bold mb-4">${product.price}</div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">View</Button>
          <Button className="w-full">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  )
} 