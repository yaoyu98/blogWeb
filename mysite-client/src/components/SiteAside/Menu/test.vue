<template>
  <div class="test-container">
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "./";
import "@/styles/global.less";
export default {
  components: {
    Menu,
  },
};
</script>

<style scoped lang="less">
.test-container {
  width: 400px;
  height: 600px;
  border: 2px solid red;
  margin: 0 auto;
  background: #000;
}
</style>
