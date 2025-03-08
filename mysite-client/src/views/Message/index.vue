<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import * as msgApi from "@/api/message";
import { server_URL } from "@/urlConfig";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
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
    async fetchData() {
      const result = await msgApi.getMessages(this.page, this.limit);
      for (const item of result.rows) {
        item.avatar = server_URL + item.avatar;
      }
      return result;
    },
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
    async handleSubmit(data, callback) {
      const resq = await msgApi.postMessage(data);
      this.data.rows.unshift(resq);
      this.data.total++;
      callback("感谢您的留言");
    },
  },
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  padding: 25px 0;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
