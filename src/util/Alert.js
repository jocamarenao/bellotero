import Swal from 'sweetalert2';
import { TOAST } from '../settings/Alerts';

class Alert {
	constructor() {
		this.config = {
			allowEscapeKey: false,
			allowOutsideClick: false,
			showCancelButton: true,
			type: 'warning',
		};
	}

	error = (title, text, isHtml) => {
		const swalContent = { title };
		if (typeof isHtml === 'boolean' && isHtml === true) {
			swalContent.html = text;
		} else if (typeof isHtml !== 'boolean' || isHtml !== true) {
			swalContent.text = text;
		}
		return Swal.fire({ type: 'error', ...swalContent });
	};

	success = (title, text, isHtml) => {
		const swalContent = { title };
		if (typeof isHtml === 'boolean' && isHtml === true) {
			swalContent.html = text;
		} else if (typeof isHtml !== 'boolean' || isHtml !== true) {
			swalContent.text = text;
		}
		return Swal.fire({ type: 'success', ...swalContent });
	};

	preConfirm = (config, preConfirm, callback) => {
		if (typeof preConfirm !== 'function') {
			return Promise.reject(new Error('preconfirm_should_be_function'));
		}
		const { title, text } = config;
		if (typeof title === 'undefined') {
			return Promise.reject(new Error('title_required'));
		}

		if (typeof text === 'undefined') {
			return Promise.reject(new Error('text_required'));
		}

		const payload = { ...this.config, ...config, preConfirm };

		return Swal(payload)
			.then(response => callback(response))
			.catch(error => Promise.reject(error));
		// preConfirm: password => new Promise((resolve) => {
		// 		if (password.trim() === '') {
		// 			Swal.showValidationError(emptyPasswordMessage);
		// 		}
		// 		resolve();
		// 	}),
	};

	showValidationMessage = message => Swal.showValidationMessage(message);

	loading = (title, text, cnf) => {
		let config = cnf;
		if (typeof config === 'undefined') {
			config = {};
		}
		return Swal.fire({
			title,
			text,
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			...config,
			onOpen: () => {
				Swal.showLoading();
			},
		});
	};

	confirmationWithPassword = (title, text, payload) => {
		let attributes = payload;
		if (typeof attributes === 'undefined') {
			attributes = {};
		}
		let { config, buttonText, emptyPasswordMessage } = attributes;

		if (typeof config === 'undefined') {
			({ config } = this);
		}

		if (typeof buttonText === 'undefined') {
			buttonText = 'OK';
		}

		if (typeof emptyPasswordMessage === 'undefined') {
			emptyPasswordMessage = 'The Password field is required';
		}

		return Swal.fire({
			title,
			text,
			input: 'password',
			confirmButtonText: buttonText,
			...config,
			preConfirm: password =>
				new Promise(resolve => {
					if (password.trim() === '') {
						Swal.showValidationError(emptyPasswordMessage);
					}
					resolve();
				}),
		})
			.then(response => {
				const { dismiss } = response;
				if (typeof dismiss === 'string' && dismiss === 'cancel') {
					return Promise.reject(new Error('cancel'));
				}
				return response;
			})
			.catch(error => Promise.reject(error));
	};

	// eslint-disable-next-line max-params
	confirmation = (title, message, options, isHtml) => {
		const body = {};
		let { confirmButtonText, cancelButtonText, config } = options;

		if (typeof config === 'undefined') {
			({ config } = this);
		}

		if (typeof confirmButtonText === 'undefined') {
			confirmButtonText = 'OK';
		}

		if (typeof cancelButtonText === 'undefined') {
			cancelButtonText = 'Cancel';
		}

		if (typeof isHtml === 'boolean' && isHtml === true) {
			body.html = message;
		} else if (typeof isHtml !== 'boolean' || isHtml !== true) {
			body.text = message;
		}

		return Swal.fire({
			title,
			confirmButtonText,
			cancelButtonText,
			reverseButtons: true,
			...body,
			...config,
		})
			.then(response => {
				const { dismiss } = response;
				if (typeof dismiss === 'string' && dismiss === 'cancel') {
					return Promise.reject(new Error('cancel'));
				}
				return response;
			})
			.catch(error => Promise.reject(error));
	};

	toast = (type, title, options) => {
		const config = { ...TOAST, ...options };
		const toast = Swal.mixin({ toast: true, ...config });
		return toast.fire({ type, title });
	};

	close = () => Swal.close();
}
export default Alert;
