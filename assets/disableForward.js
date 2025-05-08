window.onload = function () {
  let historyLength = history.length;

  history.pushState(null, null, location.href);

  window.onpopstate = function (event) {
    if (history.length > historyLength) {
      history.go(-1);
    }
  };
};
