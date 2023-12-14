import { useEffect } from 'react';
import { createContext, useState } from 'react';

import { STORAGE } from '../helpers/storage';
import { USER_STORAGE_KEY } from '../constants/storage-keys';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		window.addEventListener('login', ({ detail: user }) => {
			setUser(user);
		});
		window.addEventListener('logout', () => {
			setUser(null);
		});

		STORAGE.get(USER_STORAGE_KEY).then((currentUser) => {
			const now = new Date().getTime();

			if (currentUser?.expiration_date < now) {
				currentUser = null;
				STORAGE.remove(USER_STORAGE_KEY);
			}
			if (currentUser) setUser(currentUser);
			setIsLoading(false);
		});
	}, [setUser]);

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated: !!user, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};
