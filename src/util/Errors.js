class Errors {
	constructor() {
		this.errors = [];
		this.messageError = null;
		this.status = 422;
	}

	all() {
		return this.errors;
	}

	message() {
		if (this.messageError) {
			return this.messageError;
		}
		return null;
	}

	has(field) {
		if (typeof this.errors[field] !== 'undefined') {
			return true;
		}
		return false;
	}

	any() {
		// eslint-disable-next-line no-magic-numbers
		return Object.keys(this.errors).length > 0;
	}

	get(field) {
		return this.errors.some(error => error.param === field);
	}

	set(field, error) {
		if (typeof field === 'object') {
			this.errors = field;
		} else if (typeof field === 'string') {
			this.errors[field] = error;
		}
	}

	record(errors) {
		this.messageError = errors.statusText;
		this.errors = errors.data;
		this.status = errors.status;
	}

	clear(field) {
		if (field === true) {
			this.errors = {};
		}
		if (field) {
			delete this.errors[field];
			this.errors = { ...this.errors };
		}
	}
}

export default Errors;
