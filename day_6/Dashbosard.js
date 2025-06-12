const menuwrapper = document.querySelector('.Menu-Wrapper'); 
const dropdown = document.querySelector('.Drop-Down'); 
const menutoggle = document.querySelector('.Menu-toggle'); 
const dropdownItems = document.querySelectorAll('.Drop-Down-Items');
const trigger = document.querySelectorAll('.arrow-text');
const submenu = document.querySelectorAll('.Sub-menu');
const icon = document.querySelectorAll('.Drop-down-icon');

let timeout;
menuwrapper.addEventListener('mouseenter' , () =>{
    clearTimeout(timeout);
    dropdown.style.display = 'flex';
});
let x = 0;
menuwrapper.addEventListener('mouseleave' , () => {
    if(!x)
    {
        timeout = setTimeout(() => {
            dropdown.style.display = 'none';
            submenu.forEach(el => {
                el.style.display = "none";
            });
            icon.forEach(el =>{
            el.classList.remove('rotate');
        });
        }, 500);
        
        
    }
});
menutoggle.addEventListener('click', (e)=> {
    e.stopPropagation();
    dropdown.style.display = 'flex';
    x = 1;
});

document.addEventListener('click', (e)=> {
    if(!dropdown.contains(e.target))
    {
        dropdown.style.display = 'none' ;
        x=0;
        submenu.forEach(el => {
        el.style.display = "none";
        });
        icon.forEach(el =>{
            el.classList.remove('rotate');
        })
    }
});

// const allItems = document.querySelectorAll('.Drop-Down-Items');

for(let i = 0 ; i < 5 ; i++)
{
    trigger[i].addEventListener('click' , (e)=>{
        e.preventDefault();
        for(let j = 0 ; j <5 ; j++)
        {
            if(i != j)
            {
                icon[j].classList.remove('rotate');
                submenu[j].style.display = "none";
            }
        }

        if (submenu[i].style.display == "block") {
            submenu[i].style.display = "none";
            icon[i].classList.remove('rotate');
        }
        else {
            icon[i].classList.add('rotate');
            submenu[i].style.display = "block";
            
        }
        
    });
}
// allItems.forEach((item) => {
//   const trigger = item.querySelector('.arrow-text');
//   const submenu = item.querySelector('.Sub-menu');
//   const icon = item.querySelector('.Drop-down-icon');

//   trigger.addEventListener('click', (e) => {
//     e.preventDefault();

//     // If this submenu is already open
//     const isOpen = submenu.classList.contains('show');

//     // Close ALL submenus and arrows
//     document.querySelectorAll('.Sub-menu').forEach(el => el.classList.remove('show'));
//     document.querySelectorAll('.Drop-down-icon').forEach(el => el.classList.remove('show'));

//     // If it was not already open, open it
//     if (!isOpen) {
//       submenu.classList.add('show');
//       icon.classList.add('show');
//     }
//   });
// });

function onScreenResize() {
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if(windowWidth>=768)
    {
        dropdown.style.display = 'none';
    }
    submenu.forEach(el => {
        el.style.display = "none";
    });
    icon.forEach(el =>{
            el.classList.remove('rotate');
        })
        
}
window.addEventListener("resize", onScreenResize);