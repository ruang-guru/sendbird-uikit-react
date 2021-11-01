// https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the

import { isUrl } from "../../../utils";

// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  let timeout;
  return function _debounce() {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


export function getUrlFromWords(inputValue, setUrl){
  let inputValueArray = inputValue.split(/\s+/);
  let url = inputValueArray.find(word => isUrl(word));
  let hasUrl = !!url;
  return hasUrl && setUrl({hasUrl: true, text: url});
};



export default debounce;
