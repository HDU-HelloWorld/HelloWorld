<template>
    <div class="util-card">
        <div class="icon">
            <div class="icon-svg"></div>
        </div>
        <div class="info">
            <div class="title">{{ props.title }}</div>
            <div class="content">{{ props.content }}</div>
            <div class="footer">{{ props.footer }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    content: {
        type: String,
        default: 'Content'
    },
    footer: {
        type: String,
        default: 'Footer'
    }
})
</script>

<style lang="less" scoped>
.util-card {
    width: 300px;
    height: 200px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 30px;
    display: flex;
    justify-content: flex-start;

    .icon {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-svg {
            width: 100px;
            height: 100px;
            background-color: #eee;
            border-radius: 50%;
        }
    }

    .info{
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        padding: 20px 0;
        
        .title {
            font-size: 24px;
            font-weight: bold;
        }
        
        .content {
            font-size: 16px;
            line-height: 1.5;
        }
        
        .footer {
            font-size: 14px;
            color: #999;
        }
    }
}

</style>
