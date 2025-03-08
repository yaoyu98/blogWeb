<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input
      placeholder="请输入内容"
      v-model="url"
      :disabled="isDisabled"
    ></el-input>
    <el-button style="margin-top: 15px" type="primary" @click="clickHandle">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, editAbout } from "@/api/about";
export default {
  data() {
    return {
      url: "",
      isDisabled: true, //是否不显示输入框
      btnContent: "编辑",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.url = data;
      });
    },
    clickHandle() {
      if (this.btnContent === "编辑") {
        this.btnContent = "完成";
        this.isDisabled = !this.isDisabled;
      } else {
        if (this.url) {
          this.btnContent = "编辑";
          this.isDisabled = !this.isDisabled;
          editAbout({ url: this.url }).then(() => {
            this.$message.success("更改成功");
            this.fetchData();
          });
        } else {
          this.$message.warning("输入框不能为空");
        }
      }
    },
  },
};
</script>

<style>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
