import { server_URL } from "@/urlConfig";

//组件混入相同功能，远程获取数据方法 fetchData
export default function (defaultDataValue = null) {
  return {
    data() {
      return {
        isLoading: true,
        data: defaultDataValue,
      };
    },
    async created() {
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  };
}
