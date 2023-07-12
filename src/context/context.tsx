import { createContext, useEffect, useState } from "react"
import { Cart, Product } from "../types"

export interface PropsContext {
  state: {
    cart: Cart | undefined
  }
  actions: {
    addToCart: (product: Product) => void
    removeFromCart: (product: Product) => void
  }
}

const Context = createContext({} as PropsContext)

const Provider = ({ children }: any) => {
  const [cart, setCart] = useState<Cart | undefined>()

  useEffect(() => {
    if (localStorage.getItem("cart") !== "{}") {
      setCart(JSON.parse(localStorage.getItem("cart") || '{}'))
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
  }

  useEffect(() => {
    localStorage.setItem(
      "cart",
      cart !== undefined ? JSON.stringify(cart) : JSON.stringify({})
    )
  }, [cart])

  const state: PropsContext["state"] = {
    cart,
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
