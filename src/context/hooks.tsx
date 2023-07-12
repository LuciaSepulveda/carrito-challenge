import React from "react"
import Context, { PropsContext } from "./context"

export const useCart = (): PropsContext["state"]["cart"] => {
  const {
    state: { cart },
  } = React.useContext(Context)

  return cart
}

export const useAddToCart = (): PropsContext["actions"]["addToCart"] => {
  const {
    actions: { addToCart },
  } = React.useContext(Context)

  return addToCart
}

export const useRemoveFromCart =
  (): PropsContext["actions"]["removeFromCart"] => {
    const {
      actions: { removeFromCart },
    } = React.useContext(Context)

    return removeFromCart
  }
