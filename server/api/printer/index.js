import Router from 'koa-router'
import shell from 'shelljs'
import multer from '@koa/multer'
import { usePrinter } from './functions.js'

const router = new Router()
const baseURL = './static/print/'

router.get('/print', (ctx) => {
    ctx.status = 200
    console.log('printing...')
    // 获取./static/print/下的所有文件名
    let files = shell.ls('./static/print')
    // 打印文件名
    files.forEach((file) => {
        usePrinter(baseURL + file)
        console.log(file)
    })
    // 打印成功后删除文件
    shell.rm('-rf', './static/print/*')
    // print()
    ctx.body = 'success'
})

router.get('/delete', (ctx) => {
    shell.rm('-rf', './static/print/*')
    ctx.body = 'success'
})

router.get('/stop', (ctx) => {
    shell.exec('lprm')
    ctx.body = 'success'
})

router.post(
    '/files',
    multer({
        dest: './static/print',
    }).any(),
    (ctx) => {
        console.log(ctx.request.files)
        ctx.body = '上传成功'
    }
)

router.get('/test', (ctx) => {
    ctx.body = 'test'
})

export default router
