import styled from "styled-components";

//Animation (we need to use div(motion.something))
const { motion } = require("framer-motion");

export const Wrapper = styled.div`
	margin: 0 15rem;
`;

export const Card = styled(motion.div)`
	display: flex;
	gap: 2rem;
	flex-direction: column;
	align-items: center;
	background: white;
	border-radius: 2rem;
	padding: 3rem 2rem;
	width: 90%;

	button {
		color: white;
		background: var(--primary);
		font-size: 1.2rem;
		font-weight: 500;
		padding: 1rem 2rem;
		border: none;
		cursor: pointer;
	}
`;

export const Email = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const InfoWrapper = styled.div`
	display: flex;
	gap: 3rem;
`;

export const Address = styled.div`
	font-size: 1rem;
	width: 100%;
`;

export const OrderInfo = styled.div`
	text-align: right;
	font-size: 1rem;
	width: 100%;

	div {
		padding-bottom: 1rem;
	}
`;
