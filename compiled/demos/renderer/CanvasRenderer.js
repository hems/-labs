/* Canvas Renderer
*/
var CanvasRenderer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CanvasRenderer = (function(_super) {

  __extends(CanvasRenderer, _super);

  function CanvasRenderer() {
    this.setSize = __bind(this.setSize, this);    CanvasRenderer.__super__.constructor.apply(this, arguments);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.domElement = this.canvas;
  }

  CanvasRenderer.prototype.init = function(physics) {
    return CanvasRenderer.__super__.init.call(this, physics);
  };

  CanvasRenderer.prototype.render = function(physics) {
    var TWO_PI, dir, p, s, time, vel, _i, _j, _len, _len2, _ref, _ref2;
    CanvasRenderer.__super__.render.call(this, physics);
    time = new Date().getTime();
    vel = new Vector();
    dir = new Vector();
    this.canvas.width = this.canvas.width;
    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.lineWidth = 1;
    if (this.renderParticles) {
      TWO_PI = Math.PI * 2;
      _ref = physics.particles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        this.ctx.beginPath();
        this.ctx.arc(p.pos.x, p.pos.y, p.radius, 0, TWO_PI, false);
        this.ctx.fillStyle = '#' + (p.colour || 'FFFFFF');
        this.ctx.fill();
      }
    }
    if (this.renderSprings) {
      this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      this.ctx.beginPath();
      _ref2 = physics.springs;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        s = _ref2[_j];
        this.ctx.moveTo(s.p1.pos.x, s.p1.pos.y);
        this.ctx.lineTo(s.p2.pos.x, s.p2.pos.y);
      }
      this.ctx.stroke();
    }
    if (this.renderMouse) {
      this.ctx.fillStyle = 'rgba(255,255,255,0.1)';
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.pos.x, this.mouse.pos.y, 20, 0, TWO_PI);
      this.ctx.fill();
    }
    return this.renderTime = new Date().getTime() - time;
  };

  CanvasRenderer.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    CanvasRenderer.__super__.setSize.call(this, this.width, this.height);
    this.canvas.width = this.width;
    return this.canvas.height = this.height;
  };

  return CanvasRenderer;

})(Renderer);
