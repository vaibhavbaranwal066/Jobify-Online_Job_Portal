import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-gray-800">404</h1>
				<p className="mt-4 text-xl text-gray-600">Page not found</p>
				<Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">Go to Home</Link>
			</div>
		</div>
	);
};

export default NotFound;
