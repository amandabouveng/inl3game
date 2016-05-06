var sun = new Image();
var mars = new Image(50, 50);
var moon = new Image();
var uranus = new Image();
var time = 0;
var planets = [];
var c = document.getElementById('space');
var ctx = c.getContext('2d');

function Planet(name, src, x, y, width, height) {
  
   var _img = new Image();
   _img.src = src; 

   this.init = function() {
     
      //ctx.globalCompositeOperation = 'destination-over';
      
      //ctx.clearRect(0,0,1000,1000); // clear canvas

      ctx.fillStyle = '#000000';
      ctx.strokeStyle = '#000000';
      ctx.save();
      ctx.translate(x, y);

      //Mars

      ctx.rotate( ((2*Math.PI)/6)*(time+=0.01) );
      ctx.translate(100,0);
      ctx.drawImage(_img,-50,0, width, height);

      ctx.restore();
      ctx.beginPath();
      ctx.arc(x, y, 105, 0, Math.PI*2, false); // Earth orbit
      ctx.stroke();
      ctx.closePath();
  }
}

planets.push(
  new Planet('uranus', 'img/uranus.svg', 100, 100, 20, 20),
  new Planet('mars', 'img/mars.svg', 150, 300, 100, 100)
);
   
setInterval(draw, 20);

function draw(){
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1000, 1000);


  for (var i = 0; i < planets.length; i++) {
    planets[i].init();
  }
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

