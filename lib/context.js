import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
	//Add our data for the state
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [qty, setQty] = useState(1);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	//Increase product quantity
	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	//Decrease product quantity
	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	};

	//Add product to Cart
	const onAdd = (product, quantity) => {
		//Increase total price
		setTotalPrice((prevTotal) => prevTotal + product.price * quantity);

		//Increase total quantity
		setTotalQuantities((prevTotal) => prevTotal + quantity);

		//Check if the product is already on the cart
		const exist = cartItems.find((item) => item.slug === product.slug);
		if (exist) {
			setCartItems(
				cartItems.map((item) => (item.slug === product.slug ? { ...exist, quantity: exist.quantity + quantity } : item))
			);
		} else {
			setCartItems([...cartItems, { ...product, quantity: quantity }]);
		}
	};

	//Remove products from cart
	const onRemove = (product) => {
		//Decrease total price
		setTotalPrice((prevTotal) => prevTotal - product.price);

		//Decrease total quantity
		setTotalQuantities((prevTotal) => prevTotal - 1);

		//Check if the product is already on the cart
		const exist = cartItems.find((item) => item.slug === product.slug);
		if (exist.quantity === 1) {
			setCartItems(cartItems.filter((item) => item.slug !== product.slug));
		} else {
			setCartItems(
				cartItems.map((item) => (item.slug === product.slug ? { ...exist, quantity: exist.quantity - 1 } : item))
			);
		}
	};

	return (
		<ShopContext.Provider
			value={{
				qty,
				setQty,
				increaseQty,
				decreaseQty,
				showCart,
				setShowCart,
				cartItems,
				onAdd,
				onRemove,
				totalQuantities,
				totalPrice,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};

export const useStateContext = () => useContext(ShopContext);
