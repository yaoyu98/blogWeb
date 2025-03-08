<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./";
import "@/styles/global.less";
export default {
  components: {
    SiteAside,
  },
};
</script>

<style scoped>
.test-container {
  width: 250px;
  height: 600px;
  margin: 0 auto;
  border: 2px solid;
}
</style>
