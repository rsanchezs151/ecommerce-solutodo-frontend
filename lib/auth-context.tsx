'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User, UserRole } from './types'
import { dummyUsers } from './dummy-data'

// Logger simple para desarrollo
const log = {
  info: (message: string, ...args: any[]) => console.log(`[Auth] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[Auth] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[Auth] ${message}`, ...args)
}

// Función para obtener el token de autenticación
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('zonalocal_token')
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  hasRole: (roles: UserRole[]) => boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
  role?: UserRole
  businessName?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('zonalocal_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('zonalocal_user')
      }
    }
    setIsLoading(false)
  }, [])

  // Función para encriptar el payload con AES
  const encryptPayload = async (data: any): Promise<string> => {
    try {
      // Generar clave aleatoria para esta sesión
      const key = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt']
      )
      
      // Exportar la clave a base64
      const exportedKey = await crypto.subtle.exportKey('raw', key)
      const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(exportedKey)))
      
      // Encriptar los datos
      const encoder = new TextEncoder()
      const dataBuffer = encoder.encode(JSON.stringify(data))
      
      const iv = crypto.getRandomValues(new Uint8Array(12))
      const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        dataBuffer
      )
      
      // Combinar IV + datos encriptados
      const combined = new Uint8Array(iv.length + encryptedData.byteLength)
      combined.set(iv)
      combined.set(new Uint8Array(encryptedData), iv.length)
      
      // Convertir a base64
      const encryptedBase64 = btoa(String.fromCharCode(...combined))
      
      // Retornar clave + datos encriptados
      return JSON.stringify({
        key: keyBase64,
        data: encryptedBase64
      })
    } catch (error) {
      console.error('Error encrypting payload:', error)
      throw error
    }
  }

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      log.info('Login attempt for user: {}', email)
      
      // Encriptar el payload ANTES de enviarlo
      const encryptedPayload = await encryptPayload({ email, password })
      
      const response = await fetch('http://localhost:8443/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: encryptedPayload, // Payload ya encriptado
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      const data = await response.json()
      
      if (data.accessToken || data.token) {
        const token = data.accessToken || data.token
        const user: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.firstName + ' ' + data.user.lastName,
          role: data.user.role.toLowerCase(),
          createdAt: new Date().toISOString()
        }
        
        setUser(user)
        localStorage.setItem('zonalocal_user', JSON.stringify(user))
        localStorage.setItem('zonalocal_token', token)
        setIsLoading(false)
        return { success: true }
      } else {
        setIsLoading(false)
        return { success: false, error: 'Credenciales incorrectas' }
      }
      
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return { success: false, error: 'Error de conexión con el servidor' }
    }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if email already exists
    const existingUser = dummyUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase())
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: 'Este correo ya está registrado' }
    }
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role || 'customer',
      phone: data.phone,
      createdAt: new Date().toISOString()
    }
    
    setUser(newUser)
    localStorage.setItem('zonalocal_user', JSON.stringify(newUser))
    setIsLoading(false)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('zonalocal_user')
  }, [])

  const hasRole = useCallback((roles: UserRole[]) => {
    if (!user) return false
    return roles.includes(user.role)
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
