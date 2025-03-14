import { Link } from "react-router-dom";

// Import Custome Hooks
import useAxios from "./../../../CustomeHooks/useAxios/useAxios";
import usePreventRouterLinks from "./../../../CustomeHooks/usePreventRouterLinks/usePreventRouterLinks";

// Main Navbar Logo Sass File
import "./Logo.scss";

// Navbar Logo Component
const NavbarLogo = () => {
	// Custome Hooks
	const { preventRouterLinks } = usePreventRouterLinks(
		`${process.env.PUBLIC_URL}/`
	);

	// Fetch data
	const {
		data: { image = "", text = "" },
	} = useAxios("./Apis/Logo.json", []);

	return (
		<Link
			to={`${process.env.PUBLIC_URL}/`}
			onClick={preventRouterLinks}
			className="logo"
		>
			{image && (
				<img src={image} alt="Logo" draggable="false" className="logo-image" />
			)}

		</Link>
	);
};

export default NavbarLogo;
