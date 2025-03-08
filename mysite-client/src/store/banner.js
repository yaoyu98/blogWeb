import { getBanners } from "@/api/banner";
import { server_URL } from "@/urlConfig";
export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchBanners(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      ctx.commit("setLoading", true);
      const resp = await getBanners();
      for (const item of resp) {
        item.midImg = server_URL + item.midImg;
        item.bigImg = server_URL + item.bigImg;
      }
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
    },
  },
};
