import Koa from 'koa'
import multer from '@koa/multer'
import Router from 'koa-router'
import cors from 'koa2-cors'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import fs from 'fs'
// 打印机路由
import printer from './api/printer/index.js'
//引入数据库

// 获取 __dirname
import { dirname } from 'path'
import { fileURLToPath } from 'url'

//数据库操作封装




const __dirname = dirname(fileURLToPath(import.meta.url))
const homeworkUrl = path.join(__dirname, 'homework')
const baseURL = './static/upload/'

// 创建 koa 实例
const app = new Koa()
// 创建路由实例
const router = new Router()
// 设置上传文件的存储路径

// let userData = {
//   name:'',
//   stnum:null,
//   dep:'',
//   files:'',
//   upload:null,
// }
//设置multer的配置

function getfileName(userData) {
    //日期创建
    let time = new Date()
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var day = time.getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    //创建路径
    let filename = userData.name + '-' + userData.stnum + '-' + userData.dep + '-' + year + month + day
    return filename
}

function getWhenHomework(userData) {
    let whenFile = "第" + userData.when + "次作业"
    return whenFile
}


let storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, homeworkUrl)  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".")
        let fileName = req.body.id + '.' + fileFormat[fileFormat.length - 1]
        // console.log(fileName)
        cb(null, fileName)
    }
})
//加载multer
let upload = multer({ storage: storage })

//根据用户信息创建文件夹
router.post('/create', async ctx => {
    let userData = ctx.request.body
    let filename = getfileName(userData)
    let WhenHomework = getWhenHomework(userData)
    let dataUrl = path.join(homeworkUrl, WhenHomework)
    console.log(WhenHomework)
    if (!fs.existsSync(path.join(__dirname, "homework"))) {
        fs.mkdirSync(path.join(__dirname, "homework"))
    }
    if (!fs.existsSync(path.join(homeworkUrl, WhenHomework))) {
        fs.mkdirSync(path.join(homeworkUrl, WhenHomework))
    }
    if (!fs.existsSync(path.join(dataUrl, filename))) {
        fs.mkdirSync(path.join(dataUrl, filename))
    }
    ctx.response.body = "ok"
    ctx.response.status = 200
})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

// 作业上传
router.post('/files', upload.any(), async ctx => {
    //获得路径
    console.log(ctx.request.body)
    let filename = getfileName(ctx.request.body)
    let WhenHomework = getWhenHomework(ctx.request.body)
    fs.rename(homeworkUrl + '/' + ctx.files[0].filename, path.join(homeworkUrl, WhenHomework) + "/" + filename + "/" + ctx.files[0].filename, function (err) {
        if (err) {
            throw err
        }
    })
    await delay(10000)
    ctx.response.body = ctx.request.body.id
    ctx.response.status = 200
})

// 作业删除
router.post('/delfile', async ctx => {
    let hkData = ctx.request.body
    console.log(hkData)
    let filename = getfileName(hkData)
    let WhenHomework = getWhenHomework(ctx.request.body)
    let file = path.join(homeworkUrl, WhenHomework) + "/" + filename + "/" + hkData.url
    console.log(file)
    fs.unlinkSync(file)

    ctx.response.body = "ok"
    ctx.response.status = 200
})

// 将打印机相关的功能的根路由设置为/printer
router.use('/printer', printer.routes())

app.use(bodyParser())
// 跨域设置
app.use(cors())

app.use(router.routes())

const PORT = 6600

app.listen(PORT, () => {
    console.log(`starting at http://127.0.0.1:${PORT}`)
})