import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/user.entity';



@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}


    //Get All Users
  @Get()
  findAll(@Query('role')role?:Role){
    return this.userService.findAll(role);
  }

  //Get user By id
  @Get(':id')
  findOne(@Param('id',ParseIntPipe)id:number){
    return this.userService.findOne(+id);
  }

  //Create User
  @Post()
  create(@Body(ValidationPipe)CreateUserDto:CreateUserDto){
    return this.userService.create(CreateUserDto);
  }

  //Patch User
  @Patch(':id')
  update(@Param('id',ParseIntPipe)id:number,@Body(ValidationPipe) updateUserDto:UpdateUserDto){
    return this.userService.update(id,updateUserDto);
  }

  //Delete
  @Delete(':id')
   delete(@Param('id',ParseIntPipe) id:number){
    return this.userService.delete(id);
  }

}
