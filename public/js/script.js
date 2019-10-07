/**
                   ____     _____                        __
                  /\  _`\  /\  __`\   /'\_/`\           /\ \__
                  \ \ \/\ \\ \ \/\ \ /\      \          \ \ ,_\  _ __    __      __
                   \ \ \ \ \\ \ \ \ \\ \ \__\ \   _______\ \ \/ /\`'__\/'__`\  /'__`\
                    \ \ \_\ \\ \ \_\ \\ \ \_/\ \ /\______\\ \ \_\ \ \//\  __/ /\  __/
                     \ \____/ \ \_____\\ \_\\ \_\\/______/ \ \__\\ \_\\ \____\\ \____\
                      \/___/   \/_____/ \/_/ \/_/           \/__/ \/_/ \/____/ \/____/
*/


/**
 * @summary Нажатие на article
 */
on('body', 'click', '.article', (e) => {
  const {id} = e.path.find((elem)=>elem.className === 'article');

  /**
   * @summary is last char === '/'
   * @type {string}
   */
  window.location.href += /\/+$/.test(window.location.href) ? id : `/${id}`;
});

/**
 * @param elSelector
 * @param eventName
 * @param selector
 * @param fn
 * @private
 */
function on(elSelector, eventName, selector, fn) {
  const element = document.querySelector(elSelector);

  element.addEventListener(eventName, function(event) {
    const possibleTargets = element.querySelectorAll(selector);
    const target = event.target;
    possibleTargets.forEach((item)=>{
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
