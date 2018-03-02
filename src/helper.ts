export const isBrowser = typeof window !== 'undefined' && window.document;
export const isNode = !isBrowser;
