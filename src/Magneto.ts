export class Magneto {
  private readonly triggerArea: number;
  private readonly domEl: HTMLElement;
  private domElRect: DOMRect;
  posX: number;
  posY: number;

  constructor(domEl: HTMLElement, triggerArea: number = 200) {
    this.domEl = domEl;
    this.domElRect = this.domEl.getBoundingClientRect();
    this.triggerArea = triggerArea;
    this.posX = 0;
    this.posY = 0;
    this.observer();
    this.resize();
  }

  observer() {
    const options = {
      rootMargin: '0px',
      threshold: 0,
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
  }

  onMouseMove(e: MouseEvent) {
    const mousePos = { x: e.pageX, y: e.pageY };
    console.log(mousePos);
    
    const triggerAreaFromMouseToCenter = this.mouseTracker(mousePos);

    (triggerAreaFromMouseToCenter < this.triggerArea) 
      ? this.setTargetHolder(mousePos)
      : this.setTargetHolder({ x: 0, y: 0 });
  };

  setTargetHolder(mousePosition: { x: number; y: number }) {
    const targetHolder = {
      x: (mousePosition.x - (this.domElRect.left + this.domElRect.width / 2)) * 0.2,
      y: (mousePosition.y - (this.domElRect.top + this.domElRect.height / 2)) * 0.2,
    };

    this.posX = targetHolder.x;
    this.posY = targetHolder.y;
    
    this.domEl.style.setProperty('--posX', `${this.posX}px`);
    this.domEl.style.setProperty('--posY', `${this.posY}px`);
  }

  mouseTracker(mousePosition: { x: number; y: number; }) {
    return Math.hypot(
      mousePosition.x -
        (this.domElRect.left + this.domElRect.width / 2),
      mousePosition.y -
        (this.domElRect.top + this.domElRect.height / 2)
    );
  }

  resize() {
    window.addEventListener('resize', () => {
      this.domElRect = this.domEl.getBoundingClientRect();
    });
  }
}