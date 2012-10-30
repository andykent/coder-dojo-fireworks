window.fireworks = f = {
  // DSL

  setup: function() {
    Fireworks.initialize();
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

  explodeAt: function(x, y, type) {
    type(new Particle(
        // position
        { x: x, y: y },

        // target
        { y: y },

        // velocity
        { x: 1, y: 1 },

        // color
        Math.floor(Math.random() * 100) * 12,

        // use physics
        true)
    );
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
    return function() { f.launch(opts); };
  }
};
