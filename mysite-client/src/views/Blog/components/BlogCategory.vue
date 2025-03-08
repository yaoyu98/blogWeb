<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { getBlogCategories } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
export default {
  components: {
    RightList,
  },
  mixins: [fetchData([])],
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.params.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      return [
        { id: -1, name: "全部", articleCount: totalArticleCount },
        ...this.data,
      ].map((it) => {
        return {
          ...it,
          isSelect: it.id === this.categoryId,
          aside: `${it.articleCount}篇`,
        };
      });
    },
  },
  methods: {
    async fetchData() {
      return await getBlogCategories();
    },
    handleSelect(item) {
      //通过点击事件，使用路由导航到对应地址
      const query = {
        page: 1,
        limit: this.limit,
      };
      //导航到全部 否则导航到指定的分类
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          params: {
            categoryId: item.id,
          },
          query,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
  h2 {
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 0;
  }
}
</style>
