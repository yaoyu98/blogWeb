import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
//得到创建的img元素
function getLoadingImage(el) {
  return el.querySelector("img[data-role='loading']");
}
function createLoadingImg() {
  const img = document.createElement("img");
  img.dataset.role="loading";
  img.src = loadingUrl;
  img.className = styles.loading;
  return img;
}
export default function (el, binding) {
  //根据binding.value的值，创建或者删除img元素
  const curImg = getLoadingImage(el);
  if (binding.value) {
    if (!curImg) {
      const img = createLoadingImg();
      el.appendChild(img);
    }
  } else {
    if (curImg) {
      curImg.remove();
    }
  }
}
