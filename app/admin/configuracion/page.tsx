'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  Settings,
  Shield,
  Bell,
  Palette,
  Globe,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Users,
  Store,
  Package,
  BarChart3,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export default function AdminConfiguracionPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Mi Ecommerce',
    siteDescription: 'Plataforma de comercio local',
    contactEmail: 'admin@mi-ecommerce.com',
    contactPhone: '55 1234 5678',
    address: 'Ciudad de México, CDMX',
    maintenanceMode: false,
    allowRegistration: true,
    requireApproval: false
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newBusinessAlerts: true,
    newUserAlerts: true,
    systemAlerts: true,
    weeklyReports: true
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPassword: true,
    autoLogout: true
  })

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    darkMode: false,
    compactMode: false,
    showAnimations: true
  })

  const handleSaveGeneral = async () => {
    setIsLoading(true)
    setSaveMessage('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setSaveMessage('Configuración general guardada correctamente')
    
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

  const handleSaveSecurity = async () => {
    setIsLoading(true)
    setSaveMessage('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setSaveMessage('Configuración de seguridad actualizada')
    
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleSaveAppearance = async () => {
    setIsLoading(true)
    setSaveMessage('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setSaveMessage('Apariencia actualizada correctamente')
    
    setTimeout(() => setSaveMessage(''), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground">Administra la configuración general de la plataforma</p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          saveMessage.includes('error') || saveMessage.includes('incorrectamente')
            ? 'bg-destructive/10 text-destructive'
            : 'bg-green-500/10 text-green-600'
        }`}>
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">{saveMessage}</span>
        </div>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="data">Datos</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del sitio</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    placeholder="Mi Ecommerce"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de contacto</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                    placeholder="admin@ejemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono de contacto</Label>
                  <Input
                    id="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                    placeholder="55 1234 5678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                    placeholder="Ciudad de México, CDMX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descripción del sitio</Label>
                <Input
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  placeholder="Plataforma de comercio local"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Configuración del Sistema</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Modo mantenimiento</p>
                    <p className="text-sm text-muted-foreground">Desactiva el sitio para los usuarios</p>
                  </div>
                  <Button
                    variant={generalSettings.maintenanceMode ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGeneralSettings({ ...generalSettings, maintenanceMode: !generalSettings.maintenanceMode })}
                  >
                    {generalSettings.maintenanceMode ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Permitir registro</p>
                    <p className="text-sm text-muted-foreground">Permite que nuevos usuarios se registren</p>
                  </div>
                  <Button
                    variant={generalSettings.allowRegistration ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGeneralSettings({ ...generalSettings, allowRegistration: !generalSettings.allowRegistration })}
                  >
                    {generalSettings.allowRegistration ? 'Permitido' : 'Bloqueado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Requerir aprobación</p>
                    <p className="text-sm text-muted-foreground">Los nuevos negocios requieren aprobación</p>
                  </div>
                  <Button
                    variant={generalSettings.requireApproval ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGeneralSettings({ ...generalSettings, requireApproval: !generalSettings.requireApproval })}
                  >
                    {generalSettings.requireApproval ? 'Requerido' : 'Opcional'}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button 
                  onClick={handleSaveGeneral}
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

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configuración de Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Canales de comunicación</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones por email</p>
                    <p className="text-sm text-muted-foreground">Envía alertas importantes por correo</p>
                  </div>
                  <Button
                    variant={notificationSettings.emailNotifications ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({ ...notificationSettings, emailNotifications: !notificationSettings.emailNotifications })}
                  >
                    {notificationSettings.emailNotifications ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones SMS</p>
                    <p className="text-sm text-muted-foreground">Alertas urgentes por mensaje de texto</p>
                  </div>
                  <Button
                    variant={notificationSettings.smsNotifications ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({ ...notificationSettings, smsNotifications: !notificationSettings.smsNotifications })}
                  >
                    {notificationSettings.smsNotifications ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones push</p>
                    <p className="text-sm text-muted-foreground">Notificaciones en tiempo real</p>
                  </div>
                  <Button
                    variant={notificationSettings.pushNotifications ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({ ...notificationSettings, pushNotifications: !notificationSettings.pushNotifications })}
                  >
                    {notificationSettings.pushNotifications ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Tipos de notificaciones</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de nuevos negocios</p>
                    <p className="text-sm text-muted-foreground">Cuando se registra un nuevo negocio</p>
                  </div>
                  <Button
                    variant={notificationSettings.newBusinessAlerts ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({ ...notificationSettings, newBusinessAlerts: !notificationSettings.newBusinessAlerts })}
                  >
                    {notificationSettings.newBusinessAlerts ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de nuevos usuarios</p>
                    <p className="text-sm text-muted-foreground">Cuando se registra un nuevo usuario</p>
                  </div>
                  <Button
                    variant={notificationSettings.newUserAlerts ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({ ...notificationSettings, newUserAlerts: !notificationSettings.newUserAlerts })}
                  >
                    {notificationSettings.newUserAlerts ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas del sistema</p>
                    <p className="text-sm text-muted-foreground">Errores y eventos importantes</p>
                  </div>
                  <Button
                    variant={notificationSettings.systemAlerts ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({ ...notificationSettings, systemAlerts: !notificationSettings.systemAlerts })}
                  >
                    {notificationSettings.systemAlerts ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reportes semanales</p>
                    <p className="text-sm text-muted-foreground">Resumen semanal de actividad</p>
                  </div>
                  <Button
                    variant={notificationSettings.weeklyReports ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({ ...notificationSettings, weeklyReports: !notificationSettings.weeklyReports })}
                  >
                    {notificationSettings.weeklyReports ? 'Activado' : 'Desactivado'}
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

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Autenticación</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticación de dos factores</p>
                    <p className="text-sm text-muted-foreground">Requiere 2FA para todos los usuarios</p>
                  </div>
                  <Button
                    variant={securitySettings.twoFactorAuth ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
                  >
                    {securitySettings.twoFactorAuth ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tiempo de sesión (minutos)</p>
                    <p className="text-sm text-muted-foreground">Duración máxima de la sesión</p>
                  </div>
                  <Input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) || 30 })}
                    className="w-20"
                    min="5"
                    max="120"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Intentos máximos de login</p>
                    <p className="text-sm text-muted-foreground">Bloquea después de N intentos fallidos</p>
                  </div>
                  <Input
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(e.target.value) || 5 })}
                    className="w-20"
                    min="3"
                    max="10"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Longitud mínima de contraseña</p>
                    <p className="text-sm text-muted-foreground">Mínimo de caracteres requeridos</p>
                  </div>
                  <Input
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: parseInt(e.target.value) || 8 })}
                    className="w-20"
                    min="6"
                    max="20"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contraseña segura requerida</p>
                    <p className="text-sm text-muted-foreground">Exige mayúsculas, números y símbolos</p>
                  </div>
                  <Button
                    variant={securitySettings.requireStrongPassword ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSecuritySettings({ ...securitySettings, requireStrongPassword: !securitySettings.requireStrongPassword })}
                  >
                    {securitySettings.requireStrongPassword ? 'Requerido' : 'Opcional'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cerrar sesión automáticamente</p>
                    <p className="text-sm text-muted-foreground">Cierra sesión por inactividad</p>
                  </div>
                  <Button
                    variant={securitySettings.autoLogout ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSecuritySettings({ ...securitySettings, autoLogout: !securitySettings.autoLogout })}
                  >
                    {securitySettings.autoLogout ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button 
                  onClick={handleSaveSecurity}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Guardando...' : 'Guardar Seguridad'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Apariencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Colores</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Color primario</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                        className="w-12 h-12"
                      />
                      <Input
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Color secundario</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })}
                        className="w-12 h-12"
                      />
                      <Input
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })}
                        placeholder="#64748b"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Modo de visualización</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Modo oscuro</p>
                    <p className="text-sm text-muted-foreground">Usa tema oscuro para la interfaz</p>
                  </div>
                  <Button
                    variant={appearanceSettings.darkMode ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAppearanceSettings({ ...appearanceSettings, darkMode: !appearanceSettings.darkMode })}
                  >
                    {appearanceSettings.darkMode ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Modo compacto</p>
                    <p className="text-sm text-muted-foreground">Reduce el espaciado entre elementos</p>
                  </div>
                  <Button
                    variant={appearanceSettings.compactMode ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAppearanceSettings({ ...appearanceSettings, compactMode: !appearanceSettings.compactMode })}
                  >
                    {appearanceSettings.compactMode ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Animaciones</p>
                    <p className="text-sm text-muted-foreground">Muestra animaciones y transiciones</p>
                  </div>
                  <Button
                    variant={appearanceSettings.showAnimations ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAppearanceSettings({ ...appearanceSettings, showAnimations: !appearanceSettings.showAnimations })}
                  >
                    {appearanceSettings.showAnimations ? 'Activadas' : 'Desactivadas'}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button 
                  onClick={handleSaveAppearance}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Guardando...' : 'Guardar Apariencia'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Gestión de Datos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Exportación de datos</h3>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar usuarios
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar negocios
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar productos
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar categorías
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar zonas
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar todo (CSV)
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Respaldo y restauración</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Crear respaldo completo
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Restaurar desde respaldo
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-destructive">Acciones peligrosas</h3>
                
                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-destructive">Limpiar datos antiguos</h4>
                      <p className="text-sm text-muted-foreground">
                        Elimina registros inactivos de más de 1 año
                      </p>
                    </div>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Limpiar Datos Antiguos
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-destructive">Restablecer plataforma</h4>
                      <p className="text-sm text-muted-foreground">
                        Elimina todos los datos excepto usuarios admin
                      </p>
                    </div>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Restablecer Plataforma
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
