<template>
  <div class="siteAside-container">
    <template v-if="data">
      <Avatar :url="data.avatar" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>
    <Menu></Menu>
    <Contact v-if="data" />
    <p v-if="data" class="footer">{{ data.icp }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
export default {
  components: { Avatar, Menu, Contact },
  computed: mapState("setting", ["data"]),
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.siteAside-container {
  background: @dark;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  .avatar-container {
    margin: 0 auto;
  }
  .footer {
    font-size: 12px;
    text-align: center;
  }
  .title {
    color: #fff;
    text-align: center;
    font-size: 1.2em;
  }
}
</style>
