<template>
    <div class="page">
        <v-md-editor v-model="markdown" height="100vh"></v-md-editor>
        <button class="update" @click="updateMarkdown">提交</button>
    </div>
</template>

<script setup>
import axios from 'axios'
// import { dirname } from 'path'
import { onMounted, ref } from 'vue'

const markdownUrl = '/src/assets/markdown/HelloWorld社团资源.md'
const markdown = ref('')

onMounted(async () => {
    const ResourceMd = await axios.get(markdownUrl)
    markdown.value = ResourceMd.data
})

const updateMarkdown = () => {
    console.log(markdown.value)
}
</script>

<style scoped lang="less"></style>
