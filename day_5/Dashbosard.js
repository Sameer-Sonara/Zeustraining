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
menuwrapper.addEventListener('mouseleave' , () => {
    timeout = setTimeout(() => {
        dropdown.style.display = 'none';
    }, 500);
});
menutoggle.addEventListener('click', (e)=> {
    e.stopPropagation();
    dropdown.style.display = 'flex';
});

document.addEventListener('click', (e)=> {
    if(!dropdown.contains(e.target))
    dropdown.style.display = 'none';
});