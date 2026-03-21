// API Service - Prepared for real API integration
// Currently uses dummy data, but structured for easy API migration

import type { Product, Business, Category, Zone, Promotion, ProductFilters } from './types'
import { dummyProducts, dummyBusinesses, dummyCategories, dummyZones, dummyPromotions, getCategoriesTree, getFeaturedProducts } from './dummy-data'



// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Product API
export const productApi = {
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    await delay(300)
    let result = [...dummyProducts].filter(p => p.isActive)
    
    if (filters?.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      )
    }
    
    if (filters?.categoryId) {
      // Include subcategories
      const categoryIds = [filters.categoryId]
      dummyCategories.forEach(c => {
        if (c.parentId === filters.categoryId) {
          categoryIds.push(c.id)
          dummyCategories.forEach(sub => {
            if (sub.parentId === c.id) categoryIds.push(sub.id)
          })
        }
      })
      result = result.filter(p => categoryIds.includes(p.categoryId))
    }
    
    if (filters?.zoneId) {
      result = result.filter(p => p.zoneId === filters.zoneId)
    }
    
    if (filters?.businessId) {
      result = result.filter(p => p.businessId === filters.businessId)
    }
    
    if (filters?.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice!)
    }
    
    if (filters?.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice!)
    }
    
    // Sorting
    switch (filters?.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }
    
    return result
  },
  
  async getById(id: string): Promise<Product | null> {
    await delay(200)
    return dummyProducts.find(p => p.id === id) || null
  },
  
  async getBySlug(slug: string): Promise<Product | null> {
    await delay(200)
    return dummyProducts.find(p => p.slug === slug) || null
  },
  
  async getFeatured(): Promise<Product[]> {
    await delay(200)
    return getFeaturedProducts()
  },
  
  async getByBusiness(businessId: string): Promise<Product[]> {
    await delay(200)
    return dummyProducts.filter(p => p.businessId === businessId && p.isActive)
  },
  
  // Owner methods
  async create(product: Omit<Product, 'id' | 'slug' | 'createdAt' | 'rating' | 'reviewCount'>): Promise<Product> {
    await delay(500)
    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
      rating: 0,
      reviewCount: 0
    }
    // In real API, this would POST to server
    return newProduct
  },
  
  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    await delay(400)
    const product = dummyProducts.find(p => p.id === id)
    if (!product) return null
    // In real API, this would PATCH to server
    return { ...product, ...data }
  },
  
  async delete(id: string): Promise<boolean> {
    await delay(300)
    // In real API, this would DELETE on server
    return true
  }
}

// Business API
export const businessApi = {
  async getAll(): Promise<Business[]> {
    await delay(300)
    return dummyBusinesses.filter(b => b.isActive)
  },
  
  async getById(id: string): Promise<Business | null> {
    await delay(200)
    return dummyBusinesses.find(b => b.id === id) || null
  },
  
  async getBySlug(slug: string): Promise<Business | null> {
    await delay(200)
    return dummyBusinesses.find(b => b.slug === slug) || null
  },
  
  async getByOwner(ownerId: string): Promise<Business | null> {
    await delay(200)
    return dummyBusinesses.find(b => b.ownerId === ownerId) || null
  },
  
  async getByZone(zoneId: string): Promise<Business[]> {
    await delay(200)
    return dummyBusinesses.filter(b => b.zoneId === zoneId && b.isActive)
  },
  
  async update(id: string, data: Partial<Business>): Promise<Business | null> {
    await delay(400)
    const business = dummyBusinesses.find(b => b.id === id)
    if (!business) return null
    return { ...business, ...data }
  }
}

// Category API
export const categoryApi = {
  async getAll(): Promise<Category[]> {
    await delay(200)
    return dummyCategories
  },
  
  async getTree(): Promise<Category[]> {
    await delay(200)
    return getCategoriesTree()
  },
  
  async getById(id: string): Promise<Category | null> {
    await delay(100)
    return dummyCategories.find(c => c.id === id) || null
  },
  
  // Admin only
  async create(category: Omit<Category, 'id'>): Promise<Category> {
    await delay(400)
    const newCategory: Category = {
      ...category,
      id: `c${Date.now()}`
    }
    return newCategory
  },
  
  async update(id: string, data: Partial<Category>): Promise<Category | null> {
    await delay(300)
    const category = dummyCategories.find(c => c.id === id)
    if (!category) return null
    return { ...category, ...data }
  },
  
  async delete(id: string): Promise<boolean> {
    await delay(300)
    return true
  }
}

// Zone API
export const zoneApi = {
  async getAll(): Promise<Zone[]> {
    await delay(200)
    return dummyZones
  },
  
  async getById(id: string): Promise<Zone | null> {
    await delay(100)
    return dummyZones.find(z => z.id === id) || null
  }
}

// Promotion API
export const promotionApi = {
  async getAll(): Promise<Promotion[]> {
    await delay(200)
    return dummyPromotions.filter(p => p.isActive)
  },
  
  async getByBusiness(businessId: string): Promise<Promotion[]> {
    await delay(200)
    return dummyPromotions.filter(p => p.businessId === businessId)
  },
  
  async create(promotion: Omit<Promotion, 'id'>): Promise<Promotion> {
    await delay(400)
    const newPromotion: Promotion = {
      ...promotion,
      id: `promo${Date.now()}`
    }
    return newPromotion
  },
  
  async update(id: string, data: Partial<Promotion>): Promise<Promotion | null> {
    await delay(300)
    const promotion = dummyPromotions.find(p => p.id === id)
    if (!promotion) return null
    return { ...promotion, ...data }
  },
  
  async delete(id: string): Promise<boolean> {
    await delay(300)
    return true
  }
}

// Stats API for dashboards
export const statsApi = {
  async getOwnerStats(businessId: string) {
    await delay(300)
    const businessProducts = dummyProducts.filter(p => p.businessId === businessId)
    return {
      totalProducts: businessProducts.length,
      activeProducts: businessProducts.filter(p => p.isActive).length,
      totalViews: Math.floor(Math.random() * 10000) + 1000,
      totalSales: Math.floor(Math.random() * 500) + 50,
      revenue: Math.floor(Math.random() * 100000) + 10000,
      rating: dummyBusinesses.find(b => b.id === businessId)?.rating || 0
    }
  },
  
  async getAdminStats() {
    await delay(300)
    return {
      totalBusinesses: dummyBusinesses.length,
      activeBusinesses: dummyBusinesses.filter(b => b.isActive).length,
      totalProducts: dummyProducts.length,
      activeProducts: dummyProducts.filter(p => p.isActive).length,
      totalZones: dummyZones.length,
      totalCategories: dummyCategories.length,
      totalUsers: 1234,
      totalOrders: 5678,
      monthlyRevenue: 456789
    }
  }
}
