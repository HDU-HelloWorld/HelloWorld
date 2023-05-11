<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios'
import { baseUrl } from '../../config'

defineProps({
    msg: String,
})

const printUrl = baseUrl + '/printer'

const usePrinter = () => {
    console.log('print')
    axios.get(printUrl + '/print')
}

const deleteFiles = () => {
    console.log('delete')
    axios.get(printUrl + '/delete')
}

const stopPrinter = () => {
    console.log('stop')
    axios.get(printUrl + ' /stop')
}
</script>

<template>
    <div class="page">
        <!-- 上传打印文件 -->
        <el-upload
            class="upload-demo"
            drag
            :action="printUrl + '/files'"
            accept=".pdf"
            multiple
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                将文件拖动到此处或<em>点击上传文件</em>
            </div>
            <template #tip>
                <div class="el-upload__tip tip">请先将文件转为pdf文件</div>
            </template>
        </el-upload>
        <el-button @click="usePrinter" type="primary">打印</el-button>
        <el-button @click="stopPrinter">停止打印</el-button>
        <el-button @click="deleteFiles">删除文件</el-button>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.tip {
    display: flex;
    justify-content: center;
}

.el-button {
    margin: 10px;
}
</style>
