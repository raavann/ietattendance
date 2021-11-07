//change email border when selected
const email = document.querySelector('input[type="email"]');
const h = document.querySelector('h1');
const emailDiv = document.getElementById('email-field');
email.addEventListener('focus', (event)=>{
    emailDiv.style.borderColor = 'rgb(113, 169, 219)';
    emailDiv.style.boxShadow = '0px 0px 5px rgb(113, 169, 219)';
});

email.addEventListener('blur', (event)=>{
    emailDiv.style.borderColor = 'black';
    emailDiv.style.boxShadow = 'none';
});


// change password border when selected
const password = document.querySelector('input[type="password"]');

const passDiv = document.getElementById('password-field');
password.addEventListener('focus', (event)=>{
    passDiv.style.borderColor = 'rgb(113, 169, 219)';
    passDiv.style.boxShadow = '0px 0px 5px rgb(113, 169, 219)';
});

password.addEventListener('blur', (event)=>{
    passDiv.style.borderColor = 'black';
    passDiv.style.boxShadow = 'none';
});



// Circle Animations
// Referenced from 
     
var canvas  = document.getElementById("canvasArea"); 


var ctx = canvas.getContext( '2d' ),
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight,
avg = ( width + height ) / 2,
blobs = [],
speedRange = 1,
maxCombo = 8,
radius = rand(9,12),
count = avg * 0.5,
PI = Math.PI,
TWOPI = PI * 2;

var colors     = ['rgb(113, 169, 219)', 'rgb(92, 163, 226)', 'rgb(74, 166, 247)', 'rgb(154, 198, 236)', 'rgb(54, 154, 241)', 'rgb(73, 144, 206)', 'rgb(41, 151, 247)'];

function rand( min, max ) {
  return Math.random() * (max - min) + min;
}

function dist( p1, p2 ) {
  var dx = p1.x - p2.x,
      dy = p1.y - p2.y;
  return Math.sqrt( dx * dx + dy * dy );
}

function Blob(X, Y) {
  this.radius = radius;
  this.targetRadius = radius;

  this.x = X || rand( this.radius, width - this.radius );
  this.y = Y || rand( this.radius, height - this.radius );
  this.vx = rand( -speedRange, speedRange );
  this.vy = rand( -speedRange, speedRange );

  this.combineCount = 1;
  this.deathFlag = 0;

	this.color = colors[ Math.floor( Math.random() * colors.length)  ];
	this.lineWidth = Math.floor( Math.random() * 8);
}

Blob.prototype.update = function( i ) {
  if( this.deathFlag ) {
    blobs.splice( i, 1 );
    return;
  }
  if( this.combineCount >= maxCombo ) {
    var j = this.combineCount - 4;
    while( j-- ) {
      var blob = new Blob();
      blob.x = this.x;
      blob.y = this.y;
      blob.vx = rand( -speedRange, speedRange );
      blob.vy = rand( -speedRange, speedRange );
      blob.immuneFlag = 50;
      blobs.push( blob );
    }
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, 0, TWOPI );
    blobs.splice( i, 1 );
    return;
  }
  this.index = i;
  if( this.immuneFlag > 0 ) {
    this.immuneFlag--;
  }
  this.radius += ( this.targetRadius - this.radius ) * 0.2;
  this.x += this.vx;
  this.y += this.vy;
  this.wrapBounds();
  this.checkCollisions();
};

Blob.prototype.checkCollisions = function() {
  this.colliding = 0;
  var i = blobs.length;
  while( i-- ) {
    if( this.index != i ) {
      var other = blobs[ i ];
      if( !this.immuneFlag && dist( this, other ) <= this.radius + other.radius ) {
        if( this.radius >= other.radius ) {
          this.targetRadius += other.radius;
          this.combineCount += other.combineCount;
          other.deathFlag = 1;
        } else {
          other.targetRadius += this.radius;
          other.combineCount += this.combineCount;
          this.deathFlag = 1;
        }
        break;
      }
    }
  }
};

Blob.prototype.wrapBounds = function() {
  if( this.x + this.radius < 0 ) {
    this.x = width + this.radius;
  }
  if( this.x - this.radius > width ) {
    this.x = -this.radius;
  }
  if( this.y + this.radius < 0 ) {
    this.y = height + this.radius;
  }
  if( this.y - this.radius > height ) {
    this.y = -this.radius;
  }
};

Blob.prototype.render = function( i ) {
  ctx.beginPath();
  ctx.arc( this.x, this.y, this.radius, 0, TWOPI );

	ctx.lineWidth = this.lineWidth;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.fillStyle = this.color;
	ctx.fill();
};

function createBlobs() {
  for( var i = 0; i < width/10; i++ ) {
    blobs.push( new Blob() );

  }
}
var create = true;
function loop() {
  if(create){
  requestAnimationFrame( loop );
  ctx.clearRect( 0, 0, width, height );
  var i = blobs.length;
  while( i-- ) {
    blobs[ i ].update( i );
  }
  i = blobs.length;
  while( i-- ) {
    blobs[ i ].render();
  }
}
}

window.onload = function () {
	createBlobs();
	loop();
  const stop = document.querySelector('#stop');
  stop.addEventListener('click', ()=>{
    if(create){
      create = false;
      stop.innerHTML = "Start Animation!"
    } else {
      create = true;
      stop.innerHTML = "Stop Animation!"
      loop();
    }

  });

  let prevP = {x:0 , y:0};
  document.onmousemove = function (event) {
    let currP = {x:event.pageX, y:event.pageY}
    for (let index = 0; 
        index < 1 && 
        blobs.length < width/10 && 
        dist(prevP, currP) > 30; 
        index++) {
      prevP.x = currP.x; prevP.y=currP.y;
      blobs.push( new Blob(currP.x,currP.y) );
    }
  }
};