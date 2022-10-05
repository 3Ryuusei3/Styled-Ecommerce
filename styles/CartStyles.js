import styled from "styled-components";

//Animation (we need to use motion.something)
const { motion } = require("framer-motion");

export const CartWrapper = styled(motion.div)`
	//To animate a div that is exported, we go to the style and
	//instead of styled.div we do styled(motion.div)
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 100;
	display: flex;
	justify-content: flex-end;
	/* display: none; */
`;

export const CartStyle = styled(motion.div)`
	width: 35%;
	background: #f1f1f1;
	padding: 2rem 5rem;
	overflow-y: scroll;
	position: relative;
`;

export const Card = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 1rem;
	overflow: hidden;
	background: white;
	padding: 2rem;
	margin: 2rem 0;

	img {
		width: 8rem;
	}
`;

export const CardInfo = styled(motion.div)`
	width: 50%;

	div {
		display: flex;
		justify-content: space-between;
	}
`;

export const EmptyStyle = styled(motion.div)`
	position: absolute;
	top: 0;
	transform: translate(-50%, 0%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 80%;

	h2 {
		font-size: 1.6rem;
		padding: 2rem 1rem;
	}

	svg {
		font-size: 5rem;
		color: var(--secondary);
	}
`;

export const Checkout = styled(motion.div)`
	button {
		background: var(--primary);
		padding: 1rem 2rem;
		width: 100%;
		color: white;
		margin-top: 2rem;
		cursor: pointer;
		border: none;
	}
`;

export const Cards = styled(motion.div)``;
