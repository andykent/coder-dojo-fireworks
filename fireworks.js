window.fireworks = f = {
  // DSL

  SERVER: window.location.protocol == 'file:' ? '' : 'http://coder-dojo-london.s3-website-eu-west-1.amazonaws.com/fireworks/',

  display: function(fn) {
    window.onload = function() {
      f.loadCSS('styles.css');
      f.loadImages();
      f.loadJS('creativeFireworks.js', function() {
        Fireworks.initialize();
        f.canvas = Fireworks.canvas;
        fn.call(this, f);
      });
    }
  },

  make: function(args) {
    return new f.Firework(args);
  },

  launch: function(opts) {
    var opts = opts || {};
    var x = opts.x;
    var y = opts.y;
    var colour = opts.colour || '';
    // Firework.createParticle(pos, target, vel, color, usePhysics);
    Fireworks.createParticle({x: x, y: y}, null, null, colour);
  },

  launchIn: function(seconds, opts) {
    window.setTimeout(f.launchFn(opts), seconds*1000);
  },

  launchEvery: function(seconds, opts) {
    window.setInterval(f.launchFn(opts), seconds*1000);
  },

  explodeAt: function(opts) {
    opts = f.optDefaults(opts);
    console.log(opts);

    f.getExplosionType(opts.type)(new Particle(
        { x: opts.x, y: opts.y }, // position
        { x: opts.target_x , y: opts.target_y }, // target
        { x: 1, y: 1 }, // velocity
        opts.colour, // colour
        true) // use physics
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
  launchFn: function(opts) {
    return function() { f.launch(opts) };
  },

  loadCSS: function(filename) {
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", f.SERVER + filename);
    document.getElementsByTagName("head")[0].appendChild(css);
  },

  loadJS: function(filename, fn) {
    var js = document.createElement('script')
    js.setAttribute("type","text/javascript")
    js.setAttribute("src", f.SERVER + filename)
    js.onload = fn;
    document.getElementsByTagName("head")[0].appendChild(js);
  },

  loadImages: function() {
    var aside = document.createElement('aside');
    aside.setAttribute('id', 'library');
    aside.innerHTML = '<img src="'+f.SERVER+'images/nightsky.png" id="nightsky" /><img src="'+f.SERVER+'images/big-glow.png" id="big-glow" /><img src="'+f.SERVER+'images/small-glow.png" id="small-glow" />';
    document.getElementsByTagName("body")[0].appendChild(aside);
  },

  getExplosionType: function(type) {
    return {
        'circle': FireworkExplosions.circle,
        'star': FireworkExplosions.star,
        'smallCircle': FireworkExplosions.smallCircle,
    }[type];
  },

  optDefaults: function(opts) {
    if (typeof(opts.x) === 'undefined')
        opts.x = window.innerWidth;

    if (typeof(opts.y) === 'undefined')
        opts.y = window.innerHeight;

    if (typeof(opts.target_x) === 'undefined')
        opts.target_x = Math.random() * window.innerWidth;

    if (typeof(opts.target_y) === 'undefined')
        opts.target_y = Math.random() * window.innerHeight;

    if (typeof(opts.colour) === 'undefined') {
        opts.colour = Math.floor(Math.random() * 100) * 12;
    } else {
        opts.colour = f.getColour(opts.colour);
    }

    if (typeof(opts.type) === 'undefined')
        opts.type = 'star';

    return opts;
  },

  realColourHSLValues: {
    'red': 1,
    'orange': 20,
    'yellow': 40,
    'green': 80,
    'cyan': 120,
    'blue': 160,
    'violet': 180,
    'magenta': 200,
    'pink': 220
  },

  getColour: function(colour) {
    return f.realColourHSLValues[colour.toLowerCase()];
  },

  Firework: function(opts) {
    var self = this;
    var opts = opts || {};
    this.x = opts.x;
    this.y = opts.y
    this.colour = opts.colour || '';
    this.repeat = opts.repeat || 1;
    this.wait = opts.wait || 0;

    this.launch = function() {
      for(var i=0; i < self.repeat; i++) {
        self.performIn(this.wait*i);
      }
    };

    this.launchIn = function(seconds) {
      window.setTimeout(function() { self.launch() }, seconds*1000);
    };

    this.performIn = function(seconds) {
      window.setTimeout(function() { self.perform() }, seconds*1000);
    };

    this.perform = function() {
      Fireworks.createParticle({x: self.x, y: self.y}, null, null, self.colour);
    };
  }
};
