<template>
    <div class="page" ref="page">
        <Transition name="load">
            <template v-if="!loaded">
                <div class="mask"></div>
            </template>
        </Transition>
        <div class="title">
            <div class="title-box">HelloWorld</div>
        </div>
        <div class="body">
            <UtilCard v-for="(item, index) in cardData" :key="index" :title="item.title" :content="item.content"
                :footer="item.footer" @click="router.push(item.router)"></UtilCard>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import UtilCard from '../components/Home/UtilCard.vue'

const loaded = ref(false)
const page = ref(null)
onMounted(() => {
    loaded.value = true
})
const cardData = [
    {
        title: '社团打印机',
        content: '上传文件并通过社团实体打印机打印',
        footer: 'Available',
        router: '/print',
    },
    {
        title: '作业提交',
        content: '提交日常作业的位置哦（你该不会没做吧）',
        footer: 'Available',
        router: '/homework',
    },
    {
        title: '友链',
        content: '友情页面',
        footer: 'Available',
        router: '/link',
    }
]

const router = useRouter()
</script>

<style scoped lang="less">
.page {
    width: 100vw;
    height: 100vh;
    transition: all 0.3s ease-in-out;
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

    // 加载蒙板
    .mask {
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 1;
        background-color: #000;
    }
}

.load-leave-active {
    transition: all 0.3s ease-in-out;
    opacity: 1;
}

.load-leave-to {
    opacity: 0;
}
</style>
