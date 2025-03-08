<template>
  <div>
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <div class="block">文章编辑</div>
    <editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="optionsContent"
    />
    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>
    <Upload v-model="form.thumb" uploadTitle="文章头图" />
    <div class="block">选择分类</div>
    <el-select
      v-model="form.select"
      placeholder="请选择文章分类"
      slot="prepend"
      @change="changeHandle"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <div>
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="addArticleHandle"
        >{{ this.mode === "add" ? "发布文章" : "确认修改" }}</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogType } from "@/api/blogType";
import { addBlog, editBlog, findOneBlog } from "@/api/blog";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  props: ["mode"],
  data() {
    return {
      id: null,
      optionsContent: {
        language: "zh-CN",
      },
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        select: "",
      },
      blogType: [], //文章分类
    };
  },
  created() {
    this.fetchData();
    // Editor.setLanguage("zh-CN", zhCN);
    // console.log(zhCN);
  },
  components: {
    editor: Editor,
    Upload,
  },
  methods: {
    fetchData() {
      getBlogType().then(({ data }) => {
        this.blogType = data;
      });
      if (this.mode === "edit") {
        this.id = this.$route.params.id;
        findOneBlog(this.id).then(({ data }) => {
          this.form = data;
          this.form.select = data.category === null ? "" : data.category.id;
          this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
        });
      }
    },
    addArticleHandle() {
      const html = this.$refs.toastuiEditor.invoke("getHTML");
      const markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      //博客内容
      const obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      //发布文章
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        if (this.mode === "add") {
          addBlog(obj).then(() => {
            this.$router.push("/blogList");
          });
        } else {
          editBlog({
            id: this.form.id,
            data: obj,
          }).then(() => {
            this.$router.push("/blogList");
            this.$message.success("文章编辑成功");
          });
        }
      } else {
        this.$message.error("请填写完整的文章信息");
      }
    },
    changeHandle() {
      if (this.mode === "edit") {
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style>
.block {
  font-weight: 100;
  margin: 15px 0;
}
</style>
