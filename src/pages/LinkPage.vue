<template>
    <div>
        <div v-for="(item, index) in personDataArr" :key="index">
            <PersonCard :personData="item"></PersonCard>
        </div>
    </div>
</template>

<script setup>
import PersonCard from '../components/Link/PersonCard.vue'
import YueyunAvatar from '@/assets/yueyun/avatar.jpg'
import YueyunBg from '@/assets/yueyun/bg.png'
import FirstMeetAvatar from '@/assets/firtmeet/avatar.jpg'
import FirstMeetBg from '@/assets/firtmeet/bg.png'
import { ref } from 'vue'
const personDataArr = ref([
    {
        name: '月晕',
        avter: YueyunAvatar,
        bg: YueyunBg,
        blogUrl: 'https://blog.apprehen.space',
    },
    {
        name: 'firtmeet',
        avter: FirstMeetAvatar,
        bg: FirstMeetBg,
        blogUrl: 'https://firstmeet.store/',
    },
])
</script>
<style scoped lang="less"></style>
