window.fireworks = f = {


  // DSL

  setup: function() {
    Fireworks.initialize();
  },

  launch: function(opts) {
    var opts = opts || {};
    // var x = opts.x || f.canvas.width / 2;
    // var y = opts.y || f.canvas.height;
    var colour = opts.colour || '';
    // Firework.createParticle(pos, target, vel, color, usePhysics);
    Fireworks.createParticle();
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

  launchFn: function(opts) {
    return function() { f.launch(opts) };
  },

};