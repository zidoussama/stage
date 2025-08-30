import { ProductCard } from "./product"



export type TemplateSettings = {
   logo: string | null
   fav_icon: string | null
   movingAdDisplay?: {
      banner_color: string | null
      ad_text: string | null
      button_text: string | null
      button_color: string | null
      link: string | null
   }
   eventPage?: {
      name: string | null
      banner_1: string | null
      banner_2: string | null
      products: Array<{
         id: string
         slug: string
         name: string
         description: string | null
         status: string
         featured_image: string | null
         discount_rate: number | null
         prices: {
            price_ttc: number | null
            price_ht: number | null
            discounted_price_ht: number | null
            discounted_price_ttc: number | null
            discount_amount: number | null
         }
      }>
      categories: Array<{
         id: string
         name: string
         image: string | null
         slug: string
      }>
   }
   bannerProducts?: {
      name: string | null
      products: ProductCard[]
   }
   sliderImages?: Array<{
      id: string | null
      image: string | null
      alternativeText: string | null
   }>
   show_moving_ad_display?: boolean | null
   specificImages?: Array<{
      name: string | null
      image: string | null
      hasButton: boolean | null
      buttonLink: string | null
      buttonText: string | null
   }>
   reviews?: Array<{
      username: string
      rating: number
      title: string
      content: string
      city: string
      country: string
      image: string | null
   }>
   homePageSales?: Array<SalesSection>
   produitTendance?: {
      name: string | null
      showProduitTendance: boolean | null
      products: ProductCard[]
   }[]
   dispalay_categories_home: boolean
   categoryNames?: Array<{
      category: CategoryWithChildren
   }>
   banners?: Array<{
      id: string
      image: string | null
      button_title: string | null
   }>
   bestSellingProducts?: BestSellingProduct[]
   recommendedCrossSellProducts?: RecommendedCrossSellProduct[]
}

export type SalesSection = {
   name?: string | null
   showHomepageSale?: boolean | null
   position?: number | null
   groups?: Array<{
      groupe: string | null
      products: ProductCard[]
   }>
}

export type Category = {
   id: string
   name: string
   slug: string
   image: string
   is_active: boolean
   caisse_icon: string
   hasChildren: boolean
   level: number
   position?: number
   productCount?: number
   children?: Category[]
}

export type CategoryWithChildren = {
   id: string
   name: string
   image: string | null
   slug: string
   productCount?: number
   children: Array<{
      image: string | null
      name: string
      slug: string
      productCount?: number
   }>
}

export interface Brand {
  id: string
  name: string
  description: string
  logo: string
  is_active: boolean
}

export type Characteristic = {
   id: string
   name: string
   values: {
      id: string
      value: string
   }[]
}

export interface AttributeValue {
   id: number;
   actualValue: string;
   colorName: string | null;
 }
 
 // Define structure for a complete attribute
 export interface AttributeData {
   id: number;
   name: string;
   type: string;
   selectedValue: AttributeValue | null;
}

export interface ProductAttributes {
   colorAttribute?: AttributeData;
   storageAttribute?: AttributeData;
   variantId?: string | number;
   [key: string]: AttributeData | undefined | string | number;
 }

//TODO! delete this type when products fetched
export type Product = {
   id: string
   name: string
   slug?: string;
   /* color: string */
   quantity: number
   price: number
   image: string
   attributes?: ProductAttributes;
}

export type GraphQlReq<T> = { data: T }

export type BestSellingProduct = {
  product: {
    name: string
    slug: string
    images?: Array<{
      image: string
    }>
    featured_image: string | null
    show_reviews: boolean
    reviews: Array<{
      id: string
      rating: number
    }>
    prices: Array<{
      id: string
      price_ttc: number | null
    }>
  }
}

export type RecommendedCrossSellProduct = {
  id: string
  name: string
  slug: string
  featured_image: string
  prices: {
    price_ttc: number | null
    discounted_price_ttc: number | null
  }
}
