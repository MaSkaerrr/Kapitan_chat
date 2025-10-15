import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="text-center">
			<h1 className="my-3">Page Not Found</h1>
			<Link to="/" className="btn btn-light">
				GO TO HOME PAGE
			</Link>
		</div>
	);
}