export declare type Selector = string | HTMLElement;
export interface Option extends IntersectionObserverInit {
    unobserverAfterIntersect: boolean;
    isLazy: boolean;
    onIntersect: (entry: IntersectionObserverEntry) => void;
}
export default class Observer {
    private selector;
    private onIntersect;
    private unobserverAfterIntersect;
    private isLazy;
    private intersectionObserverInit;
    private ob;
    constructor(selector: Selector, option: Option);
    private init;
    private intersectionCallback;
    private getElements;
    obseve(): void;
    private elementHasLoad;
    private load;
}
