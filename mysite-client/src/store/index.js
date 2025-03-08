import { Store, install } from "vuex";
import Vue from "vue";
import setting from "./setting";
import banner from "./banner";
import about from "./about";
import project from "./project";

if (!window.Vuex) {
  //如果使用CDN，会生成插件，无法使用use
  install(Vue);
}

const store = new Store({
  modules: {
    setting,
    banner,
    about,
    project,
  },
  strict: true,
});
export default store;
