import eventBus from "@/eventBus";
import { debounce } from "@/utils";
import defaultGif from "@/assets/default.gif";
//创建一个放图片的数组
let imgs = [];
//把每一个图片放到数组中
function setImage(img) {
  img.dom.src = defaultGif;
  //拿到一个dom元素，设置可视高度，哪些图片显示，哪些图片不显示
  const clientHeight = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  if (rect.top >= -height && rect.top <= clientHeight) {
    //在可视范围内
    const tempImg = new Image();
    tempImg.onload = () => {
      img.dom.src = img.src;
    };
    tempImg.src = img.src;
    // img.dom.src = img.src;
    imgs = imgs.filter((i) => i !== img);
  }
}
function setImages() {
  for (const img of imgs) {
    setImage(img);
  }
}
function handleScroll() {
  setImages();
}
eventBus.$on("mainScroll", debounce(handleScroll, 50));
export default {
  //做一个图片懒加载的效果
  //指令参数就是要加载的url地址
  inserted(el, binding) {
    //拿到一个img对象
    const img = {
      dom: el,
      src: binding.value,
    };
    imgs.push(img);
    setImage(img);
  },
  unbind(el) {
    imgs = imgs.filter((img) => img.dom !== el);
  },
};
