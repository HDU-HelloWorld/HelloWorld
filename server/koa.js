import Koa from 'koa'
import multer from '@koa/multer'
import Router from 'koa-router'
import cors from 'koa2-cors'
import shell from 'shelljs'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import fs from 'fs'
import print from './printer.js'
//引入数据库

// 获取 __dirname
import { dirname } from 'path'
import { fileURLToPath } from 'url'

//数据库操作封装




const __dirname = dirname(fileURLToPath(import.meta.url))
const dataUrl = path.join(__dirname, 'homework')

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


let storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, dataUrl)  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        // let filename = getfileName(req.body)
        // console.log(path.join(dataUrl,filename))
        // let files = fs.readdirSync(path.join(dataUrl,filename))
        // let len = files.length
        // console.log(req.body)
        let fileFormat = (file.originalname).split(".")
        let fileName = req.body.id + '.' + fileFormat[fileFormat.length - 1]
        // console.log(fileName)
        cb(null, fileName)
    }
})
//加载multer
let upload = multer({ storage: storage })

// 作业上传
router.post('/files', upload.any(), ctx => {
    //获得路径
    console.log(ctx.request.body)
    let filename = getfileName(ctx.request.body)


    if (!fs.existsSync(path.join(dataUrl, filename))) {
        fs.mkdirSync(path.join(dataUrl, filename))
    }
    fs.rename(dataUrl + '/' + ctx.files[0].filename, path.join(dataUrl, filename) + "/" + ctx.files[0].filename, function (err) {
        if (err) {
            throw err
        }
    })

    ctx.response.body = ctx.request.body.id
    ctx.response.status = 200
})

// 作业删除
router.post('/delfile', async ctx => {
    let hkData = ctx.request.body
    console.log(hkData)
    let filename = getfileName(hkData)
    let file = path.join(dataUrl, filename) + "/" + hkData.url
    console.log(file)
    fs.unlinkSync(file)

    ctx.response.body = "ok"
    ctx.response.status = 200
})


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
            print(baseURL + file)
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
}).any, ctx => {
    console.log(ctx.request.files)
    ctx.body = '上传成功'
})



app.use(bodyParser())
// 跨域设置
app.use(cors())

app.use(router.routes())

app.listen(5174, () => {
    console.log("starting at port 5174")
})