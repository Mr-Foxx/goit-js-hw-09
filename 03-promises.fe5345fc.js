function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequired7c6=o);var i=o("7Y9D8");const u=document.querySelector("form");function a(e,t){return new Promise(((r,n)=>{setTimeout((()=>{Math.random()>.3?r({position:e,delay:t}):n({position:e,delay:t})}),t)}))}u.addEventListener("submit",(function(t){t.preventDefault();const r=Number(t.target.delay.value),n=Number(t.target.step.value),o=Number(t.target.amount.value);for(let t=1;t<=o;t+=1){a(t,r+t*n).then((({position:t,delay:r})=>{e(i).Notify.success(`✅ Fulfilled promise ${t} in ${r}ms`)})).catch((({position:t,delay:r})=>{e(i).Notify.failure(`❌ Rejected promise ${t} in ${r}ms`)}))}t.target.reset()})),u.addEventListener("input",(function(){const t=Number(u.delay.value),r=Number(u.step.value),n=Number(u.amount.value);if(t<0||r<0||n<0)return void e(i).Notify.failure("Value must be greater than zero")}));
//# sourceMappingURL=03-promises.fe5345fc.js.map