'use client'

import { useEffect, useState } from 'react'
import { businessApi } from '@/lib/api-service'
import type { Business } from '@/lib/types'
import {
  Building2,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  MapPin,
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export default function NegociosAdminPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterZone, setFilterZone] = useState('')

  useEffect(() => {
    async function loadBusinesses() {
      const data = await businessApi.getAll()
      setBusinesses(data)
      setIsLoading(false)
    }
    loadBusinesses()
  }, [])

  const filteredBusinesses = businesses.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesZone = !filterZone || b.zoneId === filterZone
    return matchesSearch && matchesZone
  })

  const handleToggleActive = async (business: Business) => {
    const updated = await businessApi.update(business.id, { isActive: !business.isActive })
    if (updated) {
      setBusinesses(prev =>
        prev.map(b => (b.id === business.id ? { ...b, isActive: !b.isActive } : b))
      )
    }
  }

  const zones = [...new Set(businesses.map(b => ({ id: b.zoneId, name: b.zoneName })))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Negocios</h1>
          <p className="text-muted-foreground">
            Administra todos los negocios registrados en la plataforma
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar negocios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="">Todas las zonas</option>
            {Array.from(new Map(zones.map(zone => [zone.id, zone])).values()).map(zone => (
              <option key={zone.id} value={zone.id}>{zone.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold">{businesses.length}</p>
          <p className="text-sm text-muted-foreground">Total negocios</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-success">
            {businesses.filter(b => b.isActive).length}
          </p>
          <p className="text-sm text-muted-foreground">Activos</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-muted-foreground">
            {businesses.filter(b => !b.isActive).length}
          </p>
          <p className="text-sm text-muted-foreground">Inactivos</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {(businesses.reduce((acc, b) => acc + b.rating, 0) / businesses.length || 0).toFixed(1)}
          </p>
          <p className="text-sm text-muted-foreground">Rating promedio</p>
        </div>
      </div>

      {/* Businesses List */}
      <div className="overflow-hidden rounded-xl border bg-card">
        {isLoading ? (
          <div className="divide-y">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="h-14 w-14 animate-pulse rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No hay negocios</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchQuery ? 'No se encontraron negocios con esa búsqueda' : 'Aún no hay negocios registrados'}
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredBusinesses.map((business) => (
              <div key={business.id} className="flex items-start gap-4 p-4 lg:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{business.name}</h3>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      business.isActive
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {business.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {business.zoneName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {business.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {business.rating} ({business.reviewCount} reseñas)
                    </span>
                  </div>
                  
                  <p className="mt-1 hidden text-sm text-muted-foreground lg:block">
                    {business.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/negocio/${business.slug}`}>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(business)}>
                        {business.isActive ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Desactivar
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Activar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
