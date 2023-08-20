import Router from 'koa-router'
import bindClient from './prisma.js'

const router = new Router()
const client = new bindClient()

router.post('/bind', async (ctx) => {
    let user = ctx.request.body
    try {
        let newUser = await client.createUser(user)
        ctx.status = 200
        ctx.body = newUser
    } catch (err) {
        ctx.status = 500
        ctx.body = err
    }
})

export default router
