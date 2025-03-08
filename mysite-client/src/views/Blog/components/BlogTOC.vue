<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  //目前数据中有没有选中属性
  //根据父组件滚动去看是否选中
  data() {
    return {
      activeAnchor: "",
    };
  },
  //拿到全部的activeAnchor
  computed: {
    //往数组里每一个对象加入isSelect属性，对象里的子数组也要递归迭代
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    //根据this.toc得到dom元素的数组
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  //拿到防抖函数，在事件触发时自动调用，防抖函数不用设置调用
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  //销毁函数
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    //调用函数时是在触发函数的环境，所以可以从this.doms拿到父组件的document,不用写事件总线
    setSelect() {
      this.activeAnchor = "";
      const range = 200;
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top < range) {
          this.activeAnchor = dom.id;
          return;
          //在范围之内
        } else if (top > range) {
          //在范围之下
          return;
        } else {
          //在范围之上
          this.activeAnchor = dom.id;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  h2 {
    font-size: 1em;
    margin: 0;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>
