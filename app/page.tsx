'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { ProductCard } from '@/components/product-card'
import { FiltersSidebar } from '@/components/filters-sidebar'
import { productApi, promotionApi, businessApi } from '@/lib/api-service'
import type { Product, Promotion, Business, ProductFilters } from '@/lib/types'
import { ChevronRight, Sparkles, TrendingUp, Store, Filter, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [filters, setFilters] = useState<ProductFilters>({})
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const [productsData, featuredData, promotionsData, businessesData] = await Promise.all([
        productApi.getAll(filters),
        productApi.getFeatured(),
        promotionApi.getAll(),
        businessApi.getAll()
      ])
      setProducts(productsData)
      setFeaturedProducts(featuredData)
      setPromotions(promotionsData)
      setBusinesses(businessesData)
      setIsLoading(false)
    }
    loadData()
  }, [filters])

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }))
  }

  const handleZoneChange = (zoneId: string) => {
    setFilters(prev => ({ ...prev, zoneId: zoneId || undefined }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={handleSearch} 
        onZoneChange={handleZoneChange}
        selectedZone={filters.zoneId}
      />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-secondary via-secondary to-secondary/90">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main banner */}
              <div className="col-span-2 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground lg:p-8">
                <div className="max-w-md">
                  <span className="mb-2 inline-block rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-medium">
                    Nuevo en ZonaLocal
                  </span>
                  <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
                    Descubre los mejores negocios de tu zona
                  </h1>
                  <p className="mb-6 text-primary-foreground/80">
                    Productos locales de Coacalco, Tultitlán, Tultepec y zonas aledañas. Apoya a tu comunidad.
                  </p>
                  <Link href="/negocios">
                    <Button variant="secondary" className="gap-2">
                      Explorar negocios
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Promotions */}
              <div className="space-y-4">
                {promotions.slice(0, 2).map(promo => (
                  <div
                    key={promo.id}
                    className="overflow-hidden rounded-xl border bg-card p-4"
                  >
                    <span className="mb-1 inline-block rounded bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                      {promo.discountType === 'percentage' 
                        ? `${promo.discountValue}% OFF`
                        : `-${formatPrice(promo.discountValue)}`
                      }
                    </span>
                    <h3 className="font-semibold">{promo.title}</h3>
                    <p className="text-sm text-muted-foreground">{promo.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="border-b py-8 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold lg:text-2xl">Productos Destacados</h2>
                </div>
                <Link href="/destacados" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Ver todos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {featuredProducts.slice(0, 5).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Businesses Section */}
        <section className="border-b py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold lg:text-2xl">Negocios Populares</h2>
              </div>
              <Link href="/negocios" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Ver todos
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {businesses.slice(0, 6).map(business => (
                <Link
                  key={business.id}
                  href={`/negocio/${business.slug}`}
                  className="group overflow-hidden rounded-lg border bg-card p-4 text-center transition-shadow hover:shadow-md"
                >
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Store className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-1 truncate font-medium group-hover:text-primary">
                    {business.name}
                  </h3>
                  <p className="mb-2 text-xs text-muted-foreground">{business.zoneName}</p>
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <span className="font-medium text-primary">{business.rating}</span>
                    <span className="text-muted-foreground">({business.reviewCount})</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content with Filters */}
        <section className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold lg:text-2xl">Todos los Productos</h2>
              </div>
              
              {/* Mobile filter button */}
              <Button
                variant="outline"
                size="sm"
                className="gap-2 lg:hidden"
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>

            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <FiltersSidebar
                filters={filters}
                onFiltersChange={setFilters}
                className="hidden w-64 shrink-0 lg:block"
              />

              {/* Mobile Filters Modal */}
              {showMobileFilters && (
                <div className="fixed inset-0 z-50 bg-background lg:hidden">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b p-4">
                      <h2 className="text-lg font-semibold">Filtros</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowMobileFilters(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                      <FiltersSidebar
                        filters={filters}
                        onFiltersChange={(newFilters) => {
                          setFilters(newFilters)
                          setShowMobileFilters(false)
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              <div className="flex-1">
                {isLoading ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="animate-pulse rounded-lg border bg-card p-4">
                        <div className="aspect-square rounded-lg bg-muted" />
                        <div className="mt-4 h-4 rounded bg-muted" />
                        <div className="mt-2 h-4 w-2/3 rounded bg-muted" />
                        <div className="mt-4 h-8 rounded bg-muted" />
                      </div>
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Store className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">No se encontraron productos</h3>
                    <p className="text-muted-foreground">
                      Intenta ajustar los filtros o busca algo diferente
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setFilters({})}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Store className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">
                  Zona<span className="text-primary">Local</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Conectando negocios locales con clientes de la zona norte del Estado de México.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Zonas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/?zone=coacalco" className="hover:text-primary">Coacalco</Link></li>
                <li><Link href="/?zone=tultitlan" className="hover:text-primary">Tultitlán</Link></li>
                <li><Link href="/?zone=tultepec" className="hover:text-primary">Tultepec</Link></li>
                <li><Link href="/?zone=cuautitlan" className="hover:text-primary">Cuautitlán</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Categorías</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/categorias/muebles" className="hover:text-primary">Muebles</Link></li>
                <li><Link href="/categorias/automotriz" className="hover:text-primary">Automotriz</Link></li>
                <li><Link href="/categorias/comida" className="hover:text-primary">Comida</Link></li>
                <li><Link href="/categorias/talleres" className="hover:text-primary">Talleres</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Para Negocios</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/registro" className="hover:text-primary">Registrar mi negocio</Link></li>
                <li><Link href="/planes" className="hover:text-primary">Planes y precios</Link></li>
                <li><Link href="/ayuda" className="hover:text-primary">Centro de ayuda</Link></li>
                <li><Link href="/contacto" className="hover:text-primary">Contacto</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>2024 ZonaLocal. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
