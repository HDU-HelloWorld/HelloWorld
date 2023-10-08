<template>
  <div class="body">
    <h1>偶像大师U149</h1>
    <div class="video-content">
      <div class="video-container">
        <video
          controls
          :src="`http://sd.helloworld-hdu.com:10100/download/ACG/%E5%81%B6%E5%83%8F%E5%A4%A7%E5%B8%88U149/${section}.mp4`"
        ></video>
      </div>
      <div class="list">
        <div class="list-item list-title">偶像大师U149</div>
        <div class="list-item focus" @click="section = '1'">第一集</div>
        <div class="list-item" @click="section = '2'">第二集</div>
        <div class="list-item" @click="section = '3'">第三集</div>
        <div class="list-item" @click="section = '4'">第四集</div>
        <div class="list-item" @click="section = '5'">第五集</div>
        <div class="list-item" @click="section = '6'">第六集</div>
        <div class="list-item" @click="section = '7'">第七集</div>
        <div class="list-item" @click="section = '8'">第八集</div>
        <div class="list-item" @click="section = '9'">第九集</div>
        <div class="list-item" @click="section = '10'">第十集</div>
        <div class="list-item" @click="section = '11'">第十一集</div>
        <div class="list-item" @click="section = '12'">第十二集</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const section = ref('1')

watch(section, () => {
  let items = document.querySelectorAll('.list-item')
  items.forEach((item) => {
    item.classList.remove('focus')
  })
  items[section.value].classList.add('focus')
})
</script>

<style scoped lang="less">
.body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    margin-left: 15%;
    font-size: 2rem;
    margin-bottom: 2rem;
    align-self: flex-start;
  }

  .video-content {
    width: 70%;
    height: 60%;
    display: flex;
    justify-content: center;

    .list {
      width: 300px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: #eee;
      margin-left: 10px;
      border-radius: 15px;

      .list-item {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 40px;
        cursor: pointer;
      }

      .list-title {
        flex: 2;
        font-weight: bolder;
        font-size: 1.5rem;
      }

      .focus {
        background-color: #fff;
      }
    }
    .video-container {
      width: 70%;
      height: 100%;

      video {
        width: 100%;
      }
    }
  }
}
</style>
