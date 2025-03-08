<template>
  <div class="to-top-container" v-show="show" @click="handleClick">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    //触发事件，发送回到顶部的数据
    handleClick() {
      this.$bus.$emit("setMainScroll", 0);
    },
    //滚动超过一定距离就出现图标
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: @primary;
  position: fixed;
  z-index: 99;
  right: 50px;
  bottom: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
</style>
