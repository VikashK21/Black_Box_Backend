const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

class Users {
    async signup(data) {
        try {
            return await prisma.users.create({
                data
            })
        } catch (err) {
            return err.message;            
        }
    }

    async loginWithEmailPass(email, password) {
        try {
            const result = await prisma.users.findUnique({
                where: {email}
            })
            if (result.password===password) {
                return result
            }
            return "The password is invalid!!"
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Users;

