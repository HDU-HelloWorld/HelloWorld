<template>
    <div class="page">
        <div class="title">
            <div class="title-box">
                HelloWorld
            </div>
        </div>
        <div class="body">
            <UtilCard title="社团打印机" content="上传文件并通过社团实体打印机打印" footer="Available" @click="router.push('/print')"></UtilCard>
            <UtilCard title="作业提交" content="提交日常作业的位置哦（你该不会没做吧）" footer="Available" @click="router.push('/homework')">
            </UtilCard>
        </div>
    </div>
</template>

<script setup>
import UtilCard from '../components/Home/UtilCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang='less'>
.page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .title {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 48px;
        font-weight: bolder;

        .title-box {
            width: 20rem;
            display: flex;
            justify-content: center;
            border: 3px solid #000;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            &:hover {
                border: 3px solid #000;
                background-color: #000;
                color: #fff;
            }
        }
    }

    .body {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
