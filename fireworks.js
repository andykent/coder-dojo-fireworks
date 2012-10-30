window.fireworks = f = {
  // DSL

  display: function(fn) {
    window.onload = function() {
      f.loadCSS('styles.css');
      f.loadImages();
      f.loadJS('creativeFireworks.js', function() {
        Fireworks.initialize();
        fn.call(this, f);
      });
    }
  },

  launch: function(opts) {
    var opts = opts || {};
    var x = opts.x;
    var y = opts.y;
    var colour = opts.colour || '';
    // Firework.createParticle(pos, target, vel, color, usePhysics);
    Fireworks.createParticle({x: x, y: y});
  },

  launchIn: function(seconds, opts) {
    window.setTimeout(f.launchFn(opts), seconds*1000);
  },

  launchEvery: function(seconds, opts) {
    window.setInterval(f.launchFn(opts), seconds*1000);
  },

  setBackground: function(url) {

  },

  onClick: function(fn) {
    document.addEventListener('mouseup', function(e) {
        fn(e.layerX, e.layerY);
    }, true);
  },

  onMove: function(fn) {
    document.addEventListener('mousemove', function(e) {
        fn(e.layerX, e.layerY);
    }, true);
  },

  // utils
  canvas: Fireworks.canvas,

  launchFn: function(opts) {
    return function() { f.launch(opts) };
  },

  loadCSS: function(filename) {
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", filename);
    document.getElementsByTagName("head")[0].appendChild(css);
  },

  loadJS: function(filename, fn) {
    var js = document.createElement('script')
    js.setAttribute("type","text/javascript")
    js.setAttribute("src", filename)
    js.onload = fn;
    document.getElementsByTagName("head")[0].appendChild(js);
  },

  loadImages: function() {
    var aside = document.createElement('aside');
    aside.setAttribute('id', 'library');
    aside.innerHTML = '<img src="images/nightsky.png" id="nightsky" /><img src="images/big-glow.png" id="big-glow" /><img src="images/small-glow.png" id="small-glow" />';
    document.getElementsByTagName("body")[0].appendChild(aside);
  },
};