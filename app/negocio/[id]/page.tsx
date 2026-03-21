"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Store, 
  Star,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Grid3X3,
  List,
  Tag,
} from "lucide-react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { dummyProducts, dummyBusinesses, dummyZones, dummyCategories, dummyPromotions } from "@/lib/dummy-data"

export default function NegocioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

 
  const business = dummyBusinesses.find(b => b.slug === id)
  const zone = business ? dummyZones.find(z => z.id === business.zoneId) : null
  const category = business ? dummyCategories.find(c => business.categoryIds.includes(c.id)) : null
  const products = dummyProducts.filter(p => p.businessId === business?.id)
  const promotions = dummyPromotions.filter(p => p.businessId === business?.id && p.isActive)

  if (!business) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Negocio no encontrado</h1>
          <Button onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  const getDayName = (day: string) => {
    const days: Record<string, string> = {
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
    }
    return days[day] || day
  }

  const isOpenNow = () => {
    const now = new Date()
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const today = dayNames[now.getDay()]
    const hours = business.businessHours?.[today as keyof typeof business.businessHours]
    
    if (!hours || hours.closed) return false
    
    const currentTime = now.getHours() * 100 + now.getMinutes()
    const openTime = parseInt(hours.open.replace(":", ""))
    const closeTime = parseInt(hours.close.replace(":", ""))
    
    return currentTime >= openTime && currentTime <= closeTime
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Banner */}
        <div className="bg-secondary h-48 md:h-64 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          {/* Business Info Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-background border-4 border-background shadow-lg flex items-center justify-center -mt-16 md:-mt-20">
                  {business.logo ? (
                    <img 
                      src={business.logo} 
                      alt={business.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Store className="h-12 w-12 text-primary" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        {business.name}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {category && (
                          <Badge variant="secondary">{category.name}</Badge>
                        )}
                        {isOpenNow() ? (
                          <Badge className="bg-green-500/10 text-green-600">
                            Abierto ahora
                          </Badge>
                        ) : (
                          <Badge variant="outline">Cerrado</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{business.rating || 4.5}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-3 max-w-2xl">
                    {business.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{business.address}</span>
                    </div>
                    {zone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-primary">{zone.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Promotions */}
          {promotions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                Promociones activas
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {promotions.map((promo) => (
                  <Card key={promo.id} className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-primary">{promo.title}</p>
                          <p className="text-sm text-muted-foreground">{promo.description}</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-lg px-3">
                          {promo.discountType === "percentage" 
                            ? `-${promo.discountValue}%` 
                            : `-$${promo.discountValue}`}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="productos" className="mb-8">
            <TabsList>
              <TabsTrigger value="productos">
                Productos ({products.length})
              </TabsTrigger>
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="horarios">Horarios</TabsTrigger>
            </TabsList>

            <TabsContent value="productos" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground">
                  {products.length} productos disponibles
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Este negocio aún no tiene productos publicados.
                  </p>
                </div>
              ) : (
                <div className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    : "space-y-4"
                }>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="info" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Contacto</h3>
                    <div className="space-y-2">
                      {business.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${business.phone}`} className="hover:text-primary">
                            {business.phone}
                          </a>
                        </div>
                      )}
                      {business.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-primary" />
                          <a href={`mailto:${business.email}`} className="hover:text-primary">
                            {business.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Ubicación</h3>
                    <p className="text-muted-foreground">{business.address}</p>
                    {zone && (
                      <p className="text-sm text-primary mt-1">
                        {zone.name}, {zone.estado}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Categoría</h3>
                    <Badge variant="secondary">{category?.name || "Sin categoría"}</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="horarios" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Horarios de atención</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {business.businessHours && Object.entries(business.businessHours).map(([day, hours]) => (
                      <div 
                        key={day}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <span className="font-medium">{getDayName(day)}</span>
                        {hours.closed ? (
                          <Badge variant="secondary">Cerrado</Badge>
                        ) : (
                          <span className="text-muted-foreground">
                            {hours.open} - {hours.close}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
