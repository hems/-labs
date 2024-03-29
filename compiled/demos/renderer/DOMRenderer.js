// Generated by CoffeeScript 1.4.0
/* DOM Renderer
*/

/*

	Updating styles:

	Nodes
*/

var DOMRenderer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DOMRenderer = (function(_super) {

  __extends(DOMRenderer, _super);

  function DOMRenderer() {
    this.setSize = __bind(this.setSize, this);
    DOMRenderer.__super__.constructor.apply(this, arguments);
    this.useGPU = true;
    this.domElement = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = 0;
    this.canvas.style.top = 0;
    this.domElement.style.pointerEvents = 'none';
    this.domElement.appendChild(this.canvas);
  }

  DOMRenderer.prototype.init = function(physics) {
    var el, mr, p, st, _i, _len, _ref;
    DOMRenderer.__super__.init.call(this, physics);
    _ref = physics.particles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      el = document.createElement('span');
      st = el.style;
      st.backgroundColor = p.colour;
      st.borderRadius = p.radius;
      st.marginLeft = -p.radius;
      st.marginTop = -p.radius;
      st.position = 'absolute';
      st.display = 'block';
      st.opacity = 0.85;
      st.height = p.radius * 2;
      st.width = p.radius * 2;
      this.domElement.appendChild(el);
      p.domElement = el;
    }
    el = document.createElement('span');
    st = el.style;
    mr = 20;
    st.backgroundColor = '#ffffff';
    st.borderRadius = mr;
    st.marginLeft = -mr;
    st.marginTop = -mr;
    st.position = 'absolute';
    st.display = 'block';
    st.opacity = 0.1;
    st.height = mr * 2;
    st.width = mr * 2;
    this.domElement.appendChild(el);
    return this.mouse.domElement = el;
  };

  DOMRenderer.prototype.render = function(physics) {
    var p, s, time, _i, _j, _len, _len1, _ref, _ref1;
    DOMRenderer.__super__.render.call(this, physics);
    time = new Date().getTime();
    if (this.renderParticles) {
      _ref = physics.particles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (this.useGPU) {
          p.domElement.style.WebkitTransform = "translate3d(" + (p.pos.x | 0) + "px," + (p.pos.y | 0) + "px,0px)";
        } else {
          p.domElement.style.left = p.pos.x;
          p.domElement.style.top = p.pos.y;
        }
      }
    }
    if (this.renderSprings) {
      this.canvas.width = this.canvas.width;
      this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      this.ctx.beginPath();
      _ref1 = physics.springs;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        s = _ref1[_j];
        this.ctx.moveTo(s.p1.pos.x, s.p1.pos.y);
        this.ctx.lineTo(s.p2.pos.x, s.p2.pos.y);
      }
      this.ctx.stroke();
    }
    if (this.renderMouse) {
      if (this.useGPU) {
        this.mouse.domElement.style.WebkitTransform = "translate3d(" + (this.mouse.pos.x | 0) + "px," + (this.mouse.pos.y | 0) + "px,0px)";
      } else {
        this.mouse.domElement.style.left = this.mouse.pos.x;
        this.mouse.domElement.style.top = this.mouse.pos.y;
      }
    }
    return this.renderTime = new Date().getTime() - time;
  };

  DOMRenderer.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    DOMRenderer.__super__.setSize.call(this, this.width, this.height);
    this.canvas.width = this.width;
    return this.canvas.height = this.height;
  };

  DOMRenderer.prototype.destroy = function() {
    var _results;
    _results = [];
    while (this.domElement.hasChildNodes()) {
      _results.push(this.domElement.removeChild(this.domElement.lastChild));
    }
    return _results;
  };

  return DOMRenderer;

})(Renderer);
