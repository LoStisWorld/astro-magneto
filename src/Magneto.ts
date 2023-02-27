export class Magneto {
  private readonly triggerArea: number;
  private readonly domEl: HTMLElement;
  private domElRect: DOMRect;
  private posX: number;
  private posY: number;
  private movementRatio: number;

  constructor(domEl: HTMLElement) {
    this.domEl = domEl;
    this.domElRect = this.domEl.getBoundingClientRect();
    this.triggerArea = +getComputedStyle(this.domEl).getPropertyValue('--triggerArea');
    this.movementRatio = +getComputedStyle(this.domEl).getPropertyValue('--movementRatio');
    this.onMouseMove = this.onMouseMove.bind(this);
    this.posX = 0;
    this.posY = 0;
    this.observer();
    this.onResize();
  }

  observer() {
    const options = {
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.isIntersecting ? this.startMouseTracker() : this.stopMouseTracker();
      });
    }, options);
    observer.observe(this.domEl);
  }

  startMouseTracker() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  stopMouseTracker() {
    this.posX = 0;
    this.posY = 0;
    this.setElementPos();
  }

  onMouseMove(e: MouseEvent) {
    // Update element position
    this.domElRect = this.domEl.getBoundingClientRect();
    // Check if mouse cursor is inside triggerArea
    const checkTriggerArea = this.calcTriggerArea(e.clientX, e.clientY);
    // Toggle element class if mouse cursor is inside triggerArea
    this.domEl.classList.toggle('active', checkTriggerArea);
    // Reset element position if mouse cursor is no longer inside triggerArea
    if (!checkTriggerArea) {
      this.stopMouseTracker();
      return
    }
    // Calculating element position on mouse cursor
    const dX = Math.round(e.clientX - (this.domElRect.left + this.domEl.offsetWidth / 2));
    const dY = Math.round(e.clientY - (this.domElRect.top + this.domEl.offsetHeight / 2)) * this.movementRatio;
    this.posX = dX
    this.posY = dY;
    console.log((dX * this.domEl.offsetWidth / 2) * this.movementRatio);
    
    // Set element to mouse cursor position
    // this.setElementPos();
  }

  calcTriggerArea(mouseX: number, mouseY: number) {
    // Check if the mouse cursor is within the triggerArea around the element
    const isInArea = (
      mouseX >= this.domElRect.left - this.triggerArea &&
      mouseX <= this.domElRect.right + this.triggerArea &&
      mouseY >= this.domElRect.top - this.triggerArea &&
      mouseY <= this.domElRect.bottom + this.triggerArea
    );

    return isInArea;
  }

  setElementPos() {
    this.domEl.style.setProperty('--posX', `${this.posX}px`);
    this.domEl.style.setProperty('--posY', `${this.posY}px`);
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.domElRect = this.domEl.getBoundingClientRect();
    });
  }
}