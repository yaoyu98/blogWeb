<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      @submit="handleSubmit"
      :list="data.rows"
      :isListLoading="isLoading"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getComments, postComment } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
import { server_URL } from "@/urlConfig";
export default {
  components: { MessageArea },
  mixins: [fetchData({ total: 0, rows: [] })],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  //创建之后一定要销毁
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  //加载长度是否超过总数量
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    handleScroll(dom) {
      //正在加载中不去重复加载
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
    async fetchData() {
      const result = await getComments(
        this.$route.params.id,
        this.page,
        this.limit
      );
      for (const item of result.rows) {
        item.avatar = server_URL + item.avatar;
      }
      return result;
    },
    async handleSubmit(formData, callback) {
      const resq = await postComment({
        ...formData,
        blogId: this.$route.params.id,
      });
      this.data.rows.unshift(resq);
      this.data.total++;
      callback("评论成功");
    },
    //设置下拉滚动条加载更多
    async fetchMore() {
      //如果超过total就不再进行加载
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>
