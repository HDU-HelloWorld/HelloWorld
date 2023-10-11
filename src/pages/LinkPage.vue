<template>
  <div class="container">
    <div v-for="(item, index) in personDataArr" :key="index" class="card">
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
import MontagneAvatar from '@/assets/montagne/avatar.jpg'
import MontagneBg from '@/assets/montagne/bg.png'
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
  {
    name: '山遥路远',
    avter: MontagneAvatar,
    bg: MontagneBg,
    blogUrl: 'https://乐正绫.cn/',
  },
])
</script>
<style scoped lang="less">
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5vw 0;
  .card {
    margin: 2vw;
  }
}</style>
