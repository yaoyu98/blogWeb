<template>
  <div class="app-container">
    <!-- 数据表格渲染 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }} </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150" align="center">
        <template slot-scope="scope"> {{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope"> {{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.bigImg"
            fit="fill"
          ></el-image>
        </template>
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
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑首页数据 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 绑定中图 -->
              <upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <!-- 绑定大图 -->
              <upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm"> 确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner";
import { server_URL } from "@/urlConfig";
import Upload from "@/components/Upload";
export default {
  data() {
    return {
      data: [], //table表单对应的数据
      dialogFormVisible: false, //编辑内容框是否显示
      form: {
        id: "",
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
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
    //获取首页数据
    fetchData() {
      getBanner().then((res) => {
        this.data = res.data;
        // for (const item of this.data) {
        //   item.midImg2 = server_URL + item.midImg;
        //   item.bigImg2 = server_URL + item.bigImg;
        // }
      });
    },
    //处理点击表单之后的事件
    editBannerHandle(bannerInfo) {
      //1.打开表单 2.把数据放进去
      this.dialogFormVisible = true;
      this.form = { ...bannerInfo };
    },
    //点击确认之后的事件
    editBannerConfirm() {
      this.dialogFormVisible = false;
      //创建一个arr,把不一样的放进arr中
      const arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        //通过遍历，让现在操作的form加入到data之中
        if (arr[i].id === this.form.id) {
          arr[i] = this.form;
          // console.log(arr[i], "item");
        }
      }
      //把data交给服务器，让服务器重新生成表格
      setBanner(arr).then((res) => {
        this.dialogFormVisible = false;
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fetchData(); //重新请求修改后的数据
      });
    },
  },
};
</script>

<style></style>
