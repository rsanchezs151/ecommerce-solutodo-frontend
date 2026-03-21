'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Store, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos')
      return
    }

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      router.push('/')
    } else {
      setError(result.error || 'Error al iniciar sesión')
    }
  }

  const handleDemoLogin = async (role: 'admin' | 'owner' | 'customer') => {
    const credentials = {
      admin: { email: 'admin@zonalocal.mx', password: 'demo123' },
      owner: { email: 'garcia@mueblesgarcia.mx', password: 'demo123' },
      customer: { email: 'cliente@gmail.com', password: 'demo123' }
    }

    const { email, password } = credentials[role]
    const result = await login(email, password)
    
    if (result.success) {
      if (role === 'admin') router.push('/admin')
      else if (role === 'owner') router.push('/dashboard')
      else router.push('/')
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 bg-secondary lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
            <Store className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-secondary-foreground">
            Zona<span className="text-primary">Local</span>
          </h1>
          <p className="mb-8 text-lg text-secondary-foreground/80">
            La plataforma que conecta negocios locales con clientes de tu zona. 
            Descubre productos y servicios cerca de ti.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-secondary-foreground/10 p-4">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-xs text-secondary-foreground/70">Negocios</div>
            </div>
            <div className="rounded-lg bg-secondary-foreground/10 p-4">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-xs text-secondary-foreground/70">Zonas</div>
            </div>
            <div className="rounded-lg bg-secondary-foreground/10 p-4">
              <div className="text-2xl font-bold text-primary">10k+</div>
              <div className="text-xs text-secondary-foreground/70">Productos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Store className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="ml-2 text-2xl font-bold">
              Zona<span className="text-primary">Local</span>
            </span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="mb-2 text-3xl font-bold">Bienvenido de vuelta</h2>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          {/* Demo accounts info */}
          <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="mb-3 text-sm font-medium text-primary">Cuentas de demostración:</p>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="flex w-full items-center justify-between rounded-md bg-card p-2 text-left text-sm hover:bg-muted"
              >
                <div>
                  <span className="font-medium">Admin</span>
                  <span className="ml-2 text-muted-foreground">admin@zonalocal.mx</span>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </button>
              <button
                onClick={() => handleDemoLogin('owner')}
                className="flex w-full items-center justify-between rounded-md bg-card p-2 text-left text-sm hover:bg-muted"
              >
                <div>
                  <span className="font-medium">Dueño</span>
                  <span className="ml-2 text-muted-foreground">garcia@mueblesgarcia.mx</span>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </button>
              <button
                onClick={() => handleDemoLogin('customer')}
                className="flex w-full items-center justify-between rounded-md bg-card p-2 text-left text-sm hover:bg-muted"
              >
                <div>
                  <span className="font-medium">Cliente</span>
                  <span className="ml-2 text-muted-foreground">cliente@gmail.com</span>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@correo.com"
                  className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Tu contraseña"
                  className="w-full rounded-lg border bg-background py-3 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded accent-primary" />
                <span className="text-muted-foreground">Recordarme</span>
              </label>
              <Link href="/recuperar" className="font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link href="/registro" className="font-medium text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
