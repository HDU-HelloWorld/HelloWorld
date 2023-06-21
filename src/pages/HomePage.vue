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
            <div class="card-content">
                <UtilCard
                    v-for="(item, index) in cardData"
                    class="util-card"
                    :key="index"
                    :title="item.title"
                    :content="item.content"
                    :footer="item.footer"
                    @click="
                        item.router
                            ? router.push(item.router)
                            : myWindow.open(item.link)
                    "
                >
                    <template v-slot:icon>
                        <component
                            :is="item.icon ? item.icon : markRaw(DefaultIcon)"
                        />
                    </template>
                </UtilCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { markRaw, onMounted, ref } from 'vue'
import { baseUrl, chatUrl } from '../../config'
import { useRouter } from 'vue-router'
import DefaultIcon from '../assets/svg/DefaultIcon.vue'
import KoishiIcon from '../assets/svg/KoishiIcon.vue'
import printer from '../assets/svg/PrinterIcon.vue'
import UtilCard from '../components/Home/UtilCard.vue'

const loaded = ref(false)
const page = ref(null)
onMounted(() => {
    loaded.value = true
})
// 用于让UtilCard拿到window对象
const myWindow = ref(null)
// footer: 'Available' | 'Fixing' | 'Developing'
const cardData = [
    {
        title: '社团打印机',
        content: '上传文件并通过社团实体打印机打印',
        footer: 'Available',
        router: '/print',
        icon: markRaw(printer),
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
    },
    {
        title: '社团资源整合',
        content: '整理了一些社团资源，欢迎大家上传补充',
        footer: 'Available',
        router: '/resource',
    },
    {
        title: '网易云会员',
        content: '每月领取网易云会员',
        footer: 'Developing',
        router: '/music/getvip',
    },
    {
        title: 'ChatGPT',
        content: 'HW部署的ChatGPT Web端应用',
        footer: 'Available',
        link: chatUrl,
    },
    {
        title: 'Clash',
        content: 'Clash Dashboard控制台',
        footer: 'Available',
        router: '',
        link: `${baseUrl}:8081`,
        icon: markRaw(KoishiIcon),
    },
    {
        title: 'Chiya控制台',
        content: 'Chiya的koishi控制台',
        footer: 'Available',
        router: '',
        link: `${baseUrl}:7140`,
        icon: markRaw(KoishiIcon),
    },
]

const router = useRouter()

onMounted(() => {
    myWindow.value = window
    // TODO: 没有平滑过渡动画
    let userClientWidth = document.documentElement.clientWidth
    // console.log(userClientWidth)
    let cardAmount = Math.floor(userClientWidth / 410)
    const cardContent = document.querySelector('.card-content')
    cardContent.style.width = `${cardAmount * 410}px`

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        userClientWidth = document.documentElement.clientWidth
        cardAmount = Math.floor(userClientWidth / 410)
        cardContent.style.width = `${cardAmount * 410}px`
    })
})
</script>

<style scoped lang="less">
.page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

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
            // transition: all 0.3s ease-in-out;

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
        justify-content: center;
        overflow: scroll;
        // 禁止左右滚动
        overflow-x: hidden;
        // 隐藏滚动条
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }

        .card-content {
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-wrap: wrap;
        }
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
