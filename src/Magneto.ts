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
        this.domEl.classList.toggle('active', entry.isIntersecting);
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
    this.domElRect = this.domEl.getBoundingClientRect();
    const checkTriggerArea = this.calcTriggerArea(e.clientX, e.clientY);

    if (!checkTriggerArea) {
      this.stopMouseTracker();
      return
    }

    const getMousePosToCenterElX = e.clientX - (this.domElRect.left + this.domEl.offsetWidth / 2);
    const getMousePosToCenterElY = e.clientY - (this.domElRect.top + this.domEl.offsetHeight / 2);
    const movementArea = this.triggerArea * this.movementRatio;
    const movementRatioX = Math.round((getMousePosToCenterElX / this.triggerArea) * movementArea);
    // const movementRatioY = (getMousePosToCenterElY / movementArea) * this.triggerArea;

    // this.posX = Math.min(Math.max(movementRatioX, -this.triggerArea), this.triggerArea);
    // this.posY = Math.min(Math.max(movementRatioY, -this.triggerArea), this.triggerArea);

    this.posX = movementRatioX;
    this.posY = getMousePosToCenterElY / movementArea;
    console.log(movementRatioX);
    // console.log(this.posX, this.posY, movementArea);
    
    this.setElementPos();
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

  clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  setElementPos() {
    this.domEl.style.setProperty('--posX', `${this.posX}%`);
    this.domEl.style.setProperty('--posY', `${this.posY}%`);
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.domElRect = this.domEl.getBoundingClientRect();
    });
  }
}