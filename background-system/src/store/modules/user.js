import { loginApi, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
// import user from 'mock/user';

const getDefaultState = () => {
  return {
    // token: getToken(),
    // name: '',
    // avatar: ''
    user: null,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token;
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name;
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar;
  // },
  SET_USER: (state, payload) => {
    state.user = payload;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      //验证码错误 string , 账号密码错误 data null
      loginApi(userInfo)
        .then((res) => {
          const { data } = res;
          if (data) {
            commit("SET_USER", data);
            resolve();
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });

    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  //拿到token之后，验证token有效性
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //发送请求whoami，验证token
      getInfo().then((res) => {
        if (typeof res === "string") {
          //token已经过期，需要重新登录
          res = JSON.parse(res);
          if (res.code === 401) {
            reject(res.msg);
          }
        } else {
          //token没问题，仓库记录下这次数据
          commit("SET_USER", res.data);
          resolve();
        }
      });
    });
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token)
    //     .then((response) => {
    //       const { data } = response;

    //       if (!data) {
    //         return reject("Verification failed, please Login again.");
    //       }

    //       const { name, avatar } = data;

    //       commit("SET_NAME", name);
    //       commit("SET_AVATAR", avatar);
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  },

  // user logout
  logout({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token)
    //     .then(() => {
    //       removeToken(); // must remove  token  first
    //       resetRouter();
    //       commit("RESET_STATE");
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      resetRouter(); // must reset router to avoid memory leak
      commit("RESET_STATE");
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
