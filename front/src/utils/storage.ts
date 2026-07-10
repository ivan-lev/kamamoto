export const storage = {
	get<T>(key: string): T | null {
		const value = localStorage.getItem(key);
		if (value === null)
			return null;

		try {
			return JSON.parse(value);
		}
		catch {
			// value was written before storage started JSON-encoding entries
			return value as T;
		}
	},

	set<T>(key: string, value: T) {
		localStorage.setItem(key, JSON.stringify(value));
	},

	remove(key: string) {
		localStorage.removeItem(key);
	},
};
