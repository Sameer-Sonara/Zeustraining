const canvas = document.querySelector('canvas')
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'); // make 2d elements

// c.fillStyle  = 'rgba(255,0,0,0.5)';
// c.fillRect(20 , 20 ,50 , 50); // c.fillRect(x , y , widht , height);

// c.fillStyle  = 'rgba(0,255,0,0.5)';
// c.fillRect(150 , 70 ,50 , 50);
// //lines

// c.beginPath();
// c.moveTo(100 , 100);
// c.lineTo(300 , 100);
// c.strokeStyle = "#ccc"
// c.stroke();



function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}




// let x = Math.random()*1000;
// let y = Math.random()*1000;
// let vx = (Math.random() - 0.5)*10;
// let vy = (Math.random() - 0.5)*10;
// let forward = true;
// function anime()
// {
//     c.clearRect(0 , 0 , canvas.width , canvas.height);
//     x+=vx;
//     y+=vy;
//     if (x <= 50 || x >= canvas.width-50) vx = -vx;
//     if(y <= 50 || y >= canvas.height-50) vy = -vy;
//     {
//         forward = !forward;
//     }
//     c.beginPath();
//     c.arc(x,y,50,0,Math.PI*2,false);
//     c.strokeStyle = getRandomColor();
//     c.stroke();


//     requestAnimationFrame(anime);
// }



// anime();

const radi = 30;
const N = 500;
const circleArray = [];

function Circle(x , y , dx , dy , radi , thik , col)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radi = radi;
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

function anime()
{
    c.clearRect(0 , 0 , canvas.width , canvas.height);  
  for(let i = 0 ; i<circleArray.length ; i++)
  {
    circleArray[i].update();
  }

    requestAnimationFrame(anime);
}

anime();

