'use client'

import Link from 'next/link'
import { Star, MapPin, ShoppingCart, Heart } from 'lucide-react'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  console.log('ProductCard rendered with product:', product)
  const { isAuthenticated } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  
  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
      {/* Discount badge */}
      {discount && (
        <div className="absolute left-2 top-2 z-10 rounded-md bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
          -{discount}%
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={() => isAuthenticated && setIsLiked(!isLiked)}
        className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors ${
          isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
        }`}
      >
        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
      </button>

      {/* Image */}
      <Link href={`/producto/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted">
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50 p-4">
          <div className="text-center">
            <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-muted-foreground/10" />
            <span className="text-xs text-muted-foreground">Imagen producto</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Business & Zone */}
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-primary">{product.businessName}</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {product.zoneName}
          </span>
        </div>

        {/* Title */}
        <Link href={`/producto/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-tight hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {product.categoryName}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <Button
          onClick={() => onAddToCart?.(product)}
          disabled={!isAuthenticated}
          className="mt-3 w-full gap-2"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          {isAuthenticated ? 'Agregar al carrito' : 'Inicia sesión'}
        </Button>
      </div>
    </div>
  )
}
