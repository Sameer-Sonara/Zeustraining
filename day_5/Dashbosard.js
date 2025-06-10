const menuwrapper = document.querySelector('.Menu-Wrapper'); 
const dropdown = document.querySelector('.Drop-Down'); 
const menutoggle = document.querySelector('.Menu-toggle'); 

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
    dropdown.style.display = 'none' , x=0;;
});

