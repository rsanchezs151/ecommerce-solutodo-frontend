'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User, UserRole } from './types'
import { dummyUsers } from './dummy-data'

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

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Demo login - in production this would call an API
    const foundUser = dummyUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (foundUser && password.length >= 6) {
      setUser(foundUser)
      localStorage.setItem('zonalocal_user', JSON.stringify(foundUser))
      setIsLoading(false)
      return { success: true }
    }
    
    // Allow any login for demo with password "demo123"
    if (password === 'demo123') {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: 'customer',
        createdAt: new Date().toISOString()
      }
      setUser(newUser)
      localStorage.setItem('zonalocal_user', JSON.stringify(newUser))
      setIsLoading(false)
      return { success: true }
    }
    
    setIsLoading(false)
    return { success: false, error: 'Credenciales incorrectas. Usa "demo123" como contraseña para probar.' }
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
