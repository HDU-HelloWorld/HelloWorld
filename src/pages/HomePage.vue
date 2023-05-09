<template>
    <div class="page">
        <div class="body">
            <UtilCard title="标题" content="内容" footer="页脚"></UtilCard>
        </div>
    </div>
</template>

<script setup>
import UtilCard from '../components/UtilCard.vue';
</script>

<style scoped lang='less'>
.page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
