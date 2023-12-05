import Router from 'koa-router'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = new Router()

router.post('/bind', async (ctx) => {
  let user = ctx.request.body
  let findStr = ''
  if (user.user_id_qq) {
    findStr = 'user_id_qq'
  } else {
    findStr = 'user_id_qqguild'
  }
  console.log(findStr)
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
      [findStr]: user[findStr],
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
        [findStr]: user[findStr],
      },
    })
    console.log('update', res)
    ctx.body = 'update'
  }
})

export default router
