<template>
  <div class="app-container">
    <!-- 数据表格渲染 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope"
          >{{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客图预览"
            width="200"
            trigger="hover"
          >
            <el-image
              style="width: 100px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="文章描述"
        width="230"
        align="center"
      >
        <template slot-scope="scope"> {{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column
        prop="scanNumber"
        label="浏览数"
        width="150"
        align="center"
      >
        <template slot-scope="scope"> {{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column
        prop="commentNumber"
        label="评论量"
        width="150"
        align="center"
      >
        <template slot-scope="scope"> {{ scope.row.commentNumber }}</template>
      </el-table-column>
      <el-table-column prop="name" label="所属分类" width="150" align="center">
        <template slot-scope="scope">
          {{
            scope.row.category === null ? "未分类" : scope.row.category.name
          }}</template
        >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建日期"
        width="230"
        align="center"
      >
        <template slot-scope="scope"> {{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="warning"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBlog(scope.row)"
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
import { findBlog, delOneBlog } from "@/api/blog";
import { formatDate } from "@/utils/tools";
import { server_URL, frontEnd_URL } from "@/urlConfig";
export default {
  data() {
    return {
      data: [], //原始数据
      srcList: [], //预览图数据
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
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (const item of data.rows) {
          item.createDate = formatDate(item.createDate);
          // item.thumb = `${server_URL}${item.thumb}`;
          this.srcList.push(item.thumb);
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
    deleteBlog(blogInfo) {
      this.$confirm("删除该文章会将评论一起删除, 是否继续?", "是否删除该文章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delOneBlog(blogInfo.id).then(() => {
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
    goToTitleHandle(blogInfo) {
      window.open(frontEnd_URL + "/article/" + blogInfo.id);
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
    //处理编辑内容
    editBlogHandle(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`);
    },
  },
};
</script>

<style></style>
