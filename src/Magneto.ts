export class Magneto {
  domEl: Element;
  distance: number;
  viewportHeight: number;

  constructor(element: Element, distance: number) {
    this.domEl = element;
    this.distance = distance;
    this.viewportHeight = window.innerHeight;
    this.observer();
    this.resize();
  }

  observer() {
    const options = {
      rootMargin: `${this.viewportHeight - (this.distance / 2)}px 0px`,
      threshold: 0.5
    }
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        
        if (!entry.isIntersecting) {
          console.log('not in viewport', options.rootMargin);
        }
        if (entry.isIntersecting) {
          console.log('in viewport', options.rootMargin);
        }
      })
    }, options);

    observer.observe(this.domEl);
  }

  resize() {}
}