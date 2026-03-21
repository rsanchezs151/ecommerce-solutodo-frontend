'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import type { Category, Zone, ProductFilters } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { categoryApi, zoneApi } from '@/lib/api-service'

interface FiltersSidebarProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  className?: string
}

export function FiltersSidebar({ filters, onFiltersChange, className }: FiltersSidebarProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [zones, setZones] = useState<Zone[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    categoryApi.getTree().then(setCategories)
    zoneApi.getAll().then(setZones)
  }, [])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleCategorySelect = (categoryId: string) => {
    onFiltersChange({
      ...filters,
      categoryId: filters.categoryId === categoryId ? undefined : categoryId
    })
  }

  const handleZoneSelect = (zoneId: string) => {
    onFiltersChange({
      ...filters,
      zoneId: filters.zoneId === zoneId ? undefined : zoneId
    })
  }

  const handlePriceApply = () => {
    onFiltersChange({
      ...filters,
      minPrice: priceRange.min ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max ? Number(priceRange.max) : undefined
    })
  }

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' })
    onFiltersChange({})
  }

  const hasActiveFilters = filters.categoryId || filters.zoneId || filters.minPrice || filters.maxPrice

  return (
    <aside className={className}>
      <div className="rounded-lg border bg-card p-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filtros</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto p-1 text-xs">
              <X className="mr-1 h-3 w-3" />
              Limpiar
            </Button>
          )}
        </div>

        {/* Zones */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium">Zona</h3>
          <div className="space-y-2">
            {zones.map(zone => (
              <label
                key={zone.id}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name="zone"
                  checked={filters.zoneId === zone.id}
                  onChange={() => handleZoneSelect(zone.id)}
                  className="h-4 w-4 accent-primary"
                />
                <span className={filters.zoneId === zone.id ? 'font-medium text-primary' : 'text-muted-foreground'}>
                  {zone.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium">Categorías</h3>
          <div className="space-y-1">
            {categories.map(category => (
              <div key={category.id}>
                <div className="flex items-center">
                  {category.children && category.children.length > 0 && (
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="mr-1 p-1"
                    >
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => handleCategorySelect(category.id)}
                    className={`flex-1 rounded px-2 py-1.5 text-left text-sm transition-colors ${
                      filters.categoryId === category.id
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category.name}
                  </button>
                </div>

                {/* Level 2 */}
                {expandedCategories.includes(category.id) && category.children && (
                  <div className="ml-6 mt-1 space-y-1">
                    {category.children.map(sub => (
                      <div key={sub.id}>
                        <div className="flex items-center">
                          {sub.children && sub.children.length > 0 && (
                            <button
                              onClick={() => toggleCategory(sub.id)}
                              className="mr-1 p-0.5"
                            >
                              {expandedCategories.includes(sub.id) ? (
                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => handleCategorySelect(sub.id)}
                            className={`flex-1 rounded px-2 py-1 text-left text-sm transition-colors ${
                              filters.categoryId === sub.id
                                ? 'bg-primary/10 font-medium text-primary'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            {sub.name}
                          </button>
                        </div>

                        {/* Level 3 */}
                        {expandedCategories.includes(sub.id) && sub.children && (
                          <div className="ml-5 mt-1 space-y-1">
                            {sub.children.map(subsub => (
                              <button
                                key={subsub.id}
                                onClick={() => handleCategorySelect(subsub.id)}
                                className={`block w-full rounded px-2 py-1 text-left text-xs transition-colors ${
                                  filters.categoryId === subsub.id
                                    ? 'bg-primary/10 font-medium text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                              >
                                {subsub.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium">Precio</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
            <span className="text-muted-foreground">-</span>
            <input
              type="number"
              placeholder="Máx"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button
            onClick={handlePriceApply}
            variant="outline"
            size="sm"
            className="mt-2 w-full"
          >
            Aplicar
          </Button>
        </div>

        {/* Sort */}
        <div>
          <h3 className="mb-3 text-sm font-medium">Ordenar por</h3>
          <select
            value={filters.sortBy || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              sortBy: e.target.value as ProductFilters['sortBy'] || undefined
            })}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="">Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="newest">Más Recientes</option>
            <option value="rating">Mejor Valorados</option>
          </select>
        </div>
      </div>
    </aside>
  )
}
