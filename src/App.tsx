import { useEffect, useState } from "react"
import { CarritoComponent } from "./components/CarritoComponent"
import { HeaderComponent } from "./components/HeaderComponent"
import { ListadoProductosComponent } from "./components/ListadoProductosComponent"
import { Product } from "./types"

function App() {
  const [showCarrito, setShowCarrito] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div
      className="min-h-full bg-fixed"
      style={{ backgroundImage: "url(background.webp)" }}
    >
      <HeaderComponent />
      <div className="flex justify-center min-h-full">
        <div className="max-w-lg w-full py-16">
          {showCarrito ? <CarritoComponent /> : <ListadoProductosComponent products={products} />}
        </div>
      </div>
    </div>
  )
}

export default App
