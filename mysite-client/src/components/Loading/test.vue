<template>
  <div style="position:relative">
    <Loading v-if="isLoading" />
    <button @click="isLoading = !isLoading">切换显示</button>
  </div>
</template>

<script>
import Loading from "./";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>

<style></style>
