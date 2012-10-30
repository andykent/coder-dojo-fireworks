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

  setBackground: function(url) {

  },

  onClick: function(fn) {

  },

  onMove: function(fn) {

  },


  // utils
  canvas: Fireworks.canvas,

  launchFn: function(opts) {
    return function() { f.launch(opts); };
  }
};