<template>
  <div class="app-container">
    <!-- 数据表格渲染 -->
    <el-table
      :data="data"
      v-loading="listLoading"
      element-loading-text="加载数据中"
      border
      highlight-current-row
      fit
    >
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }} </template>
      </el-table-column>
      <el-table-column prop="name" label="头像" align="center" width="80">
        <template slot-scope="scope">
          <el-image
            style="width: 60px"
            :src="scope.row.avatar"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="昵称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="评论文章" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.blog.title }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="评论内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="评论日期" width="230" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteCommentHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next ,total, ->, sizes, jumper"
      :total="count"
      style="margin-top: 30px"
      :page-sizes="[5, 10, 20]"
      :page-size="eachPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findComment, deleteComment } from "@/api/comment";
import { server_URL } from "@/urlConfig";
import { formatDate } from "@/utils/tools";
export default {
  data() {
    return {
      data: [],
      listLoading: false,
      srcList: [],
      currentPage: 1, //当前页
      eachPage: 5, //当前每页条数
      count: 0, //总条数
      totalPage: 0, //总页数
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      findComment(this.currentPage, this.eachPage).then(({ data }) => {
        this.listLoading = false;
        console.log(data);
        this.data = data.rows;
        for (const item of this.data) {
          // item.avatar = server_URL + item.avatar;
          item.createDate = formatDate(item.createDate);
          this.srcList.push(item.avatar);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage); //向上取整
        //删除数据时可能导致当前页大于总页数，这时让当前页等于总页数
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    deleteCommentHandle(commentInfo) {
      this.$confirm("是否删除该评论", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteComment(commentInfo.id).then(() => {
            this.fetchData();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //处理分页事件
    sizeChangeHandle(pageNum) {
      this.eachPage = parseInt(pageNum);
      this.currentPage = 1;
      this.fetchData();
    },
    currentChangeHandle(curPage) {
      this.currentPage = parseInt(curPage);
      this.fetchData();
    },
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
};
</script>

<style></style>
