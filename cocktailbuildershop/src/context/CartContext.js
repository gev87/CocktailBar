import { createContext, useState } from "react";

export const CartContext = createContext();


export const CartProvider = (props) => {
	const [cart,setCart] = useState([]);
		

	const onAdd = (item) => {
		const exist = cart.find((x) => x.idDrink === item.idDrink);
		if (exist) {
			setCart(
				cart.map((x) =>
					x.idDrink === item.idDrink ? { ...exist,qty: exist.qty + 1 } : x
				)
			);
		} else {
			setCart([...cart,{ ...item,qty: 1 }]);
		}
	}
	
	const onRemove = (item) => {
		const exist = cart.find((x) => x.idDrink === item.idDrink);
		if (exist.qty === 1) {
			setCart(cart.filter((x) => x.idDrink !== item.idDrink));
		} else {
			setCart(
				cart.map((x) =>
					x.idDrink === item.idDrink ? { ...exist, qty: exist.qty - 1 } : x
				)
			);
		}
	};
	

	return (
		<CartContext.Provider value={{cart,setCart,onAdd,onRemove }}>
				{props.children}
			</CartContext.Provider>
		);
}