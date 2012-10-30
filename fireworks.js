window.fireworks = f = {


  // DSL

  launch: function(opts) {

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