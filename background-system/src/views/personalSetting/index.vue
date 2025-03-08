<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :rules="setRules"
      :model="adminInfo"
      label-width="100px"
      width="500px"
    >
      <el-form-item label="用户名">
        <el-input
          placeholder="请输入用户名"
          v-model="adminInfo.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          placeholder="请输入旧密码"
          v-model="adminInfo.oldLoginPwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          placeholder="请输入新密码"
          v-model="adminInfo.loginPwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码确认" prop="loginPwdConfirm">
        <el-input
          placeholder="请确认新密码"
          v-model="adminInfo.loginPwdConfirm"
          type="password"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click.native.prevent="handleClick"
        >修改</el-button
      >
      <el-button
        type="danger"
        style="margin-top: 15px"
        @click.native.prevent="handleBack"
        >返回</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { getInfo, setUser } from "@/api/user";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.adminInfo.loginPwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      url: "",
      adminInfo: {
        name: "",
        id: "",
        loginId: "",
        oldLoginPwd: "",
        loginPwd: "",
        loginPwdConfirm: "",
      },
      setRules: {
        oldLoginPwd: [
          {
            required: true,
            trigger: "blur",
            message: "请输入旧密码",
          },
        ],
        loginPwd: [
          { required: true, trigger: "blur", message: "请输入新密码" },
        ],
        loginPwdConfirm: [
          { required: true, trigger: "blur", message: "请确认新密码" },
          { validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getInfo().then(({ data }) => {
        this.adminInfo = data;
      });
    },
    handleClick() {
      if (
        this.adminInfo.name &&
        this.adminInfo.loginPwd &&
        this.adminInfo.oldLoginPwd
      ) {
        setUser(this.adminInfo).then((res) => {
          console.log(res);
          if (typeof res === "string") {
            const resp = JSON.parse(res);
            this.$message.error(resp.msg);
          } else {
            this.$message.success("密码修改成功");
            this.$store.dispatch("user/logout").then(() => {
              this.$router.push(`/login?redirect=${this.route.fullPath}`);
            });
          }
        });
      } else {
        this.$message.error("请填写所有项目");
      }
    },
    handleBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.app-container {
  width: 500px;
}
</style>
