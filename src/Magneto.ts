export class Magneto {
  domEl: Element;

  constructor(element: Element) {
    this.domEl = element;
    this.trigger()
  }

  trigger() {
    console.log('loaded');
    
  }
}