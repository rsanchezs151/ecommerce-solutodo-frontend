// User types
export type UserRole = 'admin' | 'owner' | 'customer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  createdAt: string
  businessId?: string // For owners
  isActive?: boolean // For admin control
}

// Location types
export interface Zone {
  id: string
  name: string
  slug: string
  parentId?: string
  estado: string
  codigoPostal: string
}

// Category types (up to 3 levels)
export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  parentId?: string
  level: 1 | 2 | 3
  children?: Category[]
}

// Business types
export type BusinessDayHours = 
  | { open: string; close: string; closed?: false }
  | { closed: true }

export interface BusinessHours {
  monday: BusinessDayHours
  tuesday: BusinessDayHours
  wednesday: BusinessDayHours
  thursday: BusinessDayHours
  friday: BusinessDayHours
  saturday: BusinessDayHours
  sunday: BusinessDayHours
}

export interface Business {
  id: string
  name: string
  slug: string
  description: string
  logo?: string
  coverImage?: string
  ownerId: string
  zoneId: string
  zoneName: string
  address: string
  phone: string
  email: string
  categoryIds: string[]
  rating: number
  reviewCount: number
  isActive: boolean
  createdAt: string
  location: {
    lat: number
    lng: number
  }
  businessHours?: BusinessHours
}

// Product types
export interface ProductAttribute {
  name: string
  value: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  categoryId: string
  categoryName: string
  businessId: string
  businessName: string
  zoneId: string
  zoneName: string
  attributes: ProductAttribute[]
  stock: number
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  rating: number
  reviewCount: number
}

// Promotion types
export interface Promotion {
  id: string
  title: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  businessId: string
  productIds?: string[] // Empty means applies to all products
  startDate: string
  endDate: string
  isActive: boolean
  bannerImage?: string
}

// Cart types
export interface CartItem {
  productId: string
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

// Filter types
export interface ProductFilters {
  search?: string
  categoryId?: string
  zoneId?: string
  businessId?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'rating'
}
