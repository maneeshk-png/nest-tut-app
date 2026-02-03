import {IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MinLength} from 'class-validator'
import { Role } from '../entities/user.entity';

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsEmail()
    email:string;
    @IsEnum(Role,{
        message:'Valid Role Required'
    })
    role:Role;
    @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}