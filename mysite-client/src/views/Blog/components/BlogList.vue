<template>
  <div class="blog-list-container" v-loading="isLoading" ref="mainContainer">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{ name: 'BlogDetail', params: { id: item.id } }">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{ name: 'BlogDetail', params: { id: item.id } }">
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: { categoryId: item.category.id },
              }"
            >
              {{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import { getBlogs } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
import Pager from "@/components/Pager";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll";
import Empty from "@/components/Empty";
import { server_URL } from "@/urlConfig";
export default {
  components: {
    Pager,
    Empty,
  },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  computed: {
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },

  methods: {
    formatDate,
    async fetchData() {
      // console.log(await getBlogs());
      const result = await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
      for (const item of result.rows) {
        item.thumb = server_URL + item.thumb;
      }
      return result;
    },
    handlePageChange(newPage) {
      //通过点击事件，使用路由导航到对应地址
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      //导航到全部 否则导航到指定的分类
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          params: {
            categoryId: this.routeInfo.categoryId,
          },
          query,
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blog-list-container {
  overflow-y: scroll;
  position: relative;
  padding: 20px;
  width: 100%;
  height: 100%;
  line-height: 1.7;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  border-bottom: 1px solid @gray;
  display: flex;
  padding: 15px 0;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      border-radius: 5px;
      max-width: 200px;
      display: block;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
    .aside {
      font-size: 12px;
      color: @gray;
      span {
        margin-right: 15px;
      }
    }
    .desc {
      margin: 15px 0;
      font-size: 14px;
    }
  }
}
</style>
