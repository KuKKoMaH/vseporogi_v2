function scriptLoader(url, onload) {
  var r = false;
  var t = document.getElementsByTagName('script')[0];
  var s = document.createElement('script');

  s.type = 'text/javascript';
  s.src = url;
  s.async = true;
  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState === 'complete')) {
      r = true;
      if (onload) onload();
    }
  };
  t.parentNode.insertBefore(s, t);
}

module.exports = scriptLoader;