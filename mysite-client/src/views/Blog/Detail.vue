<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import { getBlog } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment";
import mainScroll from "@/mixins/mainScroll";
import { titleController } from "@/utils";
export default {
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  mixins: [fetchData(null), mainScroll("mainContainer")],
  methods: {
    async fetchData() {
      let resp = await getBlog(this.$route.params.id);
      // resp = null;
      if (!resp) {
        //如果拿不到响应结果，则直接跳转到404页面
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style lang="less" scoped>
.main-container {
  padding: 20px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.right-container {
  padding: 20px;
  width: 300px;
  position: relative;
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
}
</style>
