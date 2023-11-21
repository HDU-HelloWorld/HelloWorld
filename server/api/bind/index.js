import Router from 'koa-router'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = new Router()

router.post('/bind', async (ctx) => {
  let user = ctx.request.body
  console.log(user)
  let res = await prisma.new_hdu_user_info.findUnique({
    where: {
      hdu_account: user.hdu_account,
    },
  })
  console.log(res)
  if (res === null) {
    console.log('create')
    let userData = {
      hdu_account: user.hdu_account,
      hdu_pin: user.hdu_pin,
      user_id: user.user_id,
    }
    res = await prisma.new_hdu_user_info.create({
      data: userData,
    })
    console.log('create', res)
    ctx.body = 'create'
  } else {
    console.log('update')
    res = await prisma.new_hdu_user_info.update({
      where: {
        hdu_account: user.hdu_account,
      },
      data: {
        hdu_pin: user.hdu_pin,
        user_id: user.user_id,
      },
    })
    console.log('update', res)
    ctx.body = 'update'
  }
})

export default router
