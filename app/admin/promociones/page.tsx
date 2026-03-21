'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Tag,
  Store,
  Calendar,
  Percent,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Grid3X3,
  List,
  Eye
} from 'lucide-react'
import { dummyPromotions, dummyBusinesses } from '@/lib/dummy-data'
import type { Promotion, Business } from '@/lib/types'

export default function AdminPromocionesPage() {
  const { user } = useAuth()
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBusiness, setSelectedBusiness] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setPromotions(dummyPromotions)
      setBusinesses(dummyBusinesses)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBusiness = selectedBusiness === 'all' || promotion.businessId === selectedBusiness
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && promotion.isActive) ||
                         (selectedStatus === 'inactive' && !promotion.isActive)
    const matchesType = selectedType === 'all' || promotion.discountType === selectedType

    return matchesSearch && matchesBusiness && matchesStatus && matchesType
  })

  const getBusinessName = (businessId: string) => {
    const business = businesses.find(b => b.id === businessId)
    return business?.name || 'Negocio no encontrado'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const isPromotionActive = (startDate: string, endDate: string) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    return now >= start && now <= end
  }

  const handleDeletePromotion = (promotionId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta promoción?')) {
      setPromotions(promotions.filter(p => p.id !== promotionId))
    }
  }

  const handleToggleStatus = (promotionId: string) => {
    setPromotions(promotions.map(p => 
      p.id === promotionId ? { ...p, isActive: !p.isActive } : p
    ))
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-6 w-48"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Promociones</h1>
          <p className="text-muted-foreground">Gestiona todas las promociones de la plataforma</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Promoción
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Promociones
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Activas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {promotions.filter(p => p.isActive).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inactivas
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {promotions.filter(p => !p.isActive).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Negocios con Promos
            </CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(promotions.map(p => p.businessId)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar promociones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Todos los negocios" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los negocios</SelectItem>
                {businesses.map((business) => (
                  <SelectItem key={business.id} value={business.id}>
                    {business.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="percentage">Porcentaje</SelectItem>
                <SelectItem value="fixed">Monto fijo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="inactive">Inactivas</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Resultados ({filteredPromotions.length} promociones)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Promoción</th>
                    <th className="text-left p-3 font-medium">Negocio</th>
                    <th className="text-left p-3 font-medium">Tipo</th>
                    <th className="text-left p-3 font-medium">Descuento</th>
                    <th className="text-left p-3 font-medium">Vigencia</th>
                    <th className="text-left p-3 font-medium">Estado</th>
                    <th className="text-left p-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPromotions.map((promotion) => {
                    const isActive = isPromotionActive(promotion.startDate, promotion.endDate)
                    return (
                      <tr key={promotion.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{promotion.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              {promotion.description}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Store className="h-3 w-3 text-muted-foreground" />
                            <span>{getBusinessName(promotion.businessId)}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">
                            {promotion.discountType === 'percentage' ? (
                              <><Percent className="h-3 w-3 mr-1" />Porcentaje</>
                            ) : (
                              <><DollarSign className="h-3 w-3 mr-1" />Fijo</>
                            )}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-lg">
                            {promotion.discountType === 'percentage' 
                              ? `-${promotion.discountValue}%` 
                              : `-$${promotion.discountValue}`
                            }
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <div>Del: {formatDate(promotion.startDate)}</div>
                            <div>Al: {formatDate(promotion.endDate)}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <Badge className={
                              promotion.isActive 
                                ? 'bg-green-500/10 text-green-600' 
                                : 'bg-red-500/10 text-red-600'
                            }>
                              {promotion.isActive ? 'Activa' : 'Inactiva'}
                            </Badge>
                            {isActive && (
                              <Badge className="bg-blue-500/10 text-blue-600 text-xs">
                                Vigente
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeletePromotion(promotion.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPromotions.map((promotion) => {
                const isActive = isPromotionActive(promotion.startDate, promotion.endDate)
                return (
                  <Card key={promotion.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg line-clamp-2">{promotion.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {promotion.description}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ml-2">
                            <Tag className="h-6 w-6 text-primary" />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={
                            promotion.isActive 
                              ? 'bg-green-500/10 text-green-600' 
                              : 'bg-red-500/10 text-red-600'
                          }>
                            {promotion.isActive ? 'Activa' : 'Inactiva'}
                          </Badge>
                          {isActive && (
                            <Badge className="bg-blue-500/10 text-blue-600">
                              Vigente
                            </Badge>
                          )}
                        </div>

                        <div className="text-center py-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {promotion.discountType === 'percentage' 
                              ? `-${promotion.discountValue}%` 
                              : `-$${promotion.discountValue}`
                            }
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Store className="h-3 w-3 text-muted-foreground" />
                            <span>{getBusinessName(promotion.businessId)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>
                              {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
