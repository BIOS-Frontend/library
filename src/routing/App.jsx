import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

import { AuthProvider } from '../context/AuthUser';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

export default function App() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<AuthenticatedRoute component={Home} />}
						/>
						<Route
							path="/login"
							element={<UnauthenticatedRoute component={Login} />}
						/>
						<Route
							path="/register"
							element={
								<UnauthenticatedRoute component={SignUp} />
							}
						/>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	);
}
