<template>
  <div class="personCard" @mouseenter="infoshow = false" @mouseleave="infoshow = true">
    <a href="https://blog.apprehen.space" target="_blank">
      <Transition>
      <div class="info" :class="{ 'is-hovering': infoshow === false }">
        <div class="avter">
          <img src="../../assets/yueyun/yueyun.jpg">
          <span>月晕</span>
        </div>
        <span></span>
      </div>
    </Transition>
    <Transition >
      <div class="mask" :class="{ 'is-hovering': infoshow === false }"></div>
    </Transition>
    <div class="down">
      <img src="../../assets/yueyun/yueyunbg.png">
    </div>
    </a>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const infoshow = ref(true)

</script>
<style scoped lang='less'>
.personCard {
  width: 300px;
  position: relative;
  // 自适应图片高度
  height: 150px;
  background-color: #ccc;
  cursor: pointer;
  .info {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: transform 0.5s;

    .avter {
      position: absolute;
      display: block;
      height: 50px;
      top: 50px;
      transform: translateY(-50%);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        margin-top: 5px;
        margin-left: -5px;
        display: flex;
        justify-content: center;
      }

      img {
        width: 80px;
        border-radius: 50%;
      }
    }

    span {
      display: block;
      width: 100%;
      height: 70px;
      background-color: rgba(255, 255, 255, 0.7);
    }
  }

  .is-hovering {
    transform: translateY(-100%);
  }

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
  }

  .down {
    width: 100%;
    height: 100%;
    display: flex;

    img {
      width: 100%;
    }
  }
}
</style>
