var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var Observer = /** @class */ (function () {
    function Observer(selector, option) {
        if (selector === void 0) { selector = '.lazy'; }
        var _this = this;
        this.selector = selector;
        this.intersectionCallback = function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                    var target = entry.target;
                    if (_this.onIntersect) {
                        _this.onIntersect(entry);
                    }
                    if (_this.unobserverAfterIntersect || _this.isLazy) {
                        _this.ob.unobserve(target);
                    }
                    if (!_this.isLazy || _this.elementHasLoad(target)) {
                        return;
                    }
                    _this.load(target);
                }
            });
        };
        var _a = option.unobserverAfterIntersect, unobserverAfterIntersect = _a === void 0 ? true : _a, _b = option.isLazy, isLazy = _b === void 0 ? true : _b, onIntersect = option.onIntersect, intersectionObserverInit = __rest(option, ["unobserverAfterIntersect", "isLazy", "onIntersect"]);
        this.unobserverAfterIntersect = unobserverAfterIntersect;
        this.isLazy = isLazy;
        this.onIntersect = onIntersect;
        this.intersectionObserverInit = intersectionObserverInit;
        this.init();
    }
    Observer.prototype.init = function () {
        this.ob = new IntersectionObserver(this.intersectionCallback, this.intersectionObserverInit);
    };
    Observer.prototype.getElements = function (selector) {
        if (selector instanceof Element) {
            return [selector];
        }
        return document.querySelectorAll(selector);
    };
    Observer.prototype.obseve = function () {
        var elements = this.getElements(this.selector);
        for (var i = 0, len = elements.length; i < len; i++) {
            var ele = elements[i];
            this.ob.observe(ele);
        }
    };
    Observer.prototype.elementHasLoad = function (el) {
        var loaded = el.getAttribute('data-load');
        return !!loaded;
    };
    Observer.prototype.load = function (el) {
        var src = el.getAttribute('data-src');
        if (!src) {
            return;
        }
        var onLoad = function () {
            el.removeEventListener('load', onLoad);
            el.setAttribute('data-loaded', 'true');
            //
        };
        el.addEventListener('load', onLoad);
        el.src = src;
        el.setAttribute('data-load', 'true');
    };
    return Observer;
}());
export default Observer;
//# sourceMappingURL=index.js.map