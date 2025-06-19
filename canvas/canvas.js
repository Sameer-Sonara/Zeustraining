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

let x = Math.random()*1000;
let y = Math.random()*1000;
let vx = (Math.random() - 0.5)*10;
let vy = (Math.random() - 0.5)*10;
let forward = true;
function anime()
{
    c.clearRect(0 , 0 , canvas.width , canvas.height);
    x+=vx;
    y+=vy;
    if (x <= 50 || x >= canvas.width-50) vx = -vx;
    if(y <= 50 || y >= canvas.height-50) vy = -vy;
    {
        forward = !forward;
    }
    c.beginPath();
    c.arc(x,y,50,0,Math.PI*2,false);
    c.strokeStyle = getRandomColor();
    c.stroke();


    requestAnimationFrame(anime);
}



anime();



// for(let i = 0 ; i<500 ; i++)
// {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerWidth;
//     c.beginPath();
//     c.arc(x,y,100,0,Math.PI*2,false);
//     let color
//     c.strokeStyle = getRandomColor();
//     c.stroke();
// }