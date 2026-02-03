import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}


    //Get All Users
  @Get()
  findAll(@Query('role')role?:'INTERN' |'ENGINEER'|'ADMIN'){
    return this.userService.findAll(role);
  }

  //Get user By id
  @Get(':id')
  findOne(@Param('id')id:string){
    return this.userService.findOne(+id);
  }

  //Create User
  @Post()
  create(@Body()user:{name:string,email:string,role:'INTERN' |'ENGINEER' | 'ADMIN'}){
    return this.userService.create(user);
  }

  //Patch User
  @Patch(':id')
  update(@Param('id')id:string,@Body() userUpdate: {name?:string,email?:string,role?:'INTERN'|'ENGINEER'|'ADMIN'}){
    return this.userService.update(+id,userUpdate);
  }

  //Delete
  @Delete(':id')
   delete(@Param('id') id:string){
    return {id};
  }

}
