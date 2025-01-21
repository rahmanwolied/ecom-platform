import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ProductCard } from "./ProductCard";
import { SellerCard } from "./SellerCard";

export function HomePage() {
  return (
    <div className="w-full max-w-7xl">
      {/* Search Bar */}
      <div className="mb-8">
        <Input
          type="search"
          placeholder="Search products..."
          className="max-w-xl"
        />
      </div>

      {/* Categories */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex gap-4">
          <Button variant="outline">Electronics</Button>
          <Button variant="outline">Clothing</Button>
          <Button variant="outline">Books</Button>
          <Button variant="outline">Home & Garden</Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Sample Products */}
          <ProductCard
            product={{
              id: "1",
              name: "Sample Product",
              price: 99.99,
              image:
                "https://petapixel.com/assets/uploads/2017/03/product1.jpeg",
              rating: 4.5,
              description: "Sample description",
              seller: {
                name: "Sample Seller",
                rating: 4.8,
                contact: "contact@example.com",
              },
              reviews: [],
            }}
          />
          {/* Add more ProductCards here */}
        </div>
      </section>

      {/* Top Sellers */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SellerCard
            seller={{
              id: "1",
              type: "seller",
              name: "John Doe",
              phone: "123-456-7890",
              nidDoc: "",
              rating: 4.8,
              trustScore: 95,
              transactions: [],
            }}
          />
          {/* Add more SellerCards here */}
        </div>
      </section>
    </div>
  );
}
