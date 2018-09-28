Observer based on IntersectObserver

```js
import Observer from '@liuhanqu/observer';

// 适用于懒加载图片或者iframe
let ob1 = new Observer('.lazy', {});

ob1.serve();

// 适用于底部加载更多
let ob2 = new Observer('.j-more', {
  onIntersect() {
    // fetch data
  },
  unobserverAfterIntersect: false,
  isLazy: false,
});

ob2.serve();
```
