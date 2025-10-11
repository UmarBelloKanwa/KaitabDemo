export function toCamel<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamel(v)) as T;
  } else if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: Record<string, unknown>, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      (result as Record<string, unknown>)[camelKey] = toCamel((obj as Record<string, unknown>)[key]);
      return result;
    }, {}) as T;
  }
  return obj as T;
}
