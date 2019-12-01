export const GET_ALL = { method: 'get', endpoint: () => '/character' };
export const GET_ONE = { method: 'get', endpoint: (dataID: number) => `/character/${dataID}` };

export const FETCH_ROUTES = { method: 'get', endpoint: () => '/app.json' };
export const FETCH_TESTIMONIALS = { method: 'get', endpoint: () => '/page1.json' };
export const FETCH_CONFIGURATOR = { method: 'get', endpoint: () => '/page2.json' };
