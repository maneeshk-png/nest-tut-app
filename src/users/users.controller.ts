import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';



@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}


    //Get All Users
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN')
  @Get('all-users')
  findAll(@Query('role')role?:Role){
    return this.userService.findAll(role);
  }

  //Get user By id
  @UseGuards(JwtAuthGuard)
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
