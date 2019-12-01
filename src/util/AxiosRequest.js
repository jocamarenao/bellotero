/* eslint-disable max-lines */
import { api, getURLParams } from '../config/axios/axios';
import Errors from './Errors';
import { UNPROCESSABLE } from '../settings/Errors';

class AxiosRequest {
	constructor(initInstance) {
		let instance = initInstance;
		if (typeof instance === 'undefined') {
			instance = api;
		}
		this.instance = instance;
		this.loading = false;
		this.response = {};
		this.pagination = {};
		this.errors = new Errors();
	}

	clear() {
		this.loading = false;
		this.response = {};
		this.pagination = {};
		this.errors.clear();
	}

	get(endpoint, options, filterless = true) {
		this.loading = true;
		const urlParameters = AxiosRequest.getUrlFilters();
		if (typeof endpoint !== 'string' || endpoint === '') {
			return Promise.reject(new Error(new Error('Invalid Endpoint')));
		}
		const filters = AxiosRequest.setFilters(options);
		if (filterless !== true) {
			if (filters && filters !== 'undefined') {
				window.location.replace(`${urlParameters.absoluteUrl}${filters}`);
				this.loading = false;
				return Promise.resolve();
			}
			if (!filters) {
				window.location.replace(urlParameters.absoluteUrl);
				this.loading = false;
				return Promise.resolve();
			}
		}
		if (filterless === true) {
			return this.instance
				.get(endpoint + getURLParams(options))
				.then(response => {
					this.response = response;
					return Promise.resolve(this.getData());
				})
				.catch(error => {
					this.response = error;
					if (error.status === UNPROCESSABLE) this.errors.record(error);
					this.loading = false;
					return Promise.reject(this.errors);
				});
		}

		return this.instance
			.get(endpoint)
			.then(response => {
				this.response = response;
				return Promise.resolve(this.getData());
			})
			.catch(error => {
				this.response = error;
				if (error.status === UNPROCESSABLE) this.errors.record(error);
				this.loading = false;
				return Promise.reject(this.errors);
			});
	}

	post(endpoint, options) {
		this.loading = true;
		if (typeof endpoint !== 'string' || endpoint === '') {
			return Promise.reject(new Error('Invalid Endpoint'));
		}

		const parameters = AxiosRequest.bodyParams(options);

		return this.instance
			.post(endpoint, parameters)
			.then(response => {
				this.response = response;
				return Promise.resolve(this.getData());
			})
			.catch(error => {
				this.loading = false;
				this.response = error;
				if (UNPROCESSABLE.includes(error.status)) this.errors.record(error);
				return Promise.reject(error);
			});
	}

	put(endpoint, options) {
		this.loading = true;
		if (typeof endpoint !== 'string' || endpoint === '') {
			return Promise.reject(new Error('Invalid Endpoint'));
		}

		const parameters = AxiosRequest.bodyParams(options);

		return this.instance
			.put(endpoint, parameters)
			.then(response => {
				this.response = response;
				return Promise.resolve(this.getData());
			})
			.catch(error => {
				this.loading = false;
				this.response = error;
				if (UNPROCESSABLE.includes(error.status)) this.errors.record(error);
				return Promise.reject(error);
			});
	}

	patch(endpoint, options) {
		this.loading = true;
		if (typeof endpoint !== 'string' || endpoint === '') {
			return Promise.reject(new Error('Invalid Endpoint'));
		}

		const parameters = AxiosRequest.bodyParams(options);

		return this.instance
			.patch(endpoint, parameters)
			.then(response => {
				this.response = response;
				return Promise.resolve(this.getData());
			})
			.catch(error => {
				this.loading = false;
				this.response = error;
				if (UNPROCESSABLE.includes(error.status)) this.errors.record(error);
				return Promise.reject(error);
			});
	}

	postFormData(options) {
		const { method, url, data, config } = options;

		this.loading = true;
		if (typeof url !== 'string' || url === '') {
			return Promise.reject(new Error('Invalid Endpoint'));
		}

		return this.instance({
			method,
			url,
			data,
			config,
		})
			.then(response => {
				this.response = response;
				return Promise.resolve(this.getData());
			})
			.catch(error => {
				this.response = error;
				if (error.status === UNPROCESSABLE) this.errors.record(error.response);
				this.loading = false;
				return Promise.reject(this.errors);
			});
	}

	getBlobData(options) {
		const { method, url } = options;

		this.loading = true;
		if (typeof url !== 'string' || url === '') {
			return Promise.reject(new Error('Invalid Endpoint'));
		}

		return this.instance({
			method,
			url,
			responseType: 'blob',
		})
			.then(response => {
				this.response = response;
				return Promise.resolve(response);
			})
			.catch(error => {
				this.response = error;
				if (error.status === UNPROCESSABLE) this.errors.record(error.response);
				this.loading = false;
				return Promise.reject(this.errors);
			});
	}

	delete(endpoint) {
		this.loading = true;
		if (typeof endpoint !== 'string' || endpoint === '') {
			return Promise.reject(new Error('Invalid Endpoint'));
		}
		return this.instance
			.delete(endpoint)
			.then(response => {
				this.response = response;
				return Promise.resolve(this.getData());
			})
			.catch(error => {
				this.response = error;
				if (error.status === UNPROCESSABLE) this.errors.record(error);
				this.loading = false;
				return Promise.reject(this.errors);
			});
	}

	getResponse() {
		return this.response;
	}

	getData() {
		let response = [];
		if (Object.keys(this.response)) {
			if (typeof this.response.data !== 'undefined') {
				response = {
					data: this.response.data,
					status: this.response.status,
				};
				if (typeof response.data !== 'undefined') {
					response = {
						data: response.data,
						status: response.status,
					};
				}
				this.pagination = this.getPagination();
			}
		}
		this.loading = false;
		return response;
	}

	getPagination() {
		let response = {};
		try {
			const { meta } = this.response.data;
			if (typeof meta !== 'undefined' && typeof meta.pagination !== 'undefined') {
				response = meta.pagination;
			}
		} catch (error) {
			response = {};
		}
		return response;
	}

	static getUrlFilters() {
		const url = { absoluteUrl: '', filters: '' };
		const absoluteUrl = window.location.toString();
		const urlSplits = absoluteUrl.split('?');

		if (absoluteUrl.includes('?')) {
			[url.absoluteUrl, url.filters] = urlSplits;
			return url;
		}
		url.absoluteUrl = absoluteUrl;
		return url;
	}

	static setFilters(options) {
		if (typeof options === 'undefined') {
			return 'undefined';
		}

		let parameters = [];

		Object.keys(options).filter(item => {
			if (item === 'page') {
				const page = options[item];
				const pageNumber = parseInt(page, 10);
				// eslint-disable-next-line no-magic-numbers
				if (pageNumber > 0) {
					parameters.push(`${item}=${pageNumber}`);
				}
			} else if (options[item]) {
				parameters.push(`${item}=${options[item]}`);
			}
			return null;
		});
		parameters = `?${parameters.join('&')}`;
		if (parameters && parameters !== '?') {
			return parameters;
		}
		return '';
	}

	static bodyParams(options) {
		if (typeof options === 'object') {
			if (Object.keys(options).length) {
				return options;
			}
		}

		return {};
	}

	getBodyData(options) {
		const { method, url, data, config } = options;

		this.loading = true;
		if (typeof url !== 'string' || url === '') {
			return Promise.reject(new Error('Invalid Endpoint'));
		}

		return this.instance({
			method,
			url,
			params: data,
			config,
		})
			.then(response => {
				this.response = response;
				return Promise.resolve(this.getData());
			})
			.catch(error => {
				this.response = error;
				if (error.status === UNPROCESSABLE) this.errors.record(error.response);
				this.loading = false;
				return Promise.reject(this.errors);
			});
	}
}

export { AxiosRequest };
export default AxiosRequest;
