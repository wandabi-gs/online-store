import React from 'react'
import ProductMap from '../utils/ProductMap'
import { fetchAllProducts } from '../../query/product'
import { useQuery } from 'react-query'

function ProductList() {

  const { data: products, error, isLoading } = useQuery('allProducts', fetchAllProducts)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
        <ProductMap products={products} />
    </div>
  )
}

export default ProductList