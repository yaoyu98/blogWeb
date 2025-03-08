<template>
  <div class="test-container">
    <Empty :text="text"/>
  </div>
</template>

<script>
import Empty from "./";
export default {
  components: {
    Empty,
  },
  data() {
    return {
      text: "无数据",
    };
  },
  methods: {
    handle() {
      console.log(this.text);
    },
  },
};
</script>

<style scoped>
.test-container {
  position: relative;
  width: 500px;
  height: 500px;
  border: 2px solid red;
}
</style>
