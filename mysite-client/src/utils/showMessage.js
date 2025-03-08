import styles from "./showMessage.module.less";
import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
/**
 * 展示信息，参数有内容，类型，容器，回调函数
 * @param {object} options
 */
export default function (options = {}) {
  const content = options.content || "";
  const type = options.type || "info";
  const container = options.container || document.body;
  const duration = options.duration || 2000;
  //创建dom元素，放到中心位置
  const div = document.createElement("div");
  //把图标和文字放到dom里
  const iconDom = getComponentRootDom(Icon, {
    type,
  });
  div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
  //将类型和背景一个一个对应上
  const typeClassName = styles[`message-${type}`];
  div.className = `${styles.message} ${typeClassName}`;
  //容器设置相对定位
  if (options.container) {
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
  }
  //将dom加到容器里
  container.appendChild(div);
  //设置过渡效果，向上出现，向上消失
  div.clientHeight; //强制渲染当前页面
  div.style.opacity = 1;
  div.style.transform = "translate(-50%, -50%)";
  setTimeout(() => {
    div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
    div.style.opacity = 0;
    div.addEventListener(
      "transitionend",
      function () {
        div.remove();
        options.callback && options.callback();
      },
      { once: true }
    );
  }, duration);
}
