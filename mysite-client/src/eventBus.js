// const listeners = {};
// //事件总线
// export default {
//   //监听事件
//   $on(eventName, handler) {
//     if (!listeners[eventName]) {
//       listeners[eventName] = new Set();
//     }
//     listeners[eventName].add(handler);
//   },
//   //取消事件
//   $off(eventName, handler) {
//     if (!listeners[eventName]) {
//       return;
//     }
//     listeners[eventName].delete(handler);
//   },
//   // 触发事件
//   $emit(eventName, ...args) {
//     if (!listeners[eventName]) {
//       return;
//     }
//     listeners[eventName].forEach((handler) => handler(...args));
//   },
// };
import Vue from "vue";
const app = new Vue();
Vue.prototype.$bus = app;
export default app;
