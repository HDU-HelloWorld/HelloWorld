import Router from 'koa-router'
import shell from 'shelljs'
import multer from '@koa/multer'
import { usePrinter } from './functions.js'

const router = new Router()

router.get('/print', ctx => {
    // 唤醒打印机
    shell.exec('cupsenable DeskJet-1110')
    // 等待1s后打印
    setTimeout(() => {
        console.log("printing...")
        // 获取./static/upload/下的所有文件名
        let files = shell.ls('./static/upload')
        // 打印文件名
        files.forEach(file => {
            usePrinter(baseURL + file)
            console.log(file)
        })
        // 打印成功后删除文件
        shell.rm('-rf', './static/upload/*')
        // print()
        ctx.body = 'success'
    }, 1000)
})

router.get('/delete', (req, res) => {
    shell.rm('-rf', './static/upload/*')
    ctx.body = 'success'
})

router.get('/stop', ctx => {
    shell.exec('lprm')
    ctx.body = 'success'
})

router.post('/files', multer({
    dest: './static/upload'
}).any(), ctx => {
    console.log(ctx.request.files)
    ctx.body = '上传成功'
})

router.get('/test', ctx => {
    ctx.body = 'test'
})

export default router
