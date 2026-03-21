"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Store, 
  Star,
  ShoppingCart,
  Truck,
  Shield,
  Phone,
  ChevronRight,
} from "lucide-react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { useAuth } from "@/lib/auth-context"
import { dummyProducts, dummyBusinesses, dummyZones, dummyCategories, dummyPromotions } from "@/lib/dummy-data"

export default function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = dummyProducts.find(p => p.id === id)
  const business = product ? dummyBusinesses.find(b => b.id === product.businessId) : null
  const zone = business ? dummyZones.find(z => z.id === business.zoneId) : null
  const category = product ? dummyCategories.find(c => c.id === product.categoryId) : null


  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  // Get active promotion for this product
  const promotion = dummyPromotions.find(p => 
    p.businessId === product?.businessId && 
    p.isActive && 
    (!p.productIds || p.productIds.includes(product.id))
  )

  // Related products
  const relatedProducts = dummyProducts
    .filter(p => p.categoryId === product?.categoryId && p.id !== product?.id)
    .slice(0, 4)

 

  const finalPrice = promotion 
    ? promotion.discountType === "percentage"
      ? product.price * (1 - promotion.discountValue / 100)
      : product.price - promotion.discountValue
    : product.price

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    alert(`Agregado al carrito: ${quantity} x ${product.name}`)
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    alert(`Comprando: ${quantity} x ${product.name}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <ChevronRight className="h-4 w-4" />
          {category && (
            <>
              <Link href={`/?categoria=${category.id}`} className="hover:text-primary">
                {category.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-muted overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {promotion && (
                <Badge className="bg-destructive text-destructive-foreground mb-2">
                  {promotion.discountType === "percentage" 
                    ? `-${promotion.discountValue}%` 
                    : `-$${promotion.discountValue}`}
                </Badge>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= (product.rating || 4)
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.reviewCount || 0} reseñas)
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div>
              {promotion ? (
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      ${finalPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-sm text-green-600">{promotion.title}</p>
                </div>
              ) : (
                <span className="text-3xl font-bold text-foreground">
                  ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            {/* Stock */}
            <div>
              {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  En stock ({product.stock} disponibles)
                </Badge>
              ) : (
                <Badge variant="destructive">Agotado</Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Attributes */}
            {product.attributes && product.attributes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Características</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.attributes.map((attribute) => (
                    <div key={attribute.name} className="flex justify-between py-1 text-sm">
                      <span className="text-muted-foreground capitalize">{attribute.name}:</span>
                      <span className="font-medium">{attribute.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  Comprar ahora
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Heart className="mr-2 h-4 w-4" />
                  Guardar
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Entrega disponible</p>
                    <p className="text-sm text-muted-foreground">
                      Consulta disponibilidad en tu zona
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Compra protegida</p>
                    <p className="text-sm text-muted-foreground">
                      Recibe el producto o te devolvemos tu dinero
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Business Card */}
        {business && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Store className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{business.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{zone?.name}, {zone?.estado}</span>
                    </div>
                    {business.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Phone className="h-4 w-4" />
                        <span>{business.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/negocio/${business.id}`}>
                    Ver tienda
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
