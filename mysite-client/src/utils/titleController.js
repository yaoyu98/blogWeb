//区分路由标题与网站标题的显示
let routeTitle,
  siteTitle = "";
function setTitle() {
  if (!routeTitle && !siteTitle) {
    document.title = "";
  } else if (routeTitle && !siteTitle) {
    document.title = routeTitle;
  } else if (siteTitle && !routeTitle) {
    document.title = siteTitle;
  } else {
    document.title = routeTitle + "-" + siteTitle;
  }
}

export default {
  //路由标题
  setRouteTitle(title) {
    routeTitle = title;
    setTitle();
  },
  //网站标题
  setSiteTitle(title) {
    siteTitle = title;
    setTitle();
  },
};
