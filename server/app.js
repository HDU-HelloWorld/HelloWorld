import express from 'express'
import cors from 'cors'
import multer from 'multer'
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
    // res.send("ok")
})

app.get('/printer', (req, res, next) => {
    console.log('printer')
    res.send("ok")
})


app.listen(5174, () => {
    console.log('app running at 5174')
})
