import { Product } from "../types"

interface Props {
  products: Product[]
}

export const ListadoProductosComponent = ({ products }: Props) => {
  return (
    <div>
      <span>ListadoProductosComponent</span>
      {products.map((product) => (
        <div>
          {product.id}
          {product.nombre}
        </div>
      ))}
    </div>
  )
}
