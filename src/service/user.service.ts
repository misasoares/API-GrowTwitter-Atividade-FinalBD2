import repository from "../database/prisma.database"
import { UserUpdateDto } from "../dtos/user.dto"
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

    public async getByUsernameAndPassword(username: string, password: string) {
      
        const user = await repository.user.findUnique({
          where: {
            username: username,
            password: password,
          },
        });
    
        return user;
      }

      public async getUserByToken(token:string){
        const user = await repository.user.findUnique({
          where:{
            token:token
          }
        })

        return user
      }


      public async update(data:UserUpdateDto){
        
        const user = await repository.user.findUnique({
          where: {
            username: data.username,
          },
        });

        if (!user) {
          return {
            code: 404,
            message: "Usuário não encontrado.",
          };
        }

        const updatedUser = await repository.user.update({
          where: {
            username: data.username,
          },
          data: {
            name: data.name,
            email:data.email,
            username:data.username,
            password:data.password,
            token:data.tokenAsString
          },
        });
    
        return {
          code: 200,
          message: "Usuário atualizado com sucesso.",
          data: updatedUser,
        };

      }
}

export default new UserService