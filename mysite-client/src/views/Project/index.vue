<template>
  <div ref="projectContainer" class="project-container" v-loading="loading">
    <div v-for="item in data" :key="item.id" class="project-item">
      <a
        :href="
          item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
        "
        :target="item.url ? '_blank' : '_self'"
      >
        <img v-lazy="item.thumb" class="thumb" />
      </a>
      <div class="info">
        <h2>
          <a
            :href="
              item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
            "
            :target="item.url ? '_blank' : '_self'"
            >{{ item.name }}</a
          >
        </h2>
        <a :href="item.github" class="github" v-if="item.github" target="_blank"
          >github</a
        >
        <p v-for="(desc, i) in item.description" :key="i">{{ desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import mainScroll from "@/mixins/mainScroll";
export default {
  mixins: [mainScroll("projectContainer")],
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  overflow-y: auto;
  position: relative;
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.project-item {
  display: flex;
  padding: 20px;
  transition: 0.5s;
  margin-bottom: 20px;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }
  .thumb {
    flex: 0 0 auto;
    width: 250px;
    min-height: 150px;
    margin-right: 15px;
    border-radius: 5px;
    object-fit: cover;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    h2{
      margin: 0;
    }
  }
  .github {
    font-size: 14px;
    color: @primary;
  }
}
</style>
