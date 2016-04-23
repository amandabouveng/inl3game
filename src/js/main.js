class Planet {
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
		createPlanet();
	}
 	
 	createPlanet() {
		//var _planet = document.createElement('div');
		//_planet.style.
	}

}

var planets = [];

planets.push(new Planet(50,70), new Planet(20,100), new Planet(100,10));

for (var i = 0; i < planets.length; i++) {
	planets[i].createPlanet();
}