import repository from "../database/prisma.database"
import { User } from "../model/user.model"

class UserService{
    public async list(){
        const data = await repository.user.findMany()
        return data
    }


    public async create(data:any){
        const user = new User(data.name, data.email, data.username, data.password)
        
        const createdUser = await repository.user.create({
            data:{
                name: user.name,
                email: user.email,
                username: user.username,
                password:user.password
            }
        })

        return createdUser
    }
}

export default new UserService