type ElementWithSrc = HTMLImageElement | HTMLIFrameElement;

export type Selector = string | HTMLElement;

export interface Option extends IntersectionObserverInit {
  unobserverAfterIntersect: boolean;
  isLazy: boolean;
  onIntersect: (entry: IntersectionObserverEntry) => void;
}

export default class Observer {
  private onIntersect: (entry: IntersectionObserverEntry) => void;
  private unobserverAfterIntersect: boolean;
  private isLazy: boolean;
  private intersectionObserverInit: IntersectionObserverInit;
  private ob!: IntersectionObserver;

  constructor(private selector: Selector = '.lazy', option: Option) {
    const {
      unobserverAfterIntersect = true,
      isLazy = true,
      onIntersect,
      ...intersectionObserverInit
    } = option;
    this.unobserverAfterIntersect = unobserverAfterIntersect;
    this.isLazy = isLazy;
    this.onIntersect = onIntersect;
    this.intersectionObserverInit = intersectionObserverInit;

    this.init();
  }

  private init() {
    this.ob = new IntersectionObserver(this.intersectionCallback, this.intersectionObserverInit);
  }

  private intersectionCallback: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        const target = entry.target;
        if (this.onIntersect) {
          this.onIntersect(entry);
        }
        if (this.unobserverAfterIntersect || this.isLazy) {
          this.ob.unobserve(target);
        }
        if (!this.isLazy || this.elementHasLoad(target)) {
          return;
        }
        this.load(target);
      }
    });
  };

  private getElements(selector: Selector) {
    if (selector instanceof Element) {
      return [selector];
    }
    return document.querySelectorAll(selector);
  }

  public obseve() {
    const elements = this.getElements(this.selector);

    for (let i = 0, len = elements.length; i < len; i++) {
      const ele = elements[i];
      this.ob.observe(ele);
    }
  }

  private elementHasLoad(el: Element) {
    const loaded = el.getAttribute('data-load');

    return !!loaded;
  }

  private load(el: Element) {
    const src = el.getAttribute('data-src');
    if (!src) {
      return;
    }
    const onLoad = () => {
      el.removeEventListener('load', onLoad);
      el.setAttribute('data-loaded', 'true');
      //
    };
    el.addEventListener('load', onLoad);

    (el as ElementWithSrc).src = src;

    el.setAttribute('data-load', 'true');
  }
}
