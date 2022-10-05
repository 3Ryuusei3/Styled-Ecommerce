import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyle, NavItem } from "../styles/NavStyles.js";
import Cart from "./Cart.js";
import { useStateContext } from "../lib/context.js";
import User from "./User.js";
import { useUser } from "@auth0/nextjs-auth0";

//We need this to create exit animations, we wrap it on the toggle and it will detect it
const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
	const { showCart, setShowCart, totalQuantities } = useStateContext();
	const { user, error, isLoading } = useUser();

	return (
		<NavStyle>
			<Link href={"/"}>Styled.</Link>
			<NavItem>
				<User />
				<div onClick={() => setShowCart(true)}>
					{totalQuantities > 0 && (
						<motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
							{totalQuantities}
						</motion.span>
					)}
					<FiShoppingBag />
					<h3>Cart</h3>
				</div>
			</NavItem>
			<AnimatePresence>{showCart && <Cart />}</AnimatePresence>
		</NavStyle>
	);
}
