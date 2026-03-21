'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { statsApi, productApi, businessApi } from '@/lib/api-service'
import type { Product, Business } from '@/lib/types'
import {
  Package,
  Eye,
  ShoppingCart,
  DollarSign,
  Star,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface OwnerStats {
  totalProducts: number
  activeProducts: number
  totalViews: number
  totalSales: number
  revenue: number
  rating: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<OwnerStats | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [business, setBusiness] = useState<Business | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (!user?.businessId && user?.role !== 'admin') {
        // For demo, use first business
        const [statsData, productsData, businessData] = await Promise.all([
          statsApi.getOwnerStats('b1'),
          productApi.getByBusiness('b1'),
          businessApi.getById('b1')
        ])
        setStats(statsData)
        setProducts(productsData)
        setBusiness(businessData)
      } else if (user?.businessId) {
        const [statsData, productsData, businessData] = await Promise.all([
          statsApi.getOwnerStats(user.businessId),
          productApi.getByBusiness(user.businessId),
          businessApi.getById(user.businessId)
        ])
        setStats(statsData)
        setProducts(productsData)
        setBusiness(businessData)
      }
      setIsLoading(false)
    }
    loadData()
  }, [user])

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
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido de vuelta, {user?.name}
          </p>
        </div>
        <Link href="/dashboard/productos/nuevo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {/* Business info card */}
      {business && (
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-foreground/20">
                <span className="text-2xl font-bold">
                  {business.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{business.name}</h2>
                <p className="text-primary-foreground/80">{business.zoneName}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x sm:grid-cols-4">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold">{stats?.totalProducts}</p>
              <p className="text-sm text-muted-foreground">Productos</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold">{business.rating}</p>
              <p className="text-sm text-muted-foreground">Calificación</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold">{business.reviewCount}</p>
              <p className="text-sm text-muted-foreground">Reseñas</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{stats?.totalSales}</p>
              <p className="text-sm text-muted-foreground">Ventas</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <span className="flex items-center gap-1 text-sm text-success">
              <ArrowUpRight className="h-4 w-4" />
              12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{stats?.activeProducts}</p>
            <p className="text-sm text-muted-foreground">Productos activos</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50">
              <Eye className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="flex items-center gap-1 text-sm text-success">
              <ArrowUpRight className="h-4 w-4" />
              8%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{stats?.totalViews?.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Visitas este mes</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <ShoppingCart className="h-6 w-6 text-success" />
            </div>
            <span className="flex items-center gap-1 text-sm text-destructive">
              <ArrowDownRight className="h-4 w-4" />
              3%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{stats?.totalSales}</p>
            <p className="text-sm text-muted-foreground">Ventas este mes</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <DollarSign className="h-6 w-6 text-warning-foreground" />
            </div>
            <span className="flex items-center gap-1 text-sm text-success">
              <ArrowUpRight className="h-4 w-4" />
              15%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{formatPrice(stats?.revenue || 0)}</p>
            <p className="text-sm text-muted-foreground">Ingresos este mes</p>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b p-4 lg:p-6">
          <div>
            <h2 className="text-lg font-semibold">Productos Recientes</h2>
            <p className="text-sm text-muted-foreground">Tus últimos productos agregados</p>
          </div>
          <Link href="/dashboard/productos">
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </Link>
        </div>
        <div className="divide-y">
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4 lg:p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Package className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="truncate font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.categoryName}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(product.price)}</p>
                <div className="flex items-center justify-end gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-sm text-muted-foreground">{product.rating}</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                  product.isActive 
                    ? 'bg-success/10 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {product.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/productos/nuevo"
          className="flex items-center gap-4 rounded-xl border bg-card p-6 transition-colors hover:bg-accent"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Agregar Producto</h3>
            <p className="text-sm text-muted-foreground">Añade un nuevo producto a tu catálogo</p>
          </div>
        </Link>

        <Link
          href="/dashboard/promociones"
          className="flex items-center gap-4 rounded-xl border bg-card p-6 transition-colors hover:bg-accent"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
            <TrendingUp className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold">Crear Promoción</h3>
            <p className="text-sm text-muted-foreground">Lanza ofertas para atraer más clientes</p>
          </div>
        </Link>

        <Link
          href="/dashboard/negocio"
          className="flex items-center gap-4 rounded-xl border bg-card p-6 transition-colors hover:bg-accent"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
            <Star className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">Editar Negocio</h3>
            <p className="text-sm text-muted-foreground">Actualiza la información de tu negocio</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
