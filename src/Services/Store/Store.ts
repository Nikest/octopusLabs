export function set(key: string, data: string | object) {
  const dataToSave = typeof data === 'object' ? JSON.stringify(data) : data;

  localStorage.setItem(key, dataToSave);
}

export function get(key: string) {
  return localStorage.getItem(key);
}

export function checkAndDo(key: string, ifExistFn: Function, ifNotExistFn: Function) {
  const data = get(key);

  return {
    next: data ? ifExistFn(data) : ifNotExistFn()
  };
}