(function() {
  let u = navigator.userAgent;
  let w = window.innerWidth;
  if (!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1) {
    window.innerWidth = 375;
    // window.innerWidth = 750 * (w / 1920) > 375 ? 375 : 750 * (w / 1920);
    window.onload = function() {
      window.innerWidth = w;
    };
  }
})();
