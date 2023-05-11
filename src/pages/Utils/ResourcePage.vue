<template>
    <div class="page">
        <div class="markdown-body" v-html="markdown"></div>
        <!-- <v-md-editor v-model="markdown" height="100vh"></v-md-editor> -->
    </div>
</template>

<script setup>
import 'github-markdown-css'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTOC from 'markdown-it-toc-done-right'
// import { dirname } from 'path'
import { onMounted, ref } from 'vue'

const markdownUrl = '/src/assets/markdown/HelloWorld社团资源.md'
const markdown = ref('')
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
})
    .use(MarkdownItAnchor, {
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#',
    })
    .use(MarkdownItTOC, { slugify: legacySlugify })

onMounted(async () => {
    const ResourceMd = await axios.get(markdownUrl)
    markdown.value = md.render(ResourceMd.data)
    console.log(markdown.value)
})

function legacySlugify(s) {
    return String(s).slugify().toString()
}

// const updateMarkdown = () => {
//     console.log(markdown.value)
// }
</script>

<style scoped lang="less">
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>
