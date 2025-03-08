import { getSetting } from "@/api/setting";
import { titleController } from "@/utils";
export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
      state.data.avatar = "http://127.0.0.1:7001" + state.data.avatar;
      state.data.qqQrCode = "http://127.0.0.1:7001" + state.data.qqQrCode;
      state.data.weixinQrCode =
        "http://127.0.0.1:7001" + state.data.weixinQrCode;
    },
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const resp = await getSetting();
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
      // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
      if (resp.favicon) {
        let link = document.querySelector("link[rel='shortcut icon']");
        if (link) {
          return;
        }
        link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "image/x-icon";
        link.href = resp.favicon;
        document.querySelector("head").appendChild(link);
      }
      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    },
  },
};
