// how to add activity on canvas
const canvas = document.querySelector('canvas')
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'); // make 2d elements

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
var point = 
{
    x : undefined,
    y : undefined
}
const radi = 0;
const N = 1500;
const circleArray = [];

function Circle(x , y , dx , dy , radi , thik , col)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radi = Math.random()*5;
    this.thik = thik;
    this.col = col;


    this.draw = function()
    {
      c.beginPath();
      c.arc(this.x,this.y,this.radi,0,Math.PI*2,false);
      c.lineWidth = this.thik;
      c.strokeStyle = this.col;
      c.stroke();
      c.fillStyle = this.col;
      c.fill();
    }
    
    this.update = function()
    {
      if (this.x <= this.radi || this.x >= canvas.width-this.radi) this.dx = -this.dx;
      if(this.y <= this.radi || this.y >= canvas.height-this.radi) this.dy = -this.dy;
      this.x+=this.dx;
      this.y+=this.dy;
      if(point.x-this.x<50 && point.x-this.x>-50 && point.y-this.y>-50 && point.y-this.y<50)
        {
            if(this.radi<40)
            this.radi +=1;
        }
        else if(this.radi >= 2)
        {
            this.radi-=1;
        }
        this.draw();
    }
}

for(let i = 0 ; i<N ; i++)
{
  let x = Math.random()*window.innerWidth;
  let y = Math.random()*window.innerHeight;
  let vx = (Math.random() - 0.5)*5;
  let vy = (Math.random() - 0.5)*5;
  let thik = Math.random()*2;
  let col = getRandomColor();
  circleArray.push(new Circle(x , y , vx , vy ,radi ,thik, col))
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Optional: reposition circles if they go out of bounds after resize
    for (let i = 0; i < circleArray.length; i++) {
        if (circleArray[i].x > canvas.width - circleArray[i].radi) {
            circleArray[i].x = canvas.width - circleArray[i].radi;
        }
        if (circleArray[i].y > canvas.height - circleArray[i].radi) {
            circleArray[i].y = canvas.height - circleArray[i].radi;
        }
    }
});
function anime()
{
    c.clearRect(0 , 0 , canvas.width , canvas.height);  
  for(let i = 0 ; i<circleArray.length ; i++)
  {
    circleArray[i].update();
  }
    
  // window.onresize = anime();

    requestAnimationFrame(anime);
}

window.addEventListener('mousemove' , function(event) 
{
    point.x = event.x;
    point.y = event.y;
    // if(event.x >= this.window.innerWidth || event.y >= this.window.innerHeight || event.x<this.window.innerWidth || event.y<window.innerHeight )
    // {
    //     point.x = undefined;
    //     point.y = undefined;
    // }
    console.log(point);
});

window.addEventListener('mouseout' , function ()
    {
        point.x = undefined ;
        point.y = undefined;
    }
);

anime();

