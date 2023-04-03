import express from 'express'
import print from './printer.js'
import cors from 'cors'
import multer from 'multer'
import shell from 'shelljs'
// import indexRouter from './index.js'
let app = express()

// 设置文件上传位置
const upload = multer({
    dest: './static/upload'
})
const baseURL = './static/upload/'

app.use(cors())
// app.use('/', indexRouter)

app.get('/', (req, res, next) => {
    console.log('5174')
    res.send("ok")
})

app.get('/print', (req, res) => {
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
        res.status(200).send('success')
    }, 1000)
})

app.get('/delete', (req, res) => {
    shell.rm('-rf', './static/upload/*')
    res.status(200).send('success')
})

app.get('/stop', (req, res) => {
    shell.exec('lprm')
    res.status(200).send('success')
})

app.post('/files', upload.any(), (req, res) => {
    console.log(req.files)
    res.send('上传成功')
})

app.listen(5174, () => {
    console.log('app running at 5174')
})
