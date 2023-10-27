const getLocalStorageItem: (key: string) => string | null = (key: string) => {
  return localStorage.getItem(key);
};

const clearLocalStorageItem: () => void = () => {
  localStorage.clear();
};

const setLocalStorageItem: (key: string, data: string) => void = (key: string, data: string) => {
  return localStorage.setItem(key, data);
};

export { getLocalStorageItem, clearLocalStorageItem, setLocalStorageItem };
