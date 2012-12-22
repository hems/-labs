class Mixer

	@gens = [];
	@tmpL = new Float32Array(pico.cellsize);
	@tmpR = new Float32Array(pico.cellsize);

	@add = (gen) ->
		gens.push gen

	@remove = (gen) ->
		i = gens.indexOf gen

		if i isnt -1 
			gens.splice i, 1

	@process = ( L, R ) ->
		for i in [0..L.length]
			L[i] = R[i] = 0;
		
		for i in [0..gens.length]
			gens[i].process tmpL, tmpR

			for j in [j..L.length]
				L[j] += tmpL[j];
				R[j] += tmpR[j];