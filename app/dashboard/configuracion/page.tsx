'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

export default function ConfiguracionPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Perfil Settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'customer'
  })

  // Password Settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newOrders: true,
    customerReviews: true,
    promotions: false,
    systemUpdates: true
  })

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: true,
    allowMessages: true,
    dataSharing: false
  })

  const handleSaveProfile = async () => {
    setIsLoading(true)
    setSaveMessage('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setSaveMessage('Perfil actualizado correctamente')
    
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleSavePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveMessage('Las contraseñas no coinciden')
      return
    }
    
    setIsLoading(true)
    setSaveMessage('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setSaveMessage('Contraseña actualizada correctamente')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    setSaveMessage('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setSaveMessage('Preferencias de notificación guardadas')
    
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleSavePrivacy = async () => {
    setIsLoading(true)
    setSaveMessage('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setSaveMessage('Configuración de privacidad actualizada')
    
    setTimeout(() => setSaveMessage(''), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground">Administra tu cuenta y preferencias</p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          saveMessage.includes('incorrectamente') || saveMessage.includes('no coinciden')
            ? 'bg-destructive/10 text-destructive'
            : 'bg-green-500/10 text-green-600'
        }`}>
          {saveMessage.includes('incorrectamente') || saveMessage.includes('no coinciden') ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          <span className="text-sm">{saveMessage}</span>
        </div>
      )}

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
          <TabsTrigger value="datos">Datos</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
              <CardDescription>
                Actualiza tu información personal y de contacto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="55 1234 5678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Tipo de cuenta</Label>
                  <Input
                    id="role"
                    value={profileData.role === 'admin' ? 'Administrador' : profileData.role === 'owner' ? 'Dueño de negocio' : 'Cliente'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Cambiar Contraseña
              </CardTitle>
              <CardDescription>
                Actualiza tu contraseña para mantener tu cuenta segura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña actual</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  >
                    {showPasswords.current ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva contraseña</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Ingresa tu nueva contraseña"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirma tu nueva contraseña"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button 
                  onClick={handleSavePassword}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sesiones Activas
              </CardTitle>
              <CardDescription>
                Administra las sesiones activas en tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Navegador actual</p>
                    <p className="text-sm text-muted-foreground">Chrome en Windows • Activo ahora</p>
                  </div>
                  <Badge variant="secondary">Actual</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Móvil</p>
                    <p className="text-sm text-muted-foreground">Safari en iOS • Hace 2 horas</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferencias de Notificación
              </CardTitle>
              <CardDescription>
                Configura cómo y cuándo quieres recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Canales de comunicación</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones por email</p>
                    <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes en tu correo</p>
                  </div>
                  <Button
                    variant={notifications.emailNotifications ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotifications({ ...notifications, emailNotifications: !notifications.emailNotifications })}
                  >
                    {notifications.emailNotifications ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones SMS</p>
                    <p className="text-sm text-muted-foreground">Alertas urgentes por mensaje de texto</p>
                  </div>
                  <Button
                    variant={notifications.smsNotifications ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotifications({ ...notifications, smsNotifications: !notifications.smsNotifications })}
                  >
                    {notifications.smsNotifications ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones push</p>
                    <p className="text-sm text-muted-foreground">Notificaciones en tiempo real en el navegador</p>
                  </div>
                  <Button
                    variant={notifications.pushNotifications ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotifications({ ...notifications, pushNotifications: !notifications.pushNotifications })}
                  >
                    {notifications.pushNotifications ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Tipos de notificaciones</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nuevos pedidos</p>
                    <p className="text-sm text-muted-foreground">Cuando recibes un nuevo pedido</p>
                  </div>
                  <Button
                    variant={notifications.newOrders ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotifications({ ...notifications, newOrders: !notifications.newOrders })}
                  >
                    {notifications.newOrders ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reseñas de clientes</p>
                    <p className="text-sm text-muted-foreground">Cuando un cliente deja una reseña</p>
                  </div>
                  <Button
                    variant={notifications.customerReviews ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotifications({ ...notifications, customerReviews: !notifications.customerReviews })}
                  >
                    {notifications.customerReviews ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promociones y ofertas</p>
                    <p className="text-sm text-muted-foreground">Nuevas promociones y descuentos</p>
                  </div>
                  <Button
                    variant={notifications.promotions ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotifications({ ...notifications, promotions: !notifications.promotions })}
                  >
                    {notifications.promotions ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Actualizaciones del sistema</p>
                    <p className="text-sm text-muted-foreground">Mantenimiento y nuevas funciones</p>
                  </div>
                  <Button
                    variant={notifications.systemUpdates ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotifications({ ...notifications, systemUpdates: !notifications.systemUpdates })}
                  >
                    {notifications.systemUpdates ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button 
                  onClick={handleSaveNotifications}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Guardando...' : 'Guardar Preferencias'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacidad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Privacidad
              </CardTitle>
              <CardDescription>
                Controla quién puede ver tu información y cómo se usa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Visibilidad del perfil</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Visibilidad del perfil</p>
                    <p className="text-sm text-muted-foreground">Controla quién puede ver tu perfil</p>
                  </div>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                    <option value="contacts">Solo contactos</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar correo electrónico</p>
                    <p className="text-sm text-muted-foreground">Permite que otros vean tu email</p>
                  </div>
                  <Button
                    variant={privacy.showEmail ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPrivacy({ ...privacy, showEmail: !privacy.showEmail })}
                  >
                    {privacy.showEmail ? 'Visible' : 'Oculto'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar teléfono</p>
                    <p className="text-sm text-muted-foreground">Permite que otros vean tu teléfono</p>
                  </div>
                  <Button
                    variant={privacy.showPhone ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPrivacy({ ...privacy, showPhone: !privacy.showPhone })}
                  >
                    {privacy.showPhone ? 'Visible' : 'Oculto'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Permitir mensajes</p>
                    <p className="text-sm text-muted-foreground">Otros usuarios pueden enviarte mensajes</p>
                  </div>
                  <Button
                    variant={privacy.allowMessages ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPrivacy({ ...privacy, allowMessages: !privacy.allowMessages })}
                  >
                    {privacy.allowMessages ? 'Permitido' : 'Bloqueado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compartir datos</p>
                    <p className="text-sm text-muted-foreground">Compartir datos anónimos para mejorar el servicio</p>
                  </div>
                  <Button
                    variant={privacy.dataSharing ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPrivacy({ ...privacy, dataSharing: !privacy.dataSharing })}
                  >
                    {privacy.dataSharing ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button 
                  onClick={handleSavePrivacy}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Guardando...' : 'Guardar Configuración'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Exportar Datos
              </CardTitle>
              <CardDescription>
                Descarga una copia de toda tu información
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar datos del perfil
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar historial de pedidos
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar datos del negocio
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar todo (ZIP)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-4" />
                Eliminar Cuenta
              </CardTitle>
              <CardDescription>
                Elimina permanentemente tu cuenta y todos tus datos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <h4 className="font-medium text-destructive mb-2">Advertencia importante</h4>
                  <p className="text-sm text-muted-foreground">
                    Esta acción es irreversible. Se eliminarán permanentemente todos tus datos, 
                    incluyendo tu perfil, historial de pedidos, negocio y productos.
                  </p>
                </div>
                
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar mi cuenta permanentemente
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
