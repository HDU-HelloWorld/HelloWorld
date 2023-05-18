import Router from 'koa-router'
import multer from '@koa/multer'
import fs from 'fs'
import { createDir } from './functions.js'

const router = new Router()

// api: '/upLoader/upload' 上传文件
// data:{
//   dep: '部门',
//   time: '时间',
//   stuNum: '学号',
//   name: '姓名',
//   id: '文件时间戳'
// }
router.post(
    '/upload',
    multer({
        dest: './static/upload/',
    }).any(),
    async (ctx) => {
        let body = ctx.request.body
        let dir = createDir(body)
        let fileData = fs.Stats(
            './static/upload/' + ctx.request.files[0].filename
        )
        console.log(body)
        console.log(fileData)
        fs.renameSync(
            './static/upload/' + ctx.request.files[0].filename,
            dir + '/' + body.stuNum + '-' + body.name + '-' + body.id
        )
        ctx.body = 'ok'
    }
)

// api: '/upLoader/delete' 删除文件
// data:{
//   dep: '部门',
//   time: '时间',
//   stuNum: '学号',
//   name: '姓名',
//   id: '文件时间戳'
// }
router.post('/delete', async (ctx) => {
    let body = ctx.request.body
    let dir = createDir(body)
    let file = dir + '/' + body.stuNum + '-' + body.name + '-' + body.id
    fs.unlinkSync(file)
    ctx.response.status = 200
    ctx.body = 'ok'
})

export default router
