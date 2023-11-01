import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { AuthContext } from '../context/AuthUser';

export default function UnauthenticatedRoute({
	component: Component,
	...rest
}) {
	const { isAuthenticated, isLoading } = useContext(AuthContext);

	if (isLoading)
		return (
			<div className="w-full h-screen flex justify-center items-center text-2xl font-bold pt-10">
				<CircularProgress />
			</div>
		);

	return !isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
}
