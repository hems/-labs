// Generated by CoffeeScript 1.4.0
var PicoParticle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PicoParticle = (function(_super) {

  __extends(PicoParticle, _super);

  PicoParticle.prototype.pico = null;

  PicoParticle.prototype.ratio = null;

  PicoParticle.prototype.freq = null;

  PicoParticle.prototype.pan = 0;

  function PicoParticle(mass) {
    PicoParticle.__super__.constructor.call(this, mass);
    pico.play(this.sinetone(55));
  }

  PicoParticle.prototype.sinetone = function(freq) {
    var phase,
      _this = this;
    this.freq = freq;
    phase = 0;
    this.phase_step = this.freq / pico.samplerate;
    return {
      process: function(L, R) {
        var i, wave, _results;
        i = 0;
        wave = null;
        _results = [];
        while (i < L.length) {
          wave = Math.sin(6.28318 * phase) * 0.25;
          L[i] = wave * (1 - Math.max(0, _this.pan));
          R[i] = wave * (1 + Math.min(0, _this.pan));
          phase += _this.phase_step;
          _results.push(i++);
        }
        return _results;
      }
    };
  };

  PicoParticle.prototype.update = function(dt, index) {
    PicoParticle.__super__.update.call(this, dt, index);
    this.ratio = {
      x: this.pos.x / $(document).width(),
      y: this.pos.y / $(document).height()
    };
    this.pan = (this.ratio.x - .5) * 2;
    this.freq = 55 * (2 * this.ratio.x);
    return this.phase_step = this.freq / pico.samplerate;
  };

  return PicoParticle;

})(Particle);