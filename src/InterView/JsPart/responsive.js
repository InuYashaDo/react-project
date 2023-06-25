import React from 'react';

export default function Responsive() {
  const data = {
    price: 5,
    count: 10,
  };

  let proxyCtx = null;
  let deps = {};
  let effect = null;
  let isFirst = true;

  function defineReactive(target) {
    proxyCtx = new Proxy(target, {
      get: (target, key) => {
        const matchEffects = deps[key];

        if (matchEffects && effect) {
          if (!matchEffects.includes(effect)) {
            deps[key].push(effect);
          }
        } else {
          deps[key] = [effect];
        }

        return target[key];
      },
      set: (target, key, newValue) => {
        target[key] = newValue;
        deps[key].forEach((effectItem) => effectItem());
        isFirst = false;
      },
    });
  }

  defineReactive(data);

  window.proxyCtx = proxyCtx;

  const render = () => {
    if (isFirst) {
      const div = document.createElement('div');
      div.innerHTML = `单价：${proxyCtx.price}, 总量：${proxyCtx.count},总价：${
        proxyCtx.price * proxyCtx.count
      }`;
      document.getElementsByTagName('body')[0].appendChild(div);
    } else {
      document.getElementsByTagName('div')[0].innerHTML = `单价：${
        proxyCtx.price
      }, 总量：${proxyCtx.count},总价：${proxyCtx.price * proxyCtx.count}`;
    }
  };

  effect = render;

  render();

  return <div>responsive</div>;
}
