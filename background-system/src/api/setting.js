import request from "@/utils/request";

//获取全局设置
export function getSetting() {
  return request({
    url: "/api/setting",
    method: "get",
  });
}

//修改全局设置
export function setSetting(data) {
  return request({
    url: "/api/setting",
    method: "put",
    data,
  });
}
