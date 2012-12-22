### BalloonDemo ###
class BalloonDemo extends Demo

	lfo: 
		x: 0
		y: 0

	original: null

	constructor: ->
		super()

		@mouse = new PicoParticle
		@mouse.fixed = true

	setup: (full = yes) ->

		super full

		@physics.integrator = new ImprovedEuler()

		attraction = new Attraction @mouse.pos, 10000, 5000

		@original = new Vector()
		@original.x = $( window ).width() / 2
		@original.y = $( window ).height() / 2

		@mouse.pos.set @original.x, @original.y

		max = if full then 400 else 200
		max = 200

		for i in [0..max]

			p = new Particle (Random 0.1, 1.0)
			p.setRadius p.mass * 8

			p.behaviours.push new Wander 10
			p.behaviours.push attraction
			
			p.moveTo new Vector (Random @width), (Random @height)

			s = new Spring @mouse, p, (Random 30, 300), 1.0

			@physics.particles.push p
			@physics.springs.push s


	step: ->
		super()

		# retrun

		@lfo.x += 0.05 / 8
		@lfo.y += 0.1  / 8

		radius = 200

		@mouse.pos.x = @original.x + Math.cos( @lfo.x ) * radius * 2
		@mouse.pos.y = @original.y + Math.sin( @lfo.y ) * radius

		@mouse.update()

	### Handler for window mousemove event. ###
	mousemove: (event) =>

		return
		do event.preventDefault

		if event.touches and !!event.touches.length
			
			touch = event.touches[0]
			@mouse.pos.set touch.pageX, touch.pageY

		else

			@mouse.pos.set event.clientX, event.clientY