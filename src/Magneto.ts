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

    const movementArea = this.triggerArea * this.movementRatio;
    const getMousePosToCenterElX = Math.round(
      e.clientX - (this.domElRect.left + this.domEl.clientWidth / 2)
    );
    const getMousePosToCenterElY = Math.round(e.clientY - (this.domElRect.top + this.domEl.offsetHeight / 2));

    // this.posX = movementRatioX;
    // this.posY = movementRatioY;
    console.log(getMousePosToCenterElX);
    // console.log(this.posX, this.posY, movementArea);
    
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
    this.domEl.style.setProperty('--posX', `${this.posX}%`);
    this.domEl.style.setProperty('--posY', `${this.posY}%`);
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.domElRect = this.domEl.getBoundingClientRect();
    });
  }
}