import { createContext, useEffect, useState } from "react"

// Definição das propriedades do produto
export type ProductProps = {
	id: number
	name: string
	price: number
	img: string
	description: string
	stock: number // Quantidade do produto (estoque)
}

// Definição das propriedades do item no carrinho
type CartItemProps = {
	id: number
	quantity: number // Quantidade de itens adicionados ao carrinho
	price: number
	data: ProductProps
}

type CartProps = CartItemProps[]

// Definição do tipo de contexto do carrinho
type CartContextType = {
	cart: CartProps
	addToCart: (product: ProductProps) => void
	removeFromCart: (id: number) => void
	decreaseQuantity: (id: number) => void
}

// Criação do contexto do carrinho
export const CartContext = createContext<CartContextType | undefined>(undefined)

// Provedor do contexto do carrinho
export const CartProvider = ({ children }: React.PropsWithChildren) => {
	// Estado do carrinho com dados salvos no localStorage
	const [cart, setCart] = useState<CartProps>(() => {
		const storedCart = localStorage.getItem("cart")
		return storedCart ? JSON.parse(storedCart) : []
	})

	// Atualiza o localStorage sempre que o carrinho mudar
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart))
	}, [cart])

	const addToCart = (product: ProductProps) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === product.id)

			if (existingItem) {
				// Atualiza a quantidade e retorna o carrinho atualizado
				return prevCart.map((item) =>
					item.id === product.id
						? {
								...item,
								quantity: item.quantity + 1,
						  }
						: item,
				)
			} else {
				// Adiciona novo item ao carrinho
				return [...prevCart, { id: product.id, quantity: 1, price: product.price, data: product }]
			}
		})
	}

	const decreaseQuantity = (id: number) => {
		setCart((prevCart) => {
			const item = prevCart.find((item) => item.id === id)
			if (item && item.quantity > 1) {
				// Decrementa a quantidade se for maior que 1
				return prevCart.map((item) =>
					item.id === id
						? {
								...item,
								quantity: item.quantity - 1,
						  }
						: item,
				)
			} else {
				return prevCart
				// Remove o item se a quantidade for 1
				//return prevCart.filter((item) => item.id !== id)
			}
		})
	}

	const removeFromCart = (id: number) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id))
	}

	return <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity }}>{children}</CartContext.Provider>
}
