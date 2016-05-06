function tjoho() {
	 /* body... */ 
}
var sun = new Image();
var mars = new Image(50, 50);
var moon = new Image();
var uranus = new Image();
var planets = [];
var c = document.getElementById('space');
var ctx = c.getContext('2d');
var cX = c.offsetWidth/2;
var cY = c.offsetHeight/2;

var cPosition = {
  x: c.offsetLeft,
  y: c.offsetTop
}; 

c.addEventListener('click', function(e) {
   var mouse = {
      x: e.pageX - cPosition.x,
      y: e.pageY - cPosition.y 
   };

   if (e.region) {
     console.log('träff');
   }

   for (var i = 0; i < planets.length; i++) {
     planets[i].handleClick(mouse);
   }
});

function Planet(name, src, radius, width, height, speed, startPosition) {
   var _img = new Image();
   _img.src = src; 
   var _time = 0;

   this.init = function() {
      ctx.fillStyle = '#000000';
      ctx.strokeStyle = '#000000';
      ctx.save();
      ctx.translate(cX, cY);

      ctx.rotate( ((2*Math.PI)/6)*startPosition );
      ctx.translate(radius,0);
      ctx.drawImage(_img,-40,0, width, height);    
      //ctx.addHitRegion({id: name});

      ctx.restore();
      ctx.beginPath();
      ctx.arc(cX, cY, radius, 0, Math.PI*2, false);
      ctx.stroke();
      ctx.closePath();
  }

  this.animation = function(){
      _time = startPosition;
      ctx.fillStyle = '#000000';
      ctx.strokeStyle = '#000000';
      ctx.save();
      ctx.translate(cX, cY);

      ctx.rotate( ((2*Math.PI)/6)*(_time+=speed) );
      ctx.translate(radius,0);
      ctx.drawImage(_img,-40,0, width, height);  
      

      ctx.restore();
      ctx.beginPath();
      ctx.arc(cX, cY, radius, 0, Math.PI*2, false);
      ctx.stroke();
      ctx.closePath();
  }

  this.handleClick = function(mouse) {
    var _start = {
      x: cX * ((2*Math.PI)/6)*startPosition,
      y: cY * ((2*Math.PI)/6)*startPosition
    };

     

        // hit test succeeded, handle the click event!
    
    
  }
}

planets.push(
  new Planet('uranus', 'img/uranus.svg', 280, 200, 200, 0.01, 5),
  new Planet('mars', 'img/mars.svg', 250, 100, 100, 0.005, 1),
  new Planet('moon', 'img/moon.svg', 180, 50, 50, 0.002, 10)
);

var sun = new Sun('sun', 'img/sun.svg', 200, 200);

function Sun(name, src, height, width) {
  this.init = function() {
    var _img = new Image();
    _img.src = src; 
    ctx.drawImage(_img, cX-(width/2), cY-(height/2), width, height);    
  }
}
   
setInterval(draw, 20);

function draw(){
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1000, 1000);

  for (var i = 0; i < planets.length; i++) {
    planets[i].init();
  }
  sun.init();
}




   

/*function draw() {
    sun.src = 'img/sun.svg';
    mars.src = 'img/mars.svg';
    mars.id = 'mars';
    
    var ctx = document.getElementById('space').getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0,0,1000,1000); // clear canvas

    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.save();
    ctx.translate(150,300);

    //Mars
    
    ctx.rotate( ((2*Math.PI)/6)*(time+=0.01) );
    ctx.translate(100,0);
    ctx.drawImage(mars,-25,0, 50, 50);

    ctx.restore();
    ctx.beginPath();
    ctx.arc(150,300,105,0,Math.PI*2,false); // Earth orbit
    ctx.stroke();

    window.requestAnimationFrame(draw);
}*/

