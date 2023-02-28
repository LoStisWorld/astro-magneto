export class Magneto {
  triggerArea: number;
  domEl: HTMLElement;
  rootmargin: string;
  domElRect: DOMRect;
  posX: number;
  posY: number;
  movementRatio: number;
  threshold: number | undefined;

  constructor(domEl: HTMLElement) {
    this.domEl = domEl;
    this.domElRect = this.domEl.getBoundingClientRect();
    this.triggerArea = +getComputedStyle(this.domEl).getPropertyValue('--triggerArea');
    this.movementRatio = +getComputedStyle(this.domEl).getPropertyValue('--movementRatio');
    this.onMouseMove = this.onMouseMove.bind(this);
    this.rootmargin = `${this.domEl.dataset.rootmargin}`;
    this.threshold = this.domEl.dataset.threshold ? +this.domEl.dataset.threshold : 0.5;
    this.posX = 0;
    this.posY = 0;
    this.observer();
    this.onResize();
  }

  observer() {
    const options = {
      rootMargin: this.rootmargin,
      threshold: this.threshold,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.isIntersecting ? this.startMouseTracker() : this.stopMouseTracker();
      });
    }, options);
    observer.observe(this.domEl);
  }

  startMouseTracker() {
    this.checkTriggerArea();
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
    const movementArea = this.triggerArea * this.movementRatio;
    const dX = Math.round(e.clientX - (this.domElRect.left + this.domEl.offsetWidth / 2)) * this.movementRatio;
    const dY = Math.round(e.clientY - (this.domElRect.top + this.domEl.offsetHeight / 2)) * this.movementRatio;

    this.posX = Math.round(dX > movementArea ? movementArea : dX < -movementArea ? -movementArea : dX);
    this.posY = Math.round(dY > movementArea ? movementArea : dY < -movementArea ? -movementArea : dY);

    // Set element to mouse cursor position
    this.setElementPos();
  }

  calcTriggerArea(mouseX: number, mouseY: number): boolean {
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

  checkTriggerArea() {
    if ((this.domEl.offsetWidth + this.triggerArea * 2) > innerWidth) {
      this.triggerArea = (innerWidth - this.domEl.offsetWidth) / 2;
    }

    if ((this.domEl.offsetHeight + this.triggerArea * 2) > innerHeight) {
      this.triggerArea = (innerHeight - this.domEl.offsetHeight) / 2;
    }
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.checkTriggerArea();
      this.domElRect = this.domEl.getBoundingClientRect();
    });
  }
}