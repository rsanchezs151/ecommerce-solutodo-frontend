"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Store, MapPin, Phone, Mail, Clock, Save, Image as ImageIcon } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { dummyBusinesses, dummyZones, dummyCategories } from "@/lib/dummy-data"
import type { Business } from "@/lib/types"

export default function MiNegocioPage() {
  const { user } = useAuth()
  const business = dummyBusinesses.find(b => b.id === user?.businessId)
  
  const [formData, setFormData] = useState<Partial<Business>>({
    name: business?.name || "",
    description: business?.description || "",
    address: business?.address || "",
    phone: business?.phone || "",
    email: business?.email || "",
    zoneId: business?.zoneId || "",
    categoryId: business?.categoryId || "",
    openingHours: business?.openingHours || {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "14:00", closed: false },
      sunday: { open: "00:00", close: "00:00", closed: true },
    },
    logo: business?.logo || "",
    images: business?.images || [],
  })

  const [isSaving, setIsSaving] = useState(false)

  const zone = dummyZones.find(z => z.id === formData.zoneId)
  const category = dummyCategories.find(c => c.id === formData.categoryId)

  const handleSave = async () => {
    setIsSaving(true)
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Cambios guardados correctamente")
  }

  const days = [
    { key: "monday", label: "Lunes" },
    { key: "tuesday", label: "Martes" },
    { key: "wednesday", label: "Miércoles" },
    { key: "thursday", label: "Jueves" },
    { key: "friday", label: "Viernes" },
    { key: "saturday", label: "Sábado" },
    { key: "sunday", label: "Domingo" },
  ] as const

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi Negocio</h1>
          <p className="text-muted-foreground">Administra la información de tu empresa</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                Información del Negocio
              </CardTitle>
              <CardDescription>
                Datos principales que verán tus clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del negocio</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre de tu negocio"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe tu negocio, productos y servicios"
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zone">Zona</Label>
                  <Select
                    value={formData.zoneId}
                    onValueChange={(value) => setFormData({ ...formData, zoneId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona zona" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyZones.map((z) => (
                        <SelectItem key={z.id} value={z.id}>
                          {z.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Ubicación y Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Dirección completa</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Calle, número, colonia, código postal"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="55 1234 5678"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contacto@tunegocio.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Horarios de Atención
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {days.map((day) => (
                  <div key={day.key} className="flex items-center gap-4">
                    <span className="w-24 text-sm font-medium">{day.label}</span>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!formData.openingHours?.[day.key]?.closed}
                        onChange={(e) => setFormData({
                          ...formData,
                          openingHours: {
                            ...formData.openingHours!,
                            [day.key]: {
                              ...formData.openingHours![day.key],
                              closed: !e.target.checked,
                            },
                          },
                        })}
                        className="rounded border-input"
                      />
                      <span className="text-sm text-muted-foreground">Abierto</span>
                    </label>
                    {!formData.openingHours?.[day.key]?.closed && (
                      <>
                        <Input
                          type="time"
                          value={formData.openingHours?.[day.key]?.open || "09:00"}
                          onChange={(e) => setFormData({
                            ...formData,
                            openingHours: {
                              ...formData.openingHours!,
                              [day.key]: {
                                ...formData.openingHours![day.key],
                                open: e.target.value,
                              },
                            },
                          })}
                          className="w-28"
                        />
                        <span className="text-muted-foreground">a</span>
                        <Input
                          type="time"
                          value={formData.openingHours?.[day.key]?.close || "18:00"}
                          onChange={(e) => setFormData({
                            ...formData,
                            openingHours: {
                              ...formData.openingHours!,
                              [day.key]: {
                                ...formData.openingHours![day.key],
                                close: e.target.value,
                              },
                            },
                          })}
                          className="w-28"
                        />
                      </>
                    )}
                    {formData.openingHours?.[day.key]?.closed && (
                      <Badge variant="secondary">Cerrado</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Logo del Negocio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  {formData.logo ? (
                    <img 
                      src={formData.logo} 
                      alt="Logo" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Store className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <Button variant="outline" className="w-full">
                  Subir Logo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado del Negocio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Verificado</span>
                <Badge className="bg-green-500/10 text-green-600">
                  Verificado
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Zona</span>
                <Badge variant="outline">{zone?.name || "Sin zona"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Categoría</span>
                <Badge variant="outline">{category?.name || "Sin categoría"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Miembro desde</span>
                <span className="text-sm text-muted-foreground">
                  {business?.createdAt 
                    ? new Date(business.createdAt).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
                    : "N/A"
                  }
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Galería de Imágenes</CardTitle>
              <CardDescription>Máximo 5 imágenes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="aspect-square rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Subir Imágenes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
