"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Planet = function () {
	function Planet(x, y, r) {
		_classCallCheck(this, Planet);

		this.x = x;
		this.y = y;
		this.r = r;
		this.createPlanet();
	}

	_createClass(Planet, [{
		key: "createPlanet",
		value: function createPlanet() {
			/*var _space = document.getElementById("space");
   var space= canvas.getContext("2d");
   ctx.beginPath();
   ctx.arc(95,50,40,0,2*Math.PI);
   ctx.stroke();*/
			//console.log('hej');
		}
	}]);

	return Planet;
}();

var planet = new Planet(10, 10, 10);

console.log(planet);

//planets.push(new Planet(50,70), new Planet(20,100), new Planet(100,10));

/*for (var i = 0; i < planets.length; i++) {
	planets[i].createPlanet();
}*/
//# sourceMappingURL=main.js.map
