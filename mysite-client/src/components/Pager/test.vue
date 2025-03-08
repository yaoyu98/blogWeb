<template>
    <div>
      <Pager :total="total" :current="current" @pageChange="handlePageChange"/>
    </div>
  </template>

  <script>
  import Pager from './';
  export default {
    components:{
      Pager,
    },
    data(){
      return {
        total: 302,
        current: 31,
      }
    },
    methods:{
      handlePageChange(newPage){
        this.current = newPage;
      }
    }
  }
  </script>

  <style scoped>
  </style>
