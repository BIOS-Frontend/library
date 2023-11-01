import { USER_STORAGE_KEY } from '../constants/storage-keys';
import { STORAGE } from '../helpers/storage';
import { API_URL } from './config';

export function getBooks() {
	return new Promise(async (resolve, reject) => {
		try {
			const path = `${API_URL}/book`;
			const { token } = await STORAGE.get(USER_STORAGE_KEY);
			const response = await fetch(path, {
				headers: {
					'auth-token': token,
				},
			});

			const data = await response.json();

			resolve(data || []);
		} catch (error) {
			console.error(error);
			reject('Error en la petición.');
		}
	});
}

export function deleteBook({ id }) {
	return new Promise(async (resolve, reject) => {
		try {
			const path = `${API_URL}/book/${id}`;
			const { token } = await STORAGE.get(USER_STORAGE_KEY);
			const response = await fetch(path, {
				method: 'DELETE',
				headers: {
					'auth-token': token,
				},
			});

			const { message } = await response.json();

			resolve(message);
		} catch (error) {
			console.error(error);
			reject('Error en la petición.');
		}
	});
}
