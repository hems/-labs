

class PicoParticle extends Particle

	pico : null

	ratio : null

	freq: null

	# from -1 to 1
	pan: 0

	constructor: ( mass ) ->
		super mass

		pico.play @sinetone( 440 )

	sinetone : (@freq) ->

		phase       = 0
		@phase_step = @freq / pico.samplerate

		process: (L, R) =>
			i = 0
			wave = null

			while i < L.length
				wave = Math.sin(6.28318 * phase) * 0.25;

				L[i] = wave * ( 1 - Math.max( 0, @pan ) )
				R[i] = wave * ( 1 + Math.min( 0, @pan ) )

				phase += @phase_step

				i++

	update: (dt, index) ->
		super dt, index

		@ratio =
			x: @pos.x / $( document ).width()
			y: @pos.y / $( document ).height()


		# scale screen ratio ( 0 to 1 ) to pan ratio ( -2 to 2 )
		@pan = ( @ratio.x - .5 ) * 4;

		@freq = 55 * ( 2 * ( 1 - @ratio.y ) )

		@phase_step = @freq / pico.samplerate