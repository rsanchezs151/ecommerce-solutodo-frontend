'use client'

import { useEffect, useState } from 'react'
import { categoryApi } from '@/lib/api-service'
import type { Category } from '@/lib/types'
import {
  FolderTree,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', parentId: '' })

  useEffect(() => {
    async function loadCategories() {
      const data = await categoryApi.getTree()
      setCategories(data)
      setIsLoading(false)
    }
    loadCategories()
  }, [])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return
    
    const parentLevel = newCategory.parentId
      ? categories.find(c => c.id === newCategory.parentId)?.level || 0
      : 0
    
    const created = await categoryApi.create({
      name: newCategory.name,
      slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      parentId: newCategory.parentId || undefined,
      level: (parentLevel + 1) as 1 | 2 | 3
    })
    
    // Refresh categories
    const data = await categoryApi.getTree()
    setCategories(data)
    setShowAddModal(false)
    setNewCategory({ name: '', parentId: '' })
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm('¿Estás seguro de eliminar esta categoría? Las subcategorías también serán eliminadas.')) {
      await categoryApi.delete(categoryId)
      const data = await categoryApi.getTree()
      setCategories(data)
    }
  }

  const getAllCategories = (): Category[] => {
    const all: Category[] = []
    categories.forEach(cat => {
      all.push(cat)
      cat.children?.forEach(sub => {
        all.push(sub)
        sub.children?.forEach(subsub => {
          all.push(subsub)
        })
      })
    })
    return all
  }

  const renderCategory = (category: Category, depth: number = 0) => {
    const isExpanded = expandedCategories.includes(category.id)
    const hasChildren = category.children && category.children.length > 0
    const canAddSubcategory = category.level < 3

    return (
      <div key={category.id}>
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted ${
            depth > 0 ? 'ml-6' : ''
          }`}
        >
          {hasChildren ? (
            <button
              onClick={() => toggleCategory(category.id)}
              className="p-1"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}
          
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex-1">
            <span className="font-medium">{category.name}</span>
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Nivel {category.level}
            </span>
          </div>

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
              {canAddSubcategory && (
                <DropdownMenuItem onClick={() => {
                  setNewCategory({ name: '', parentId: category.id })
                  setShowAddModal(true)
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar subcategoría
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-4 border-l pl-2">
            {category.children!.map(child => renderCategory(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Categorías</h1>
          <p className="text-muted-foreground">
            Gestiona las categorías del marketplace (hasta 3 niveles)
          </p>
        </div>
        <Button className="gap-2" onClick={() => {
          setNewCategory({ name: '', parentId: '' })
          setShowAddModal(true)
        }}>
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories Tree */}
      <div className="rounded-xl border bg-card">
        {isLoading ? (
          <div className="space-y-2 p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <FolderTree className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No hay categorías</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Crea tu primera categoría
            </p>
            <Button className="mt-4" onClick={() => setShowAddModal(true)}>
              Crear categoría
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-1">
            {categories.map(category => renderCategory(category))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">
              {newCategory.parentId ? 'Nueva Subcategoría' : 'Nueva Categoría'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre de la categoría"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {!newCategory.parentId && (
                <div>
                  <label className="mb-2 block text-sm font-medium">Categoría padre (opcional)</label>
                  <select
                    value={newCategory.parentId}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, parentId: e.target.value }))}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Sin categoría padre (Nivel 1)</option>
                    {getAllCategories()
                      .filter(c => c.level < 3)
                      .map(c => (
                        <option key={c.id} value={c.id}>
                          {c.level === 1 ? c.name : `— ${c.name}`}
                        </option>
                      ))
                    }
                  </select>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleAddCategory}
                disabled={!newCategory.name.trim()}
              >
                Crear
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
