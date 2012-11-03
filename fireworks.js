window.fireworks = f = {
  // DSL

  SERVER: window.location.protocol == 'file:' ? '' : 'http://coder-dojo-london.s3-website-eu-west-1.amazonaws.com/fireworks/',

  display: function(fn) {
    window.onload = function() {
      f.loadCSS('styles.css');
      f.loadImages();
      f.loadJS('creativeFireworks.js', function() {
        setTimeout(function() {
          Fireworks.initialize();
          f.canvas = Fireworks.canvas;
          fn.call(this, f);
        }, 1000);
      });
    }
  },

  make: function(args) {
    return new f.Firework(args);
  },

  explodeAt: function(opts) {
    opts = f.optDefaults(opts);

    opts.type(new Particle(
        { x: opts.x, y: opts.y }, // position
        { x: opts.target_x , y: opts.target_y }, // target
        { x: 1, y: 1 }, // velocity
        opts.colour, // colour
        true) // use physics
    );
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

  explode_at: function(fn) { f.explodeAt(fn) },
  on_click: function(fn) { f.onClick(fn) },
  on_move: function(fn) { f.onMove(fn) },

  // utils

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
        'smallStar': FireworkExplosions.smallStar,
    }[type];
  },

  optDefaults: function(opts) {
    var opts = opts || {};
    if (typeof(opts.x) === 'undefined')
        opts.x = window.innerWidth / 2;

    if (typeof(opts.y) === 'undefined')
        opts.y = 0;

    if (typeof(opts.target_x) === 'undefined')
        opts.target_x = Math.random() * window.innerWidth;

    if (typeof(opts.target_y) === 'undefined')
        opts.target_y = Math.random() * window.innerHeight;

    if (typeof(opts.colour) === 'undefined') {
        opts.colour = Math.floor(Math.random() * 100) * 12;
    } else {
        opts.colour = f.getColour(opts.colour);
    }

    if (typeof(opts.type) === 'undefined') {
        opts.type = 'star';
        opts.type = f.getExplosionType(opts.type);
    } else {
        opts.type = f.getExplosionType(opts.type);
    }

    if (typeof(opts.repeat) === 'undefined')
        opts.repeat = 1;

    if (typeof(opts.wait) === 'undefined')
        opts.wait = 0;

    return opts;
  },

  realColourHSLValues: {
    'red': 1,
    'orange': 20 * 5,
    'yellow': 40 * 5,
    'green': 80 * 5,
    'cyan': 120 * 5,
    'blue': 160 * 5,
    'violet': 180 * 5,
    'magenta': 200 * 5,
    'pink': 220 * 5
  },

  getColour: function(colour) {
    return f.realColourHSLValues[colour.toLowerCase()];
  },

  Firework: function(opts) {
    var self = this;
    var opts = f.optDefaults(opts);
    this.x = opts.x;
    this.y = opts.y;
    this.direction = opts.direction;
    this.height = opts.height ? window.innerHeight - opts.height : null;
    this.colour = opts.colour;
    this.repeat = opts.repeat;
    this.wait = opts.wait;

    var perform = function() {
      Fireworks.createParticle(
        {x: self.x, y: self.y}, // position
        {y: self.height}, // target height
        {x:self.direction}, // velocity
        self.colour); // colour hue
    };

    var performIn = function(seconds) {
      window.setTimeout(function() { perform() }, seconds*1000);
    };

    this.launch = function() {
      for(var i=0; i < self.repeat; i++) {
        performIn(this.wait*i);
      }
    };

    this.launch_in = this.launchIn = function(seconds) {
      window.setTimeout(function() { self.launch() }, seconds*1000);
    };
  }
};
