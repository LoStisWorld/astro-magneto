export class Magneto {
  private readonly triggerArea: number;
  private readonly domEl: HTMLElement;
  private domElRect: DOMRect;
  private posX: number;
  private posY: number;
  private movementRatio: number;

  constructor(domEl: HTMLElement, movementRatio = 0.1) {
    this.domEl = domEl;
    this.domElRect = this.domEl.getBoundingClientRect();
    this.triggerArea = +getComputedStyle(this.domEl).getPropertyValue('--triggerArea');
    this.onMouseMove = this.onMouseMove.bind(this);
    this.posX = 0;
    this.posY = 0;
    this.movementRatio = movementRatio;
    this.observer();
    this.onResize();
  }

  observer() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.isIntersecting ? this.startMouseTracker() : this.stopMouseTracker();
        this.domEl.classList.toggle('active', entry.isIntersecting);
      });
    }, options);
    observer.observe(this.domEl);
  }

  startMouseTracker() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  stopMouseTracker() {
    window.removeEventListener('mousemove', this.onMouseMove);
    this.posX = 0;
    this.posY = 0;
    this.moveElementPos();
  }

  onMouseMove(e: MouseEvent) {
    const getMousePosToCenterElX = this.domElRect.left + this.domElRect.width;
    const getMousePosToCenterElY = this.domElRect.top + this.domElRect.height;
    const getElementTriggerAreaX = Math.round(e.pageX - getMousePosToCenterElX);
    const getElementTriggerAreaY = Math.round(e.pageY - getMousePosToCenterElY);
    
    if (Math.abs(getElementTriggerAreaX) < this.triggerArea || Math.abs(getElementTriggerAreaY) < this.triggerArea) {
      const movementArea = this.movementRatio * this.triggerArea;
      console.log({getElementTriggerAreaX, getElementTriggerAreaY});
      // console.log({getMousePosToCenterElX});
      // this.setElementPos({ x: deltaX, y: deltaY});
    } else {
      // this.setElementPos({ x: 0, y: 0 });
    }
  }
  
  setElementPos(deltaPos: { x: number; y: number }) {
    this.posX = deltaPos.x;
    this.posY = deltaPos.y;
    this.moveElementPos();
  }

  moveElementPos() {
    this.domEl.style.setProperty('--posX', `${this.posX}px`);
    this.domEl.style.setProperty('--posY', `${this.posY}px`);
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.domElRect = this.domEl.getBoundingClientRect();
    });
  }
}



// export class Magneto {
//   private readonly triggerArea: number;
//   private readonly domEl: HTMLElement;
//   private domElRect: DOMRect;
//   private posX: number;
//   private posY: number;

//   constructor(domEl: HTMLElement) {
//     this.domEl = domEl;
//     this.domElRect = this.domEl.getBoundingClientRect();
//     this.triggerArea = +getComputedStyle(this.domEl).getPropertyValue('--triggerArea');
//     this.onMouseMove = this.onMouseMove.bind(this);
//     this.posX = 0;
//     this.posY = 0;
//     this.observer();
//     this.onResize();    
//   }

//   observer() {
//     const options = {
//       rootMargin: '0px',
//       threshold: 0.1,
//     };

//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         entry.isIntersecting ? this.startMouseTracker() : this.stopMouseTracker();
//         this.domEl.classList.toggle('active', entry.isIntersecting)
//       });
//     }, options);
//     observer.observe(this.domEl);
//   }

//   startMouseTracker() {
//     window.addEventListener('mousemove', this.onMouseMove);
//   }

//   stopMouseTracker() {
//     window.removeEventListener('mousemove', this.onMouseMove);
//     this.posX = 0;
//     this.posY = 0;
//     this.moveElementPos();
//   }

//   onMouseMove(e: MouseEvent) {
//     const mousePos = { x: e.pageX, y: e.pageY };
//     const getMousePosToCenterElX = mousePos.x - (this.domElRect.left + this.domElRect.width / 2);
//     const getMousePosToCenterElY = mousePos.y - (this.domElRect.top + this.domElRect.height / 2);
// console.log(getMousePosToCenterElX < this.triggerArea);

//     (getMousePosToCenterElX < this.triggerArea || getMousePosToCenterElY < this.triggerArea)
//       ? this.setElementPos(mousePos)
//       : this.setElementPos({ x: 0, y: 0 }); 
//   }

//   setElementPos(mousePos: { x: number; y: number }) {
//     const centerX = this.domElRect.left + this.domElRect.width / 2;
//     const centerY = this.domElRect.top + this.domElRect.height / 2;

//     const distanceFromCenter = Math.sqrt((mousePos.x - centerX) ** 2 + (mousePos.y - centerY) ** 2);

//     if (distanceFromCenter < this.triggerArea) {
//       const targetPos = {
//         x: mousePos.x - centerX,
//         y: mousePos.y - centerY,
//       };

//       this.posX = targetPos.x;
//       this.posY = targetPos.y;
//     } else {
//       this.posX = 0;
//       this.posY = 0;
//     }

//     this.moveElementPos();
//   }

//   moveElementPos() {
//     this.domEl.style.setProperty('--posX', `${this.posX}px`);
//     this.domEl.style.setProperty('--posY', `${this.posY}px`);
//   }

//   onResize() {
//     window.addEventListener('resize', () => {
//       this.domElRect = this.domEl.getBoundingClientRect();
//     });
//   }
// }