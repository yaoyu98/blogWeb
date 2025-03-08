export default function (refValue) {
  return {
    mounted() {
      this.$refs[refValue].addEventListener("scroll", this.handleMainSroll);
      this.$bus.$on("setMainScroll", this.handleSetMainScroll);
    },
    //使用完后都要进行销毁
    beforeDestroy() {
      //没有dom时触发不显示Top图标
      this.$bus.$emit("mainScroll");
      this.$refs[refValue].removeEventListener("scroll", this.handleMainSroll);
      this.$bus.$off("setMainScroll", this.handleSetMainScroll);
    },
    methods: {
      handleMainSroll() {
        this.$bus.$emit("mainScroll", this.$refs[refValue]);
      },
      handleSetMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop;
      },
    },
  };
}
