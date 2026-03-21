'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Star,
  Eye,
  TrendingUp,
  Users,
  Package,
  Clock,
  Edit,
  ExternalLink,
  BarChart3,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import { dummyBusinesses, dummyZones, dummyCategories, dummyProducts } from '@/lib/dummy-data'
import type { Business } from '@/lib/types'

export default function NegocioPage() {
  const { user } = useAuth()
  const [business, setBusiness] = useState<Business | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // For demo, use first business or user's business
    const businessData = dummyBusinesses.find(b => b.id === user?.businessId) || dummyBusinesses[0]
    setBusiness(businessData)
    setIsLoading(false)
  }, [user])

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-6 w-48"></div>
          <div className="grid gap-6">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No se encontró información del negocio</p>
        </div>
      </div>
    )
  }

  const zone = dummyZones.find(z => z.id === business.zoneId)
  const categories = dummyCategories.filter(c => business.categoryIds.includes(c.id))
  const products = dummyProducts.filter(p => p.businessId === business.id)
  const totalViews = products.reduce((sum, p) => sum + (p.reviewCount || 0) * 10, 0) // Simulated views
  const avgRating = products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi Negocio</h1>
          <p className="text-muted-foreground">Vista previa y estadísticas de tu negocio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/negocio/${business.id}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Página Pública
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/mi-negocio">
              <Edit className="h-4 w-4 mr-2" />
              Editar Información
            </Link>
          </Button>
        </div>
      </div>

      {/* Business Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo/Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
                {business.logo ? (
                  <img 
                    src={business.logo} 
                    alt={business.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Store className="h-12 w-12 text-primary" />
                )}
              </div>
            </div>

            {/* Business Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{business.name}</h2>
                <p className="text-muted-foreground mt-1">{business.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
                <Badge className="bg-green-500/10 text-green-600">
                  Verificado
                </Badge>
              </div>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{business.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{business.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>{avgRating.toFixed(1)} ({business.reviewCount} reseñas)</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col gap-4 min-w-0">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{products.length}</div>
                <div className="text-sm text-muted-foreground">Productos</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{avgRating.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="estadisticas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="informacion">Información</TabsTrigger>
          <TabsTrigger value="horarios">Horarios</TabsTrigger>
        </TabsList>

        <TabsContent value="estadisticas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Visitas
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalViews.toLocaleString('es-MX')}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">+12.5%</span>
                  <span className="ml-1">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Productos Activos
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-blue-500">Todos publicados</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Rating Promedio
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-yellow-500">Excelente</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Reseñas
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{business.reviewCount}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">+8 este mes</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Rendimiento General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Gráficos detallados disponibles en la sección de Estadísticas completas
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/dashboard/estadisticas">
                    Ver Estadísticas Completas
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Productos del Negocio
              </CardTitle>
              <CardDescription>
                Gestiona tu catálogo de productos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No tienes productos publicados</p>
                  <Button asChild>
                    <Link href="/dashboard/productos">
                      Agregar Primer Producto
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {products.length} productos activos
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/productos">
                        Gestionar Productos
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.slice(0, 6).map((product) => (
                      <div key={product.id} className="border rounded-lg p-4 space-y-2">
                        <div className="aspect-square bg-muted rounded-lg mb-2"></div>
                        <h4 className="font-medium truncate">{product.name}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold">${product.price.toLocaleString('es-MX')}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span>{product.rating || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{product.stock} en stock</span>
                          <span>{product.reviewCount || 0} reseñas</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {products.length > 6 && (
                    <div className="text-center">
                      <Button variant="outline" asChild>
                        <Link href="/dashboard/productos">
                          Ver Todos los Productos
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="informacion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Información del Negocio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Descripción</h4>
                <p className="text-muted-foreground">{business.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Categorías</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge key={category.id} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Ubicación</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{business.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">{zone?.name}, {zone?.estado}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Contacto</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{business.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Estado</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Verificación</span>
                      <Badge className="bg-green-500/10 text-green-600">Verificado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Miembro desde</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(business.createdAt).toLocaleDateString('es-MX', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horarios de Atención
              </CardTitle>
            </CardHeader>
            <CardContent>
              {business.businessHours ? (
                <div className="space-y-2">
                  {Object.entries(business.businessHours).map(([day, hours]) => {
                    const dayNames = {
                      monday: 'Lunes',
                      tuesday: 'Martes',
                      wednesday: 'Miércoles',
                      thursday: 'Jueves',
                      friday: 'Viernes',
                      saturday: 'Sábado',
                      sunday: 'Domingo',
                    }
                    return (
                      <div 
                        key={day}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <span className="font-medium">{dayNames[day as keyof typeof dayNames]}</span>
                        {hours.closed ? (
                          <Badge variant="secondary">Cerrado</Badge>
                        ) : (
                          <span className="text-muted-foreground">
                            {hours.open} - {hours.close}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No hay horarios configurados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
