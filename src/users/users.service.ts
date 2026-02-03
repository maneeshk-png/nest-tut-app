import { Injectable, NotFoundException,Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    //private json data
    private users = [
        {
          "id": 1,
          "name": "Alice Johnson",
          "email": "alice.johnson@example.com",
          "role": "ADMIN"
        },
        {
          "id": 2,
          "name": "Bob Smith",
          "email": "bob.smith@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 3,
          "name": "Charlie Brown",
          "email": "charlie.brown@example.com",
          "role": "INTERN"
        },
        {
          "id": 4,
          "name": "Diana Prince",
          "email": "diana.prince@example.com",
          "role": "ADMIN"
        },
        {
          "id": 5,
          "name": "Ethan Hunt",
          "email": "ethan.hunt@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 6,
          "name": "Fiona Gallagher",
          "email": "fiona.gallagher@example.com",
          "role": "INTERN"
        },
        {
          "id": 7,
          "name": "George Martin",
          "email": "george.martin@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 8,
          "name": "Hannah Baker",
          "email": "hannah.baker@example.com",
          "role": "INTERN"
        },
        {
          "id": 9,
          "name": "Ian McKellen",
          "email": "ian.mckellen@example.com",
          "role": "ADMIN"
        },
        {
          "id": 10,
          "name": "Julia Roberts",
          "email": "julia.roberts@example.com",
          "role": "ENGINEER"
        }
      ]
      
      
      //FindAll Method 
      findAll(role?:'INTERN' |'ENGINEER' |'ADMIN'){
        this.logger.log(`Fetching all users${role ? ' with role ' + role : ''}`);
        if(role){
            const UsersArray= this.users.filter(user=>user.role===role);
            if(UsersArray.length===0){
                 throw new NotFoundException('User Role Not Found');
            }
            this.logger.debug(`Found ${UsersArray.length} users with role ${role}`);
            return UsersArray;
        }
      return this.users;
     }

     //find One
     findOne(id:number){
        this.logger.log(`fetching user with id ${id}`)
        const user=this.users.find(user=>user.id===id);

        if(!user){ 
            this.logger.warn(`User not Found ${id}`)
          throw new NotFoundException('User not found');
        }
        this.logger.debug(`User found: ${JSON.stringify(user)}`);
        return user;
     }

     //create user
     create(CreateUserDto:CreateUserDto){
        this.logger.log(`creating user with data ${JSON.stringify(CreateUserDto)}`)
        const usersByHgihestId=[...this.users].sort((a,b)=>b.id-a.id);

        const newUser={
            id:usersByHgihestId[0].id+1,
            ...CreateUserDto
        }
        this.users.push(newUser);
        this.logger.debug(`User Created Successfully ${JSON.stringify(newUser)}`)
        return newUser;
     }

     //update
     update(id:number,updateUserDto:UpdateUserDto){
        
        this.users=this.users.map(user=>{
            if(user.id==id){
                return {...user,...updateUserDto};
            }
            return user
        })
        const updatedUser = this.findOne(id);
        this.logger.debug(`User updated successfully: ${JSON.stringify(updatedUser)}`);
        return updatedUser;
     }

     //delete user

     delete(id:number){
        this.logger.log(`Deleting user with id ${id}`);
        const deletedUser= this.findOne(id);
        this.users=this.users.filter(user=>user.id!=id);
        
        this.logger.debug(`User deleted successfully: ${JSON.stringify(deletedUser)}`);
        return deletedUser;
     }

}
