import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import { DetailsStyle, ProductInfo, Quantity, Buy } from "../../styles/ProductsDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ProductDetails() {
	//Use state
	const { qty, setQty, increaseQty, decreaseQty, cartItems, onAdd } = useStateContext();

	//Reset qty on each product back to 1 every time we change the product page
	useEffect(() => {
		setQty(1);
	}, [setQty]);

	//Fetch slug
	const { query } = useRouter();

	//Fetch Graphql data
	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: { slug: query.slug },
	});
	const { data, fetching, error } = results;

	// Check for the data coming in
	if (fetching) return <p>Loading...</p>;
	if (error) return <p>Oh no... {error.message}</p>;

	//Extract our data
	const { title, description, image } = data.products.data[0].attributes;

	//Create a toast
	const notify = () => {
		toast.success(`${title} added to your cart.`, { duration: 2000 });
	};

	return (
		<DetailsStyle>
			<img src={image.data.attributes.formats.medium.url} alt={title} />
			<ProductInfo>
				<h3>{title}</h3>
				<p>{description}</p>
				<Quantity>
					<span>Quantity</span>
					<button>
						<AiFillMinusCircle onClick={decreaseQty} />
					</button>
					<p>{qty}</p>
					<button>
						<AiFillPlusCircle onClick={increaseQty} />
					</button>
				</Quantity>
				<Buy
					onClick={() => {
						onAdd(data.products.data[0].attributes, qty);
						notify();
					}}
				>
					Add to cart
				</Buy>
			</ProductInfo>
		</DetailsStyle>
	);
}
