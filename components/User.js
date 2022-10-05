import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { Profile } from "../styles/UserStyles";
import { useUser } from "@auth0/nextjs-auth0";

export default function User() {
	const route = useRouter();
	const { user } = useUser();
	if (!user) {
		return (
			<div onClick={() => route.push("api/auth/login")}>
				<FaUserCircle />
				<h3>Login</h3>
			</div>
		);
	}
	return (
		<Profile onClick={() => route.push("/profile")}>
			<img src={user.picture} alt={user.name} />
			<h3>{user.name}</h3>
		</Profile>
	);
}
