export class Magneto {
  domEl: Element;
  distance: number;
  viewportHeight: number;
  domElRect: DOMRect;

  constructor(element: Element, distance: number) {
    this.domEl = element;
    this.distance = distance;
    this.viewportHeight = window.innerHeight;
    this.domElRect = this.domEl.getBoundingClientRect();
    this.observer();
    this.resize();
  }

  observer() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          console.log('not in viewport');
        }
        if (entry.isIntersecting) {
          window.addEventListener('mousemove', (e) => {
            console.log(e.x, e.y);
          });
          console.log('in viewport');
        }
      })
    }, options);

    observer.observe(this.domEl);
  }

  mouseTracker(x: number, y: number) {

  }

  resize() { }
}