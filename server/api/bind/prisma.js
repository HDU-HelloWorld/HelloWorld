import { PrismaClient } from '@prisma/client'

class bindClient {
  constructor() {
    this.prisma = new PrismaClient()
  }
  async createUser(user) {
    const findUser = await this.prisma.hdu_auto_sign_user.findFirst({
      where: {
        user_qq: Number.parseInt(user.QQnum),
      },
    })
    if (findUser) {
      const newUser = await this.prisma.hdu_auto_sign_user.updateMany({
        where: {
          user_qq: Number.parseInt(user.QQnum),
        },
        data: {
          hdu_account: user.stuNum,
          hdu_password: user.HDUkey,
        },
      })
      return newUser
    } else {
      const newUser = await this.prisma.hdu_auto_sign_user.create({
        data: {
          user_qq: Number.parseInt(user.QQnum),
          hdu_account: user.stuNum,
          hdu_password: user.HDUkey,
        },
      })
      return newUser
    }
  }
}

export default bindClient
