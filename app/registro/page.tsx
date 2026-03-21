'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Store, Mail, Lock, Eye, EyeOff, User, Phone, Building2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import type { UserRole } from '@/lib/types'

export default function RegistroPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<1 | 2>(1)
  const [accountType, setAccountType] = useState<'customer' | 'owner'>('customer')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    acceptTerms: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.password) {
      setError('Por favor completa todos los campos requeridos')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones')
      return
    }

    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
      role: accountType as UserRole,
      businessName: formData.businessName
    })

    if (result.success) {
      if (accountType === 'owner') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    } else {
      setError(result.error || 'Error al registrarse')
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
            Únete a la comunidad de negocios locales más grande de la zona norte del Estado de México.
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3 rounded-lg bg-secondary-foreground/10 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-secondary-foreground">Alcance local</h3>
                <p className="text-sm text-secondary-foreground/70">
                  Llega a clientes en Coacalco, Tultitlán, Tultepec y más
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-secondary-foreground/10 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-secondary-foreground">Sin comisiones ocultas</h3>
                <p className="text-sm text-secondary-foreground/70">
                  Planes transparentes para hacer crecer tu negocio
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-secondary-foreground/10 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-secondary-foreground">Fácil de usar</h3>
                <p className="text-sm text-secondary-foreground/70">
                  Administra productos, promociones y pedidos desde un solo lugar
                </p>
              </div>
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
            <h2 className="mb-2 text-3xl font-bold">Crear cuenta</h2>
            <p className="text-muted-foreground">
              {step === 1 ? 'Elige el tipo de cuenta que deseas crear' : 'Completa tu información'}
            </p>
          </div>

          {/* Step indicator */}
          <div className="mb-8 flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
          </div>

          {step === 1 ? (
            /* Step 1: Choose account type */
            <div className="space-y-4">
              <button
                onClick={() => setAccountType('customer')}
                className={`flex w-full items-start gap-4 rounded-lg border-2 p-4 text-left transition-colors ${
                  accountType === 'customer'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                  accountType === 'customer' ? 'bg-primary' : 'bg-muted'
                }`}>
                  <User className={`h-6 w-6 ${accountType === 'customer' ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="font-semibold">Cliente</h3>
                  <p className="text-sm text-muted-foreground">
                    Compra productos de negocios locales cerca de ti
                  </p>
                </div>
                {accountType === 'customer' && (
                  <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setAccountType('owner')}
                className={`flex w-full items-start gap-4 rounded-lg border-2 p-4 text-left transition-colors ${
                  accountType === 'owner'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                  accountType === 'owner' ? 'bg-primary' : 'bg-muted'
                }`}>
                  <Building2 className={`h-6 w-6 ${accountType === 'owner' ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="font-semibold">Dueño de Negocio</h3>
                  <p className="text-sm text-muted-foreground">
                    Registra tu negocio y vende tus productos en línea
                  </p>
                </div>
                {accountType === 'owner' && (
                  <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </button>

              <Button
                onClick={() => setStep(2)}
                className="mt-6 w-full py-6 text-base"
              >
                Continuar
              </Button>
            </div>
          ) : (
            /* Step 2: Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nombre completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Correo electrónico *
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
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="55 1234 5678"
                    className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {accountType === 'owner' && (
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Nombre de tu negocio *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Mi Negocio"
                      className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
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

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Confirmar contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repite tu contraseña"
                    className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded accent-primary"
                />
                <span className="text-muted-foreground">
                  Acepto los{' '}
                  <Link href="/terminos" className="text-primary hover:underline">
                    términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link href="/privacidad" className="text-primary hover:underline">
                    política de privacidad
                  </Link>
                </span>
              </label>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 py-6"
                >
                  Atrás
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registrando...' : 'Crear cuenta'}
                </Button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
