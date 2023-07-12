import { useCart } from "../context/hooks"

export const CarritoComponent = () => {
  const cart = useCart()
  return (
    <div>
      <button>Volver</button>
    </div>
  )
}
