import React from "react"
import Context, { PropsContext } from "./context"

export const useCart = (): PropsContext["state"]["cart"] => {
  const {
    state: { cart },
  } = React.useContext(Context)

  return cart
}

export const useGemas = (): PropsContext["state"]["gemas"] => {
  const {
    state: { gemas },
  } = React.useContext(Context)

  return gemas
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

export const useRestart = (): PropsContext["actions"]["restart"] => {
  const {
    actions: { restart },
  } = React.useContext(Context)

  return restart
}
