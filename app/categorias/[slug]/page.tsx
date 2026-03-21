'use client'

import { use, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MapPin, 
  Star,
  Phone,
  Store,
  ChevronRight,
  Home
} from 'lucide-react'
import { Header } from '@/components/header'
import { ProductCard } from '@/components/product-card'
import { dummyProducts, dummyBusinesses, dummyZones, dummyCategories } from '@/lib/dummy-data'
import type { Category, Business, Product } from '@/lib/types'

export default function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedZone, setSelectedZone] = useState(searchParams.get('zona') || 'all')
  const [sortBy, setSortBy] = useState(searchParams.get('ordenar') || 'relevantes')
  const [isLoading, setIsLoading] = useState(true)

  // Find current category and its subcategories
  const [category, setCategory] = useState<Category | null>(null)
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])

  useEffect(() => {
    // Find category by slug
    const currentCategory = dummyCategories.find(c => c.slug === slug)
    setCategory(currentCategory || null)

    if (currentCategory) {
      // Find subcategories
      const subs = dummyCategories.filter(c => c.parentId === currentCategory.id)
      setSubcategories(subs)

      // Get all category IDs (current + subcategories)
      const categoryIds = [currentCategory.id, ...subs.map(s => s.id)]
      
      // Filter products
      const filteredProducts = dummyProducts.filter(p => 
        categoryIds.includes(p.categoryId) && p.isActive
      )
      
      // Apply filters
      let finalProducts = filteredProducts

      // Search filter
      if (searchTerm) {
        finalProducts = finalProducts.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      // Zone filter
      if (selectedZone && selectedZone !== 'all') {
        finalProducts = finalProducts.filter(p => p.zoneId === selectedZone)
      }

      // Sort
      switch (sortBy) {
        case 'precio-menor':
          finalProducts.sort((a, b) => a.price - b.price)
          break
        case 'precio-mayor':
          finalProducts.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          finalProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case 'recientes':
          finalProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        default: // relevantes
          // Keep original order (featured first)
          break
      }

      setProducts(finalProducts)

      // Get unique businesses from products
      const uniqueBusinessIds = [...new Set(finalProducts.map(p => p.businessId))]
      const uniqueBusinesses = dummyBusinesses.filter(b => 
        uniqueBusinessIds.includes(b.id) && b.isActive
      )
      setBusinesses(uniqueBusinesses)
    }

    setIsLoading(false)
  }, [slug, searchTerm, selectedZone, sortBy])

  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }

  const getCategoryIcon = (iconName: string) => {
    // Simple mapping for common icons
    const iconMap: Record<string, string> = {
      'sofa': '🛋️',
      'car': '🚗',
      'utensils': '🍽️',
      'door': '🚪',
      'wrench': '🔧',
      'smartphone': '📱',
      'home': '🏠',
      'shirt': '👕'
    }
    return iconMap[iconName] || '📦'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-6 w-48"></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
          <p className="text-muted-foreground mb-6">La categoría que buscas no existe o ha sido eliminada.</p>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <ChevronRight className="h-4 w-4" />
          
          {/* Build breadcrumb hierarchy */}
          {(() => {
            const breadcrumbItems = []
            
            // If this is a subcategory, find parent hierarchy
            if (category.parentId) {
              // Find parent category
              const parent = dummyCategories.find(c => c.id === category.parentId)
              if (parent) {
                // If parent also has a parent (subcategory of subcategory)
                if (parent.parentId) {
                  const grandParent = dummyCategories.find(c => c.id === parent.parentId)
                  if (grandParent) {
                    breadcrumbItems.push(
                      <Link key={grandParent.id} href={`/categorias/${grandParent.slug}`} className="hover:text-primary">
                        {formatCategoryName(grandParent.name)}
                      </Link>
                    )
                    breadcrumbItems.push(<ChevronRight key="arrow1" className="h-4 w-4" />)
                  }
                }
                
                breadcrumbItems.push(
                  <Link key={parent.id} href={`/categorias/${parent.slug}`} className="hover:text-primary">
                    {formatCategoryName(parent.name)}
                  </Link>
                )
                breadcrumbItems.push(<ChevronRight key="arrow2" className="h-4 w-4" />)
              }
            } else {
              // This is a main category, show it in breadcrumb
              return (
                <>
                  <Link href={`/categorias/${category.slug}`} className="hover:text-primary">
                    {formatCategoryName(category.name)}
                  </Link>
                </>
              )
            }
            
            // Add current category
            breadcrumbItems.push(
              <span key="current" className="text-foreground capitalize">
                {formatCategoryName(category.name)}
              </span>
            )
            
            return breadcrumbItems
          })()}
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">
              {getCategoryIcon(category.icon || 'package')}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground capitalize">
                {formatCategoryName(category.name)}
              </h1>
              <p className="text-muted-foreground">
                {products.length} productos encontrados
                {businesses.length > 0 && ` • ${businesses.length} negocios`}
              </p>
            </div>
          </div>

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Subcategorías</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link href={`/categorias/${category.slug}`}>
                    Todos
                  </Link>
                </Button>
                {subcategories.map((sub) => (
                  <Button 
                    key={sub.id}
                    variant="outline" 
                    size="sm"
                    asChild
                  >
                    <Link href={`/categorias/${sub.slug}`}>
                      {sub.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Zone Filter */}
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Todas las zonas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las zonas</SelectItem>
                  {dummyZones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      {zone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevantes">Más relevantes</SelectItem>
                  <SelectItem value="precio-menor">Precio: menor a mayor</SelectItem>
                  <SelectItem value="precio-mayor">Precio: mayor a menor</SelectItem>
                  <SelectItem value="rating">Mejor calificados</SelectItem>
                  <SelectItem value="recientes">Más recientes</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedZone 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'No hay productos disponibles en esta categoría'
              }
            </p>
            {(searchTerm || selectedZone !== 'all') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedZone('all')
                }}
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Products Grid/List */}
            <div className={
              viewMode === 'grid'
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8"
                : "space-y-4 mb-8"
            }>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Businesses Section */}
            {businesses.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Negocios en {category.name}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {businesses.map((business) => {
                    const zone = dummyZones.find(z => z.id === business.zoneId)
                    const businessProducts = products.filter(p => p.businessId === business.id)
                    
                    return (
                      <Card key={business.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Store className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">{business.name}</h3>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{zone?.name}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-primary text-primary" />
                                  <span className="text-sm font-medium">{business.rating}</span>
                                  <span className="text-sm text-muted-foreground">({business.reviewCount})</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {businessProducts.length} productos
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/negocio/${business.id}`}>
                                    Ver tienda
                                  </Link>
                                </Button>
                                {business.phone && (
                                  <Button variant="ghost" size="sm" asChild>
                                    <a href={`tel:${business.phone}`}>
                                      <Phone className="h-3 w-3" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
