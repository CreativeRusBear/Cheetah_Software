/**
 *  ____     _____                        __
 * /\  _`\  /\  __`\   /'\_/`\           /\ \__
 * \ \ \/\ \\ \ \/\ \ /\      \          \ \ ,_\  _ __    __      __
 *  \ \ \ \ \\ \ \ \ \\ \ \__\ \   _______\ \ \/ /\`'__\/'__`\  /'__`\
 *   \ \ \_\ \\ \ \_\ \\ \ \_/\ \ /\______\\ \ \_\ \ \//\  __/ /\  __/
 *    \ \____/ \ \_____\\ \_\\ \_\\/______/ \ \__\\ \_\\ \____\\ \____\
 *     \/___/   \/_____/ \/_/ \/_/           \/__/ \/_/ \/____/ \/____/
 */


/**
 * @description Click on one of articles
 */
on('body', 'click', '.article', e => {
	const {id} = e.path.find(elem => elem.className === 'article');
	/**
	 * @description is last char === '/'
	 * @type {string}
	 */
	window.location.href += /\/+$/.test(window.location.href) ? id : `/${id}`;
});

/**
 * @function
 * @description Create custom event
 * @param {String} elSelector - `body`
 * @param {String} eventName - event name
 * @param {String} selector - selector, that listen event
 * @param {event} fn - event object
 */
function on (elSelector, eventName, selector, fn) {
	const element = document.querySelector(elSelector);

	element.addEventListener(eventName, event => {
		const possibleTargets = element.querySelectorAll(selector);
		const target = event.target;
		possibleTargets.forEach(item => {
			let el = target;
			while (el && el !== element) {
				if (el === item) {
					return fn.call(item, event);
				}
				el = el.parentNode;
			}
		});
	});
}
