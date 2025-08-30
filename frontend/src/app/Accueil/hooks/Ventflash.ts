"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/Accueil/types/accueil";

/**
 * @param stateFilter Optional product.state value to filter by (case-insensitive).
 */
export const useProducts = (stateFilter?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await res.json();

        let filteredProducts = data;
        if (stateFilter) {
          filteredProducts = data.filter(
            (product) =>
              product.state?.toLowerCase() === stateFilter.toLowerCase()
          );
        }

        setProducts(filteredProducts);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [stateFilter]);

  return { products, loading, error };
};
