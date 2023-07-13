import { useAddToCart, useCart, useGemas } from "../context/hooks"
import { Product } from "../types"

interface Props {
  products: Product[]
}

export const ListadoProductosComponent = ({ products }: Props) => {
  const cart = useCart()
  const addToCart = useAddToCart()
  const gemas = useGemas()

  return (
    <div className="w-full flex flex-row flex-wrap gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative bg-stone-700 h-72 w-60 flex flex-col justify-between p-8 rounded-xl border border-stone-700 hover:border-purple-700"
        >
          <p className="top-4 right-4 absolute bg-green-600 w-fit px-3 py-0.5 rounded-2xl text-xs self-end">
            {product.precio} Gema
          </p>
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-20 self-center -mt-1"
          />
          <div>
            <p className="font-semibold mt-2">{product.nombre}</p>
            <p className="text-slate-500 text-sm">{product.descripcion}</p>
          </div>
          <button
            className="w-full bg-purple-700 text-white py-1 rounded-xl hover:scale-105 transition-all disabled:hover:scale-100 disabled:bg-stone-500"
            disabled={
              cart?.items !== undefined &&
              (cart?.items.find(
                (elem: Product) =>
                  elem.id === product.id || elem.categoria === product.categoria
              ) !== undefined ||
                product.precio > gemas)
            }
            onClick={() => addToCart(product)}
          >
            Agregar
          </button>
        </div>
      ))}
    </div>
  )
}
