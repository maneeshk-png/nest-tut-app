import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

    //Get All Users
  @Get()
  findAll(){
    return [];
  }

  //Get user By id
  @Get(':id')
  findOne(@Param('id')id:string){
    return {id};
  }

  //Create User
  @Post()
  create(@Body()user:{}){
    return user;
  }

  //Patch User
  @Patch(':id')
  update(@Param('id')id:string,@Body() userUpdate: {}){
    return {id,...userUpdate};
  }

  //Delete
  @Delete(':id')
   delete(@Param('id') id:string){
    return {id};
  }

  //Based On Query
  @Get()
  GetAllUserByQuery(@Query('role')role?:'INTERN' |'ENGINEER'|'ADMIN'){
    return [];
  }

}
