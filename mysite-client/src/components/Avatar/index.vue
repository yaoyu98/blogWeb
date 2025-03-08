<template>
    <img
    class="avatar-container"
    :src="url" :style="{
        width:size+'px',
        height:size+'px',
    }">
</template>

<script>
export default {
    props:{
        url: {
            type: String,//属性为字符串
            required: true,//属性必须填
        },
        size:{
            type:Number,
            default:150,
        },
    },
};
</script>

<style scoped>
/* 属性作用域隔开不同组件 */
   .avatar-container {
        border-radius: 50%;
        object-fit: cover;
        display: block;
    };
</style>