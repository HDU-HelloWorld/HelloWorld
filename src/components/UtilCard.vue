<template>
    <div class="util-card">
        <div class="title">{{ props.title }}</div>
        <div class="content">{{ props.content }}</div>
        <div class="footer">{{ props.footer }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '标题'
    },
    content: {
        type: String,
        default: '内容'
    },
    footer: {
        type: String,
        default: '页脚'
    }
})
</script>

<style scoped lang='less'>
.util-card {
    width: 400px;
    height: 240px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 30px;
}
</style>
