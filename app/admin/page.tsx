'use client'

import { useEffect, useState } from 'react'
import { statsApi, businessApi, productApi, categoryApi, zoneApi } from '@/lib/api-service'
import type { Business, Product } from '@/lib/types'
import {
  Building2,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  FolderTree,
  MapPin,
  Eye,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AdminStats {
  totalBusinesses: number
  activeBusinesses: number
  totalProducts: number
  activeProducts: number
  totalZones: number
  totalCategories: number
  totalUsers: number
  totalOrders: number
  monthlyRevenue: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const [statsData, businessesData, productsData, categoriesData, zonesData] = await Promise.all([
        statsApi.getAdminStats(),
        businessApi.getAll(),
        productApi.getAll(),
        categoryApi.getAll(),
        zoneApi.getAll()
      ])
      setStats({
        ...statsData,
        totalCategories: categoriesData.length,
        totalZones: zonesData.length
      })
      setBusinesses(businessesData)
      setRecentProducts(productsData.slice(0, 5))
      setIsLoading(false)
    }
    loadData()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">Panel de Administración</h1>
        <p className="text-muted-foreground">
          Vista general de la plataforma ZonaLocal
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <span className="flex items-center gap-1 text-sm text-success">
              <ArrowUpRight className="h-4 w-4" />
              +5
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{stats?.totalBusinesses}</p>
            <p className="text-sm text-muted-foreground">Negocios registrados</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50">
              <Package className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="flex items-center gap-1 text-sm text-success">
              <ArrowUpRight className="h-4 w-4" />
              +23
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{stats?.totalProducts}</p>
            <p className="text-sm text-muted-foreground">Productos totales</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <Users className="h-6 w-6 text-success" />
            </div>
            <span className="flex items-center gap-1 text-sm text-success">
              <ArrowUpRight className="h-4 w-4" />
              +48
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{stats?.totalUsers?.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Usuarios registrados</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <DollarSign className="h-6 w-6 text-warning-foreground" />
            </div>
            <span className="flex items-center gap-1 text-sm text-success">
              <ArrowUpRight className="h-4 w-4" />
              +12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{formatPrice(stats?.monthlyRevenue || 0)}</p>
            <p className="text-sm text-muted-foreground">Ingresos del mes</p>
          </div>
        </div>
      </div>

      {/* Secondary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/categorias" className="rounded-xl border bg-card p-4 transition-colors hover:bg-accent">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <FolderTree className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold">{stats?.totalCategories}</p>
              <p className="text-sm text-muted-foreground">Categorías</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/zonas" className="rounded-xl border bg-card p-4 transition-colors hover:bg-accent">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold">{stats?.totalZones}</p>
              <p className="text-sm text-muted-foreground">Zonas activas</p>
            </div>
          </div>
        </Link>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Eye className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold">{stats?.totalOrders?.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Pedidos totales</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold">{stats?.activeBusinesses}</p>
              <p className="text-sm text-muted-foreground">Negocios activos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Businesses */}
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b p-4 lg:p-6">
            <div>
              <h2 className="text-lg font-semibold">Negocios Recientes</h2>
              <p className="text-sm text-muted-foreground">Últimos negocios registrados</p>
            </div>
            <Link href="/admin/negocios">
              <Button variant="outline" size="sm">Ver todos</Button>
            </Link>
          </div>
          <div className="divide-y">
            {businesses.slice(0, 5).map((business) => (
              <div key={business.id} className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-medium">{business.name}</h3>
                  <p className="text-sm text-muted-foreground">{business.zoneName}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{business.rating}</span>
                  </div>
                  <span className={`text-xs ${business.isActive ? 'text-success' : 'text-muted-foreground'}`}>
                    {business.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b p-4 lg:p-6">
            <div>
              <h2 className="text-lg font-semibold">Productos Recientes</h2>
              <p className="text-sm text-muted-foreground">Últimos productos agregados</p>
            </div>
            <Link href="/admin/productos">
              <Button variant="outline" size="sm">Ver todos</Button>
            </Link>
          </div>
          <div className="divide-y">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.businessName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(product.price)}</p>
                  <span className={`text-xs ${product.isActive ? 'text-success' : 'text-muted-foreground'}`}>
                    {product.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Acciones Rápidas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/categorias">
            <Button variant="outline" className="w-full justify-start gap-2">
              <FolderTree className="h-4 w-4" />
              Gestionar Categorías
            </Button>
          </Link>
          <Link href="/admin/zonas">
            <Button variant="outline" className="w-full justify-start gap-2">
              <MapPin className="h-4 w-4" />
              Gestionar Zonas
            </Button>
          </Link>
          <Link href="/admin/negocios">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Building2 className="h-4 w-4" />
              Ver Negocios
            </Button>
          </Link>
          <Link href="/admin/usuarios">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Ver Usuarios
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
