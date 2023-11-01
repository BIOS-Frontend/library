import { useEffect } from 'react';
import { createContext, useState } from 'react';

import { STORAGE } from '../helpers/storage';
import { USER_STORAGE_KEY } from '../constants/storage-keys';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser,] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const interval = setInterval(async () => {
			const currentUser = await STORAGE.get(USER_STORAGE_KEY);
			
			const raw = JSON.stringify(currentUser);
			const raw2 = JSON.stringify(user);
			console.log(raw === raw2);

			if (raw === raw2) return;
			clearInterval(interval);
			setIsLoading(false);

			setUser(currentUser);
		}, 1000);
	}, [setUser]);

	return (
		<AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};