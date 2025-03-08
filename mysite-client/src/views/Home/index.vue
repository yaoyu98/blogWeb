<template>
  <div
    v-loading="loading"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
  >
    <ul
      class="carousel-container"
      :style="{
        marginTop,
      }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div v-show="index > 0" @click="switchTo(index - 1)" class="icon icon-up">
      <Icon type="arrowUp" />
    </div>
    <div
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
      class="icon icon-down"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: index === i }"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>
<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  //测试
  // width: 60%;
  // height: 40%;
  // overflow: visible;
  // border: 2px solid #008c8c;
  // margin: 100px auto;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    .self-center();
    color: @gray;
    @gap: 25px;
    cursor: pointer;
    font-size: 30px;
    transform: translateX(-50%);
    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: jump-down 2s infinite;
    }
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
  .indicator {
    .self-center();
    left: auto;
    right: 20px;
    transform: translateY(-50%);
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: @words;
      margin-top: 10px;
      border: 1px solid #fff;
      cursor: pointer;
      box-sizing: border-box;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>
<script>
import { mapState } from "vuex";
import CarouselItem from "./Carouselitem";
import Icon from "@/components/Icon";
export default {
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      containerHeight: 0,
      index: 0,
      switching: false, //正在切换中
    };
  },
  created() {
    this.$store.dispatch("banner/fetchBanners");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.containerHeight * this.index + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    switchTo(index) {
      this.index = index;
    },
    //设置滚动效果
    handleWheel(e) {
      // console.log(e.deltaY);
      if (this.switching) {
        return;
      }
      if (e.deltaY < -5 && this.index > 0) {
        //向上翻
        this.index--;
        this.switching = true;
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
        //向下翻
        this.index++;
        this.switching = true;
      }
    },
    handleTransitionEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>
