export const STORAGE = {
	set: (key, value) => {
		return new Promise((resolve) => {
			const raw = JSON.stringify(value);

			const res = localStorage.setItem(key, raw);
			resolve(res);
		});
	},
	get: (key) => {
		return new Promise((resolve) => {
			const raw = localStorage.getItem(key);
			const value = raw ? JSON.parse(raw) : null;

			resolve(value);
		});
	},
	remove: (key) => {
		return new Promise((resolve) => {
			const raw = localStorage.removeItem(key);

			resolve(raw);
		});
	},
	clear: () => {
		return new Promise((resolve) => {
			const raw = localStorage.clear();

			resolve(raw);
		});
	},
};
