export class Magneto {
  private readonly triggerArea: number;
  private readonly domEl: HTMLElement;
  private domElRect: DOMRect;
  private posX: number;
  private posY: number;

  constructor(domEl: HTMLElement, triggerArea: number = 200) {
    this.domEl = domEl;
    this.domElRect = this.domEl.getBoundingClientRect();
    this.triggerArea = triggerArea;
    this.posX = 0;
    this.posY = 0;
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
        this.domEl.classList.toggle('active', entry.isIntersecting)
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
    const mousePos = { x: e.pageX, y: e.pageY };
    const getMousePosToCenterElX = mousePos.x - (this.domElRect.left + this.domElRect.width / 2);
    const getMousePosToCenterElY = mousePos.y - (this.domElRect.top + this.domElRect.height / 2);

    (getMousePosToCenterElX < this.triggerArea || getMousePosToCenterElY < this.triggerArea)
      ? this.setElementPos(mousePos)
      : this.setElementPos({ x: 0, y: 0 });
  }

  // mouseTracker(mousePos: { x: number; y: number; }) {
  //   return Math.hypot(
  //     mousePos.x - (this.domElRect.left + this.domElRect.width / 2),
  //     mousePos.y - (this.domElRect.top + this.domElRect.height / 2)
  //   );
  // }

  setElementPos(mousePos: { x: number; y: number }) {
    const targetPos = {
      x: mousePos.x - (this.domElRect.left + this.domElRect.width / 2),
      y: mousePos.y - (this.domElRect.top + this.domElRect.height / 2)
    };

    this.posX = targetPos.x;
    this.posY = targetPos.y;
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