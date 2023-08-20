import Koa from 'koa'

import Router from 'koa-router'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
// 引入api路由
import printer from './api/printer/index.js'
import uploader from './api/upLoader/index.js'
import binder from './api/bind/index.js'
//引入数据库

//数据库操作封装

// const __dirname = dirname(fileURLToPath(import.meta.url))
// const homeworkUrl = path.join(__dirname, 'homework')

// 创建 koa 实例
const app = new Koa()
// 创建路由实例
const router = new Router()

router.get('/', async (ctx) => {
    ctx.body = 'Hello World'
    // await next()
})

// 将打印机相关的功能的根路由设置为/printer
router.use('/printer', printer.routes())
// 将上传相关的功能的根路由设置为/upLoader
router.use('/uploader', uploader.routes())
// 将HDU绑定相关的功能的根路由设置为/bind
router.use('/binder', binder.routes())

app.use(bodyParser())
// 跨域设置
app.use(cors())

app.use(router.routes())

const PORT = 6600

app.listen(PORT, () => {
    console.log(`starting at http://127.0.0.1:${PORT}`)
})
