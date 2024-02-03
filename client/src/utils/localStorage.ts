export const getOrSet = (key: string, value: string) => {
  const data = localStorage.getItem(key);

  if (!data) {
    localStorage.setItem(key, value);
    return value;
  }

  return JSON.parse(data || "");
};

export const get = (key: string) => {
  const data = localStorage.getItem(key);

  if (!data) return false;

  return JSON.parse(data || "");
};

export const set = (key: string, value: string) => localStorage.setItem(key, value);
