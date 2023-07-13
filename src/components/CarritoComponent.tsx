import { Dispatch, SetStateAction, useState } from "react"
import { useCart, useRemoveFromCart, useRestart } from "../context/hooks"
import { Cart, Product } from "../types"

interface Props {
  setShowCarrito: Dispatch<SetStateAction<boolean>>
}

export const CarritoComponent = ({ setShowCarrito }: Props) => {
  const cart = useCart()
  const removeFromCart = useRemoveFromCart()
  const restart = useRestart()
  const [ready, setReady] = useState<boolean>(false)

  const buyFunction = (cart: Cart | undefined) => {
    fetch("http://localhost:3001/compras", {
      method: "POST",
      body: JSON.stringify({
        itemsId: cart?.items.map((product) => product.id),
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(() => {
        setReady(true)
        restart()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <button
        className="w-fit bg-purple-700 text-white py-1 px-2 rounded-xl text-sm"
        onClick={() => setShowCarrito(false)}
      >
        Volver
      </button>
      <div className="flex flex-col w-full bg-stone-700 mt-6">
        {cart?.items?.map((product: Product) => (
          <div
            className="flex flex-row py-2 px-3 justify-between items-center border-b-2 border-stone-500"
            key={product.id}
          >
            <img
              className="rounded-full bg-stone-500 p-0.5"
              src={product.imagen}
              alt={product.nombre}
            />
            <p>{product.nombre}</p>
            <button
              className="text-stone-500 font-medium"
              onClick={() => removeFromCart(product)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <p className="text-white">{ready ? "Compra realizada!" : ""}</p>
      <button
        className="mt-6 w-full bg-purple-700 text-white py-1 px-2 rounded-xl text-sm disabled:bg-stone-500"
        disabled={cart?.items === undefined || cart?.items.length === 0}
        onClick={() => buyFunction(cart)}
      >
        Comprar
      </button>
    </div>
  )
}
