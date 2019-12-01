class Common {
	static getPath(item) {
		if (item.route !== '#') return `/${item.route}`;
		return `/${item.text.toLowerCase()}`;
	}
}
export default Common;
