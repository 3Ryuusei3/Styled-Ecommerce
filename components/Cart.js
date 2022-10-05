import { useStateContext } from "../lib/context";
import { CartWrapper, CartStyle, Card, CardInfo, EmptyStyle, Checkout, Cards } from "../styles/CartStyles";
import { Quantity } from "../styles/ProductsDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import getStripe from "../lib/getStripe";

//Animation Variants
const card = {
	hidden: { opacity: 0, scale: 0.8 },
	show: { opacity: 1, scale: 1 },
};

const cards = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.15,
		},
	},
};

export default function Cart() {
	const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();

	//Payment
	const handleCheckout = async () => {
		const stripePromise = await getStripe();
		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItems),
		});
		const data = await response.json();
		await stripePromise.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<CartWrapper
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			//In order to use the exit animation, we need FramerMotion to
			//detect out check, we used a check back in the Nav.js
			exit={{ opacity: 0 }}
			onClick={() => setShowCart(false)}
		>
			<CartStyle
				initial={{ x: "50%" }}
				animate={{ x: "0%" }}
				transition={{ type: "tween" }}
				exit={{ x: "50%" }}
				onClick={(e) => e.stopPropagation()}
			>
				{cartItems.length < 1 && (
					<EmptyStyle
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3 }}
					>
						<h2>You have more shopping to do 😉</h2>
						<FaShoppingCart />
					</EmptyStyle>
				)}
				<Cards variants={cards} initial="hidden" animate="show" layout>
					{cartItems.length >= 1 &&
						cartItems.map((item) => {
							return (
								<Card variants={card} layout key={item.slug}>
									<img src={item.image.data.attributes.formats.thumbnail.url} alt={item.title} />
									<CardInfo>
										<h3>{item.title}</h3>
										<h3>{item.price}$</h3>
										<Quantity>
											<span>Quantity</span>
											<button>
												<AiFillMinusCircle onClick={() => onRemove(item)} />
											</button>
											<p>{item.quantity}</p>
											<button>
												<AiFillPlusCircle onClick={() => onAdd(item, 1)} />
											</button>
										</Quantity>
									</CardInfo>
								</Card>
							);
						})}
				</Cards>
				{cartItems.length >= 1 && (
					<Checkout layout>
						<h3>Subtotal: {totalPrice}$</h3>
						<button onClick={handleCheckout}>Purchase</button>
					</Checkout>
				)}
			</CartStyle>
		</CartWrapper>
	);
}
