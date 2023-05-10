<template>
    <div class="util-card">
        <div class="icon">
            <div class="icon-svg">
                <printer />
            </div>
        </div>
        <div class="info">
            <div class="title">{{ props.title }}</div>
            <div class="content">{{ props.content }}</div>
            <div v-if="props.footer" class="footer">
                <div class="point-tip available-point"></div>{{ props.footer }}
            </div>
        </div>
    </div>
</template>

<script setup>
import printer from '../../assets/svg/PrinterIcon.vue'

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
        default: ''
    }
})
</script>

<style lang="less" scoped>
.util-card {
    width: 350px;
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
            width: 80%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 75px;
        }
    }

    .info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        padding: 40px 0;

        .title {
            font-size: 24px;
            font-weight: bold;
        }

        .content {
            font-size: 13px;
            line-height: 1.5;
            width: 80%;
            color: #999;
        }

        .footer {
            font-size: 14px;
            color: #56e215;
            text-align: right;
            padding-right: 20px;

            .point-tip {
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #999999;
                margin-right: 5px;

                &.available-point {
                    background-color: #56e215;
                }
            }
        }
    }

    &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        scale: 1.05;
        transition: all 0.5s;
    }

    cursor: pointer;
    transition: all 0.5s;
}
</style>
