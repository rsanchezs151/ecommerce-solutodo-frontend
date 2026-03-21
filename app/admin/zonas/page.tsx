"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, MapPin, Store } from "lucide-react"
import { dummyZones, dummyBusinesses } from "@/lib/dummy-data"
import type { Zone } from "@/lib/types"

export default function ZonasAdminPage() {
  const [zones, setZones] = useState<Zone[]>(dummyZones)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingZone, setEditingZone] = useState<Zone | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    estado: "Estado de México",
    codigoPostal: "",
    parentId: "",
  })

  const resetForm = () => {
    setFormData({ 
      name: "", 
      slug: "", 
      estado: "Estado de México", 
      codigoPostal: "",
      parentId: ""
    })
    setEditingZone(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingZone) {
      setZones(zones.map(z => 
        z.id === editingZone.id 
          ? { ...z, name: formData.name, slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'), estado: formData.estado, codigoPostal: formData.codigoPostal, parentId: formData.parentId || undefined }
          : z
      ))
    } else {
      const newZone: Zone = {
        id: `zone-${Date.now()}`,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        estado: formData.estado,
        codigoPostal: formData.codigoPostal,
        parentId: formData.parentId || undefined,
      }
      setZones([...zones, newZone])
    }
    
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (zone: Zone) => {
    setEditingZone(zone)
    setFormData({
      name: zone.name,
      slug: zone.slug,
      estado: zone.estado,
      codigoPostal: zone.codigoPostal,
      parentId: zone.parentId || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (zoneId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta zona?")) {
      setZones(zones.filter(z => z.id !== zoneId))
    }
  }

  const getBusinessCount = (zoneId: string) => {
    return dummyBusinesses.filter(b => b.zoneId === zoneId).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Zonas</h1>
          <p className="text-muted-foreground">Administra las zonas geográficas de la plataforma</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Zona
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold">{zones.length}</p>
          <p className="text-sm text-muted-foreground">Total zonas</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-success">
            {dummyBusinesses.filter(b => b.isActive).length}
          </p>
          <p className="text-sm text-muted-foreground">Negocios activos</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-muted-foreground">
            {zones.filter(z => z.parentId).length}
          </p>
          <p className="text-sm text-muted-foreground">Subzonas</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {zones.filter(z => !z.parentId).length}
          </p>
          <p className="text-sm text-muted-foreground">Zonas principales</p>
        </div>
      </div>

      {/* Zones Table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Código Postal</TableHead>
              <TableHead>Negocios</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell className="font-medium">{zone.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {zone.slug}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {zone.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {zone.codigoPostal}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {getBusinessCount(zone.id)} negocios
                  </Badge>
                </TableCell>
                <TableCell>
                  {zone.parentId ? (
                    <Badge variant="outline">Subzona</Badge>
                  ) : (
                    <Badge className="bg-blue-500/10 text-blue-600">Principal</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(zone)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(zone.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Zone Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingZone ? 'Editar Zona' : 'Agregar Nueva Zona'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la zona</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Coacalco de Berriozábal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="coacalco-berriozabal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                placeholder="Estado de México"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigoPostal">Código Postal</Label>
              <Input
                id="codigoPostal"
                value={formData.codigoPostal}
                onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                placeholder="55700"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentId">Zona Padre (opcional)</Label>
              <select
                id="parentId"
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              >
                <option value="">Ninguna (zona principal)</option>
                {zones.filter(z => !z.parentId).map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingZone ? 'Actualizar Zona' : 'Crear Zona'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
