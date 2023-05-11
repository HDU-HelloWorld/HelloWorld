<template>
    <div class="page">
        <div class="markdown-body" v-html="markdown"></div>
        <div id="markdown-menu" v-html="markdownMenu"></div>
        <!-- <v-md-editor v-model="markdown" height="100vh"></v-md-editor> -->
    </div>
</template>

<script setup>
import 'github-markdown-css'
import axios from 'axios'
import uslug from 'uslug'
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTOC from 'markdown-it-toc-done-right'
// import { dirname } from 'path'
import { onMounted, ref } from 'vue'

const markdownUrl = '/src/assets/markdown/HelloWorld社团资源.md'
// const markdownUrl = '/src/assets/markdown/全栈开发教程1.md'
const markdown = ref('')
const markdownMenu = ref('')
const uslugify = (s) => uslug(s)
const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
})
    .use(MarkdownItAnchor, {
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#',
        slugify: uslugify,
    })
    .use(MarkdownItTOC, {
        level: 1,
        containerId: 'markdown-menu',
        listType: 'ul',
        slugify: uslugify,
        // format: format,
        callback: function (html, opt) {
            console.log(opt)
            markdownMenu.value = html
        },
    })

onMounted(async () => {
    const ResourceMd = await axios.get(markdownUrl)
    markdown.value = md.render(ResourceMd.data)
    setTimeout(() => {
        console.log(document.querySelectorAll('a'))
        for (let anchor of document.querySelectorAll('a')) {
            anchor.addEventListener('click', (e) => {
                e.preventDefault()
                const href = anchor.getAttribute('href')
                console.log(href)
                const target = document.querySelector(href)
                console.log(target)
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            })
        }
    }, 100)
})

// function format(x, htmlencode) {
//     return `<span>${htmlencode(x)}</span>`
// }

// const updateMarkdown = () => {
//     console.log(markdown.value)
// }
</script>

<style lang="less">
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

#markdown-menu {
    position: fixed;
    top: 20px;
    right: 0;
    width: 300px;
    overflow-y: auto;
    padding: 20px;
    background-color: rgba(241, 241, 241, 0.3);
    border-radius: 5px;
    // border-left: 1px solid #ddd;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 20px;
        li {
            margin: 0;
            padding: 0;

            ul {
                font-size: 16px;
                ul {
                    margin-left: 20px;
                    font-size: 12px;

                    li {
                        // 添加小圆点
                        list-style: disc;
                    }
                }
            }
        }
    }

    a {
        display: block;
        padding: 5px 0;
        color: #333;
        text-decoration: none;

        &:hover {
            color: #000;
            background-color: #ddd;
        }
    }
    &.active {
        color: #000;
        font-weight: bold;
    }
}
</style>
