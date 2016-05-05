function tjoho() {
	 /* body... */ 
}

var sun = new Image();
var mars = new Image(50, 50);
var moon = new Image();
var uranus = new Image();

function init(){
  	console.log(mars);
  	document.getElementById('space').addEventListener('click', draw);
  	window.requestAnimationFrame(draw);
}

function draw() {
	sun.src = 'img/sun.svg';
  	mars.src = 'img/mars.svg';
  	mars.id = 'mars';
  	
	var ctx = document.getElementById('space').getContext('2d');
  	ctx.globalCompositeOperation = 'destination-over';
  	ctx.clearRect(0,0,1000,1000); // clear canvas

  	ctx.fillStyle = '#000000';
  	ctx.strokeStyle = '#000000';
   	ctx.save();
  	ctx.translate(500,300);

    //Mars
    var time = new Date();
    ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  	ctx.translate(100,0);
  	ctx.drawImage(mars,-25,0, 50, 50);


  	ctx.restore();
  	ctx.beginPath();
  	ctx.arc(500,300,105,0,Math.PI*2,false); // Earth orbit
  	ctx.stroke();

 	window.requestAnimationFrame(draw);
}

  init();