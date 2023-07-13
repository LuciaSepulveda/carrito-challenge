import { Dispatch, SetStateAction } from "react"
import { useCart, useGemas } from "../context/hooks"

interface Props {
  setShowCarrito: Dispatch<SetStateAction<boolean>>
}

export const HeaderComponent = ({ setShowCarrito }: Props) => {
  const gemas = useGemas()
  const cart = useCart()

  return (
    <div className="bg-stone-700 py-4 px-8 flex justify-between items-center sticky top-0 shadow-md z-10">
      <h1 className="text-white text-2xl font-bold">🧙‍♂️ Potion Shop</h1>
      <div className="flex gap-2 items-center">
        <img src="./gem.png" />
        <span>{gemas} Gemas</span>
      </div>
      <button
        onClick={() => setShowCarrito(true)}
        className="text-white hover:underline"
      >
        Ver Carrito ({cart?.totalItems || 0})
      </button>
    </div>
  )
}
