<template>
  <ul class="data-list-container">
    <li class="comments" v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="44" />
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="time">{{ formatDate(item.createDate, true) }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import { formatDate } from "@/utils";
export default {
  components: {
    Avatar,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-list-container {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    border-bottom: 1px solid lighten(@gray, 20%);
    padding: 15px 0;
    display: flex;
  }
  .avatar-container {
    margin-right: 15px;
  }
  .nickname {
    color: darken(@success, 10%);
    margin-bottom: 10px;
  }
  .content {
    font-size: 14px;
  }
  .data {
    flex: 1 1 auto;
    position: relative;
  }
  .time {
    position: absolute;
    right: 0;
    top: 5px;
    color: @gray;
    font-size: 12px;
  }
}
</style>
