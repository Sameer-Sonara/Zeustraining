class backgroundBox 
{
    constructor() 
    {
      this.backgroundDiv = document.createElement('div');
      this.backgroundDiv.classList.add("background-div");
      document.body.appendChild(this.backgroundDiv);
    }
 
    get element() 
    {
      return this.backgroundDiv;
    }
}
 
class childBox 
{
    constructor(parent , BoxName) 
    {
      this.parent = parent;
      this.box = document.createElement('div');
      this.box.innerHTML =`${BoxName}`;
      this.box.classList.add("child");
      this.newleftpr = 0;
      this.newtoppr = 0;
      parent.appendChild(this.box);
      this.initialiseDrag();

      window.addEventListener('resize' , this.boxresize.bind(this));
    }
    boxresize()
    {
        const parentRect = this.parent.getBoundingClientRect();
        const curleft = this.newleftpr * (this.parent.clientWidth - 50);
        const curtop = this.newtoppr * (this.parent.clientHeight - 50);

        // const newleft = Math.min(curleft , parentRect.width - this.box.offsetWidth  );
        // const newtop = Math.min(curtop , parentRect.height - this.box.offsetHeight);

        
        this.box.style.left = `${curleft}px`;
        this.box.style.top = `${curtop}px`;
    }
 
    initialiseDrag() 
    {
      let offSetY = 0;
      let offSetX = 0;
 
      const onPointerDown = (e) => {
        e.preventDefault();
        const rect = this.box.getBoundingClientRect();
        offSetX = e.clientX - rect.left;
        offSetY = e.clientY - rect.top;
 
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
      };
 
      const onPointerMove = (e) => {
        const parentRect = this.parent.getBoundingClientRect();
        const newLeft = Math.min(
          Math.max(0, e.clientX - offSetX - parentRect.left),
          parentRect.width - this.box.offsetWidth - 3
        );
        const newTop = Math.min(
          Math.max(0, e.clientY - offSetY - parentRect.top),
          parentRect.height - this.box.offsetHeight - 3
        );

        console.log(this.parent.clientWidth)
        this.newleftpr = newLeft / (this.parent.clientWidth - 50);
        this.newtoppr = newTop / (this.parent.clientHeight - 50);
        // this.box.style.left = `${this.newleftpr}%`;
        // this.box.style.top = `${this.newtoppr}%`;

        console.log(this.newleftpr)
        console.log(this.newtoppr)
        this.box.style.left = `${newLeft}px`;
        this.box.style.top = `${newTop}px`;
      };
 
      const onPointerUp = () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };
 
      this.box.addEventListener('pointerdown', onPointerDown);
    }
  }
 
  const mainBox = new backgroundBox();
  const innerBox = new childBox(mainBox.element , "child1");


  const mainBox2 = new backgroundBox();
  const innerBox2 = new childBox(mainBox2.element , 'child2');

  
  const mainBox3 = new backgroundBox();
  const innerBox3 = new childBox(mainBox3.element , 'child3');

  
  const mainBox4 = new backgroundBox();
  const innerBox4 = new childBox(mainBox4.element , 'child4');