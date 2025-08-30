export type ProductImage = {
   image: string | null
   altText: string | null
   isPrimary: boolean | null
}

export type Price = {
   id: string
   price_ht: number | null
   price_ttc: number | null
   discounted_price_ht: number | null
   discounted_price_ttc: number | null
   discount_amount: number | null
}

export type ProductVariant = {
   id: string
   name: string | null
   productId: string | null
   featured_image: string | null
   prices: Price[] | null
   images: ProductImage[] | null
}

export type ProductCharacteristicValue = {
   value: string | null
}

export type ProductCharacteristic = {
   characteristicId: string
   characteristicName: string
   valueId: string
   value: string
}

export type InventoryPerLocation = {
   availableQuantity?: number
   onHandQuantity: number
   location: {
     name: string
   }
}

export type ProductCategory = {
   slug: string
}

export interface RelatedProduct {
   id: string;
   slug: string;
   name: string;
   short_description?: string | null;
   status?: string | null;
   featured_image?: string | null;
   discount_rate?: number | null;
   prices?: {
     price_ttc: number | null;
     price_ht: number | null;
     discounted_price_ht: number | null;
     discounted_price_ttc: number | null;
     discount_amount: number | null;
   }[] | null;
   reviews?: Review[] | null;
}

export type Review = {
   rating: number
   username: string
   content: string
   is_confirmed: boolean
   created_at: string
}

export interface FacilityPaymentOption {
  monthly_payment: number;
  total_price_with_interest: number;
  period_months: number;
  facility_type: string;
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  facebook?: {
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogKeywords?: string;
    ogUrl?: string;
    ogType?: string;
  };
  twitter?: {
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogKeywords?: string;
    ogUrl?: string;
    ogType?: string;
  };
}

export interface CrossSellProduct {
   id: string;
   slug: string;
   name: string;
   featured_image?: string | null;
   prices?: {
     price_ttc: number | null;
     discounted_price_ttc: number | null;
   }[] | null;
   images?: {
     image: string | null;
     altText: string | null;
   }[] | null;
   reviews?: Review[] | null;
}

export type Product = {
   id: string
   slug: string
   name: string
   description?: string | null
   short_description?: string | null
   status?: string | null
   featured_image?: string | null
   discount_rate?: number | null
   has_variants: boolean | null
   sku: string | null
   barcode: string | null
   track_quantity: boolean | null
   display_magasin_availability: boolean | null
   images: ProductImage[] | null
   prices: Price[] | null
   variants: ProductVariant[] | null
   characteristics: ProductCharacteristic[] | null
   inventoryPerLocation: InventoryPerLocation[] | null
   categories: ProductCategory[]
   relatedProducts?: RelatedProduct[] | null;
   crossSellProducts?: CrossSellProduct[] | null;
   reviews?: Review[] | null
   facilityPaymentOptions?: FacilityPaymentOption[];
   seo?: ProductSEO;
   available_quantity?: number
}

export type ProductCard = Pick<
   Product,
   | "id"
   | "slug"
   | "name"
   | "short_description"
   | "status"
   | "featured_image"
   | "discount_rate"
   | "prices"
   | "inventoryPerLocation"
   | "available_quantity"
   | "reviews"
>