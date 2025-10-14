import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
	let location = useLocation();
	let path = [""];

	const crumbs = location.pathname
		.split("/")
		.filter((el) => el !== "")
		.map((el, index, arr) => {
			path.push(el);

			return index !== arr.length - 1 ? (
				<li className="breadcrumb-item" key={el}>
					<Link to={path.join("/")}>{el}</Link>
				</li>
			) : (
				<li className="breadcrumb-item active" aria-current="page" key={el}>
					{el}
				</li>
			);
		});

	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<Link to="/">Home</Link>
				</li>
				{crumbs}
			</ol>
		</nav>
	);
}
