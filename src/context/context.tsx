import { createContext, useEffect, useState } from "react"
import { Cart, Product } from "../types"

export interface PropsContext {
  state: {
    cart: Cart | undefined
    gemas: number
  }
  actions: {
    addToCart: (product: Product) => void
    removeFromCart: (product: Product) => void
  }
}

const Context = createContext({} as PropsContext)

const Provider = ({ children }: any) => {
  const [cart, setCart] = useState<Cart | undefined>()
  const [gemas, setGemas] = useState<number>(3)

  useEffect(() => {
    if (localStorage.getItem("cart") !== "{}") {
      const cartAux = JSON.parse(localStorage.getItem("cart") || "{}")
      setCart(cartAux)
      setGemas(cartAux?.total !== undefined ? gemas - cartAux.total : gemas)
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    setCart((prevState) => ({
      total:
        prevState?.total !== undefined
          ? prevState?.total + product.precio
          : product.precio,
      totalItems:
        prevState?.totalItems !== undefined ? prevState?.totalItems + 1 : 1,
      items: prevState?.items ? [...prevState.items, product] : [product],
    }))
    setGemas(gemas - product.precio)
  }

  const handleRemoveFromCart = (product: Product) => {
    setCart((prevState) => ({
      total:
        prevState?.total !== undefined ? prevState?.total - product.precio : 0,
      totalItems:
        prevState?.totalItems !== undefined ? prevState.totalItems - 1 : 0,
      items: prevState?.items
        ? prevState.items.filter((prod) => prod.id === product.id)
        : [],
    }))
    setGemas(gemas + product.precio)
  }

  useEffect(() => {
    localStorage.setItem(
      "cart",
      cart !== undefined ? JSON.stringify(cart) : JSON.stringify({})
    )
  }, [cart])

  const state: PropsContext["state"] = {
    cart,
    gemas,
  }

  const actions = {
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
  }

  return (
    <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
  )
}

export { Context as default, Provider }
