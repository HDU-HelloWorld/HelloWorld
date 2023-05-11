<template>
    <div
        class="personCard"
        @mouseenter="infoshow = false"
        @mouseleave="infoshow = true"
    >
        <a :href="personData.blogUrl" target="_blank">
            <Transition>
                <div
                    class="info"
                    :class="{ 'is-hovering': infoshow === false }"
                >
                    <div class="avter">
                        <img :src="personData.avter" />
                        <span>{{ personData.name }}</span>
                    </div>
                    <span></span>
                </div>
            </Transition>
            <Transition>
                <div
                    class="mask"
                    :class="{ 'is-hovering': infoshow === false }"
                ></div>
            </Transition>
            <div class="down">
                <img
                    :src="personData.bg"
                    :class="infoshow ? 'nohover-bg' : 'hovering-bg'"
                />
            </div>
        </a>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const infoshow = ref(true)
defineProps({
    personData: {
        type: Object,
        required: true,
    },
})
</script>
<style scoped lang="less">
.personCard {
    width: 300px;
    margin-bottom: 50px;
    border-radius: 8px;
    position: relative;
    // padding: 5px;
    // 自适应图片高度
    height: 150px;
    cursor: pointer;
    overflow: hidden;
    color: #363636;
    border: 1px solid #fff;
    &:hover {
        border: #3b70fc 1px solid;
        box-shadow: 0 8px 12px -3px rgba(66, 89, 239, 0.137);
    }
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
                // margin-left: -5px;
                display: flex;
                box-shadow: none;
                color: none;
                border: none;
                font-size: 20px;
                padding: 1px 3px;
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
        transform: translateY(-102%);
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
            border-radius: 4px;
        }
        transition: scale 0.5 ease-in-out;
    }
    .hovering-bg {
        scale: (1.15);
        transition: all 0.5s ease-in-out;
    }
    .nohover-bg {
        scale: (1);
        transition: all 0.5s ease-in-out;
    }
}
</style>
