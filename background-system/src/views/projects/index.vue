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
      <el-table-column prop="name" label="项目名称" width="150" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.github" target="_blank" class="proName">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="项目描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="预览图" align="center" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 120px"
            :src="scope.row.thumb"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="Github"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="iconfont icon-github"
              class="github"
              circle
              size="mini"
              @click="openGitHubHandle(scope.row)"
            ></el-button>
          </el-tooltip>
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
              @click="editProjectHandle(scope.row)"
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
              @click="deleteProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹窗 -->
    <el-dialog
      title="请编辑该项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以英文逗号分割）"
          ><el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="Github 地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-form-item label="预览图">
          <Upload v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditProjectHandle"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, setProject, delProject } from "@/api/project";
import Upload from "@/components/Upload";
import { server_URL } from "@/urlConfig";
export default {
  data() {
    return {
      dialogFormVisible: false, //编辑框是否打开
      data: [], //原始数据
      listLoading: false,
      srcList: [], //图片列表
      form: {
        name: "",
        description: "",
        thumb: "",
        github: "",
        url: "",
        order: 1,
      },
    };
  },
  components: {
    Upload,
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getProject().then(({ data }) => {
        this.listLoading = false;
        this.data = data;
        for (const item of data) {
          // item.thumb2 = server_URL + item.thumb;
          this.srcList.push(item.thumb2);
        }
      });
    },
    openGitHubHandle(projectInfo) {
      window.open(projectInfo.github);
    },
    editProjectHandle(projectInfo) {
      this.dialogFormVisible = true;
      this.form = {
        ...projectInfo,
        description: projectInfo.description.toString(),
      };
    },
    deleteProjectHandle(projectInfo) {
      this.$confirm("确定删除此项目吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProject(projectInfo.id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
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
    confirmEditProjectHandle() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.order);
      setProject(obj.id, obj).then((res) => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message({
          type: "success",
          message: "修改成功",
        });
      });
    },
  },
};
</script>

<style>
.github {
  background-color: rgb(163, 163, 163);
  border: 1px solid rgb(163, 163, 163);
}
.proName:hover {
  color: rgb(163, 163, 163);
}
</style>
