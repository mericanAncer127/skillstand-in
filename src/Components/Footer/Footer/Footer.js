import { Link } from "react-router-dom";

// Import Custome Hooks
import useAxios from "./../../../CustomeHooks/useAxios/useAxios";
import usePreventRouterLinks from "./../../../CustomeHooks/usePreventRouterLinks/usePreventRouterLinks";

// Main Footer Footer Sass File
import "./Footer.scss";

// Footer Footer Component
const FooterFooter = ({ copyRight }) => {
	// Custome Hooks
	const { preventRouterLinks } = usePreventRouterLinks(
		`${process.env.PUBLIC_URL}/`
	);

	// Fetch Logo
	const {
		data: { image = "", text = "" },
	} = useAxios("./Apis/Logo.json", []);

	// Fetch Social
	const { data: social = [] } = useAxios("./Apis/social.json", []);

	// Get Social List
	const socialList = social.map((item) => {
		return (
			<a
				key={item.id}
				href={item.link}
				target="_blank"
				rel="noreferrer"
				aria-label={item.name}
			>
				<i className={`icon ${item.icon}`}></i>
			</a>
		);
	});

	return (
		<footer className="footer-footer">
			<Link
				to={`${process.env.PUBLIC_URL}/`}
				onClick={preventRouterLinks}
				className="logo"
			>
				{image && (
					<img
						src={image}
						alt="Logo"
						draggable="false"
						className="logo-image"
					/>
				)}

			</Link>

			<p className="copy-right">{copyRight}</p>

		</footer>
	);
};

export default FooterFooter;
