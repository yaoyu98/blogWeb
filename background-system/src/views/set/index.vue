<template>
  <div class="app-container">
    <div class="block">网站信息</div>
    <div class="block2">网站标题</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.siteTitle" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">邮箱</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.mail" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">备案号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.icp" :disabled="isDisabled"></el-input>
    </div>
    <el-divider></el-divider>
    <div class="block">网站头像信息</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.avatar"
        fit="fill"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="block">网址图标信息</div>
    <div class="block2">网址图标地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input
        v-model="form.favicon"
        disabled
        placeholder="请输入图标地址"
      ></el-input>
    </div>
    <div class="block2">网址图标预览</div>
    <el-image
      style="width: 100px; height: 100px"
      :src="form.favicon"
      fit="fill"
    ></el-image>
    <el-divider></el-divider>
    <div class="block">github 信息</div>
    <div class="block2">github 名字</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.githubName" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">github 地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.github" :disabled="isDisabled"></el-input>
    </div>
    <el-divider></el-divider>
    <div class="block">QQ 信息</div>
    <div class="block2">QQ 号码</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.qq" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">QQ 二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.qqQrCode"
        fit="fill"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="block">微信信息</div>
    <div class="block2">微信号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.weixin" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">微信二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.weixinQrCode"
        fit="fill"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <el-button type="primary" @click="openEditPanel">进入编辑模式</el-button>
    <!-- 编辑框 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      fullscreen
      width="50%"
      top="5vh"
    >
      <el-form :model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form2.siteTitle"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form2.mail"></el-input>
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form2.icp"></el-input>
        </el-form-item>
        <el-form-item label="网站头像地址">
          <Upload v-model="form2.avatar" />
        </el-form-item>
        <el-form-item label="网站图标地址">
          <el-input v-model="form2.favicon"></el-input>
        </el-form-item>
        <el-form-item label="github 名字">
          <el-input v-model="form2.githubName"></el-input>
        </el-form-item>
        <el-form-item label="github 地址">
          <el-input v-model="form2.github"></el-input>
        </el-form-item>
        <el-form-item label="QQ 号码">
          <el-input v-model="form2.qq"></el-input>
        </el-form-item>
        <el-form-item label="QQ 二维码图片地址">
          <Upload v-model="form2.qqQrCode" />
        </el-form-item>
        <el-form-item label="微信号码">
          <el-input v-model="form2.weixin"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码图片地址">
          <Upload v-model="form2.weixinQrCode" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditSetting">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSetting, setSetting } from "@/api/setting";
import Upload from "@/components/Upload";
import { server_URL } from "@/urlConfig";
export default {
  data() {
    return {
      isDisabled: true, //不显示输入框
      dialogFormVisible: false,
      form: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
      form2: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
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
      getSetting().then(({ data }) => {
        this.form = data;
        this.form2 = { ...this.form };
        // for (const key in this.form) {
        //   if (key === "avatar") {
        //     this.form.avatar2 = server_URL + this.form.avatar;
        //   }
        // }
      });
    },
    openEditPanel() {
      this.dialogFormVisible = true;
      // for (const key in this.form2) {
      //   if (key === "avatar") {
      //     this.form2.avatar2 = server_URL + this.form2.avatar;
      //   }
      // }
    },
    confirmEditSetting() {
      setSetting(this.form2).then(() => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success("修改成功");
      });
    },
  },
};
</script>

<style>
.block {
  margin: 15px 0;
  font-weight: 100;
  font-size: 20px;
}
.block2 {
  margin: 15px 0;
  font-weight: 100;
  font-size: 14px;
}
</style>
