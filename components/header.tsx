'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Store,
  LayoutDashboard,
  LogOut,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  onSearch?: (query: string) => void
  onZoneChange?: (zoneId: string) => void
  selectedZone?: string
}

const zones = [
  { id: 'z1', name: 'Coacalco' },
  { id: 'z2', name: 'Tultitlán' },
  { id: 'z3', name: 'Tultepec' },
  { id: 'z4', name: 'Cuautitlán' },
  { id: 'z5', name: 'Cuautitlán Izcalli' },
  { id: 'z6', name: 'Ecatepec' },
  { id: 'z7', name: 'Tecámac' },
]

export function Header({ onSearch, onZoneChange, selectedZone }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const selectedZoneName = zones.find(z => z.id === selectedZone)?.name || 'Seleccionar zona'

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Zona<span className="text-primary">Local</span>
            </span>
          </Link>

          {/* Zone selector - Desktop */}
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-secondary-foreground hover:bg-secondary-foreground/10">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="max-w-[150px] truncate">{selectedZoneName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {zones.map((zone) => (
                  <DropdownMenuItem
                    key={zone.id}
                    onClick={() => onZoneChange?.(zone.id)}
                    className={selectedZone === zone.id ? 'bg-accent' : ''}
                  >
                    {zone.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 px-4 md:flex lg:max-w-xl lg:px-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos, negocios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border-0 bg-secondary-foreground/10 py-2 pl-4 pr-10 text-sm text-secondary-foreground placeholder:text-secondary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 flex h-full items-center justify-center rounded-r-lg bg-primary px-3 text-primary-foreground hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <Button variant="ghost" size="icon" className="relative text-secondary-foreground hover:bg-secondary-foreground/10">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    0
                  </span>
                </Button>

                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 text-secondary-foreground hover:bg-secondary-foreground/10">
                      <User className="h-5 w-5" />
                      <span className="hidden lg:inline">{user?.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    {user?.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Panel Admin
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {user?.role === 'owner' && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          Mi Negocio
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/cuenta" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Mi Cuenta
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary-foreground/10">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-secondary-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-2 text-sm lg:px-8">
          <Link href="/categorias/muebles" className="whitespace-nowrap text-muted-foreground hover:text-primary">
            Muebles
          </Link>
          <Link href="/categorias/automotriz" className="whitespace-nowrap text-muted-foreground hover:text-primary">
            Automotriz
          </Link>
          <Link href="/categorias/comida" className="whitespace-nowrap text-muted-foreground hover:text-primary">
            Comida
          </Link>
          <Link href="/categorias/vidrio-aluminio" className="whitespace-nowrap text-muted-foreground hover:text-primary">
            Vidrio y Aluminio
          </Link>
          <Link href="/categorias/talleres" className="whitespace-nowrap text-muted-foreground hover:text-primary">
            Talleres
          </Link>
          <Link href="/categorias/electronica" className="whitespace-nowrap text-muted-foreground hover:text-primary">
            Electrónica
          </Link>
          <Link href="/negocios" className="whitespace-nowrap font-medium text-primary">
            Ver Negocios
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b bg-card p-4 shadow-lg md:hidden">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border bg-background py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 flex h-full items-center justify-center rounded-r-lg bg-primary px-3 text-primary-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Mobile zone selector */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Zona</p>
            <select
              value={selectedZone || ''}
              onChange={(e) => onZoneChange?.(e.target.value)}
              className="w-full rounded-lg border bg-background p-2 text-sm"
            >
              <option value="">Todas las zonas</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  )
}
