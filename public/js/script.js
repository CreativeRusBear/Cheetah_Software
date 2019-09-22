/**
 * @summary Нажатие на article
 */
on('body', 'click', '.article',  (e) => {
  const { id } = e.path.find(elem=>elem.className === 'article');
  window.location.href+=id;
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