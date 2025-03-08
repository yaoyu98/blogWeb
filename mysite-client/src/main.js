//入口文件
// import "@/mock";
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import showMessage from "@/utils/showMessage";
Vue.prototype.$showMessage = showMessage;

//全局定义指令
import vLoading from "@/directives/loading";
import vLazy from "@/directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);

import store from "./store";
store.dispatch("setting/fetchSetting");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import "./eventBus";

//简单测试api
// import * as blogApi from "@/api/blog";
// blogApi.getBlogs(2, 10, 3).then((r) => console.log("博客", r));
// blogApi.getBlogTypes().then((r) => console.log("博客分类", r));

//测试mockapi
// import * as blogApi from "@/api/blog";
// blogApi.getBlog().then((r) => console.log("单个博客", r));

// blogApi.postComment().then((r) => console.log("提交评论", r));

// blogApi.getComments(-1,1,10).then((r) => console.log("分页评论", r));

//简单测试事件总线
// import eventBus from "./eventBus";

// function handler1(data) {
//   console.log("handler1", data);
// }
// function handler2(data) {
//   console.log("handler2", data);
// }
// eventBus.$on("event1", handler1);
// eventBus.$on("event1", handler2);
// eventBus.$on("event2", handler1);

// window.eventBus = eventBus;
// window.handler1 = handler1;
// window.handler2 = handler2;

//测试
// import { getSetting } from "@/api/setting";
// getSetting().then((r) => console.log("获取全局设置", r));

//测试message
// import { getMessage } from "@/api/message";
// getMessage().then((r) => console.log("获取消息", r));
