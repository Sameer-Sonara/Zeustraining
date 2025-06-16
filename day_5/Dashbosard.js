const menuwrapper = document.querySelector('.Menu-Wrapper'); 
const dropdown = document.querySelector('.Drop-Down'); 
const menutoggle = document.querySelector('.Menu-toggle'); 
const dropdownItems = document.querySelectorAll('.Drop-Down-Items');
const trigger = document.querySelectorAll('.arrow-text');
const submenu = document.querySelectorAll('.Sub-menu');
const icon = document.querySelectorAll('.Drop-down-icon');

console.log("Menu Wrapper:", menuwrapper);
console.log("Menu Toggle:", menutoggle);
console.log("Dropdown:", dropdown);
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

document.querySelector('.footer-btn').addEventListener('click', function () {
    const dropdown = document.querySelector('.announcements-drop');
    dropdown.classList.toggle('expanded');
    
    this.textContent = dropdown.classList.contains('expanded') ? 'SHOW LESS' : 'SHOW ALL';
});

const announcement = document.querySelector('.announcements');
announcement.addEventListener('mouseenter' , function ()
{
    const announcementDropDown = document.querySelector('.announcements-drop');
    announcementDropDown.style.display = "block";
});
announcement.addEventListener('mouseleave' , function ()
{
    const announcementDropDown = document.querySelector('.announcements-drop');
    timeout = setTimeout(() => {
        announcementDropDown.style.display = "none";
        }, 0);
    
    // console.log("hello sameer work");
});


const noti = document.querySelector('.alerts');
noti.addEventListener('mouseenter' , function ()
{
    const announcementDropDown = document.querySelector('.notifications-wrapper-alerts');
    announcementDropDown.style.display = "block";
    // console.log("hello sameer work");
});noti
noti.addEventListener('mouseleave' , function ()
{
    const announcementDropDown = document.querySelector('.notifications-wrapper-alerts');
    timeout = setTimeout(() => {
        announcementDropDown.style.display = "none";
        }, 0);
    
    // console.log("hello sameer work");
});

document.querySelector('.footer-btn-noti').addEventListener('click', function () {
    const dropdown = document.querySelector('.notifications-wrapper-alerts');
    dropdown.classList.toggle('extend');
    
    this.textContent = dropdown.classList.contains('extend') ? 'SHOW LESS' : 'SHOW ALL';
});
window.addEventListener("resize", onScreenResize);

