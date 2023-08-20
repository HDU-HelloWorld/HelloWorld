import { PrismaClient } from '@prisma/client'

class bindClient {
    constructor() {
        this.prisma = new PrismaClient()
    }
    async createUser(user) {
        const newUser = await this.prisma.user.create({
            data: {
                user_qq: user.QQnum,
                hdu_account: user.stuNum,
                hdu_password: user.HDUkey,
            },
        })
        return newUser
    }
}

export default bindClient
