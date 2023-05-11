<template>
    <div>
        <div v-for="(item, index) in personDataArr" :key="index">
            <PersonCard :personData="item"></PersonCard>
        </div>
    </div>
</template>

<script setup>
import PersonCard from '../components/Link/PersonCard.vue'
import { ref } from 'vue'
const personDataArr = ref([
    {
        name: '月晕',
        avter: '/src/assets/yueyun/avter.jpg',
        bg: '/src/assets/yueyun/bg.png',
        blogUrl: 'https://blog.apprehen.space',
    },
    {
        name: 'firtmeet',
        avter: '/src/assets/firtmeet/avter.jpg',
        bg: '/src/assets/firtmeet/bg.png',
        blogUrl: 'https://firstmeet.store/',
    },
])
</script>
<style scoped lang="less"></style>
