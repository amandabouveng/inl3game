class Planet {
	
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.createPlanet();
	}

 	createPlanet() {
		/*var _space = document.getElementById("space");
		var space= canvas.getContext("2d");
		ctx.beginPath();
		ctx.arc(95,50,40,0,2*Math.PI);
		ctx.stroke();*/
		//console.log('hej');
	}
}

var planet = new Planet (10, 10, 10);

console.log(planet);

//planets.push(new Planet(50,70), new Planet(20,100), new Planet(100,10));

/*for (var i = 0; i < planets.length; i++) {
	planets[i].createPlanet();
}*/