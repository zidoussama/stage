import { useState, useEffect } from 'react';
import { Product } from '@/types/product'; // Adjust the import path based on your project structure

const useProductData = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [uniqueGenres, setUniqueGenres] = useState<string[]>([]);
  const [uniqueSkinTypes, setUniqueSkinTypes] = useState<string[]>([]);
  const [uniqueConcerns, setUniqueConcerns] = useState<string[]>([]);
  const [uniqueIngredients, setUniqueIngredients] = useState<string[]>([]);
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProductData(data);

        // Extract unique values
        const genres = new Set<string>();
        const skinTypes = new Set<string>();
        const concerns = new Set<string>();
        const ingredients = new Set<string>();
        const sizes = new Set<string>();

        data.forEach(product => {
          if (product.genre) genres.add(product.genre);
          product.typedepeau?.forEach(type => skinTypes.add(type));
          product.concern?.forEach(c => concerns.add(c));
          product.ingredients?.forEach(ingredient => ingredients.add(ingredient));
          if (product.size) sizes.add(product.size);
        });

        setUniqueGenres(Array.from(genres));
        setUniqueSkinTypes(Array.from(skinTypes));
        setUniqueConcerns(Array.from(concerns));
        setUniqueIngredients(Array.from(ingredients));
        setUniqueSizes(Array.from(sizes));
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    productData,
    uniqueGenres,
    uniqueSkinTypes,
    uniqueConcerns,
    uniqueIngredients,
    uniqueSizes,
    loading,
    error,
  };
};

export default useProductData;
