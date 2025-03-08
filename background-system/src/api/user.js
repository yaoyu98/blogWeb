import request from "@/utils/request";

//用户登录
export function loginApi(data) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data,
  });
}

//恢复登录信息
export function getInfo() {
  return request({
    url: "/api/admin/whoami",
    method: "get",
  });
}

//更新管理员信息
export function setUser(data) {
  return request({
    url: "/api/admin",
    method: "put",
    data,
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
