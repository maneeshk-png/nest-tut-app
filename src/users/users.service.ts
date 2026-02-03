import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  // GET ALL USERS
  async findAll(role?:Role) {
    this.logger.log(`Fetching users ${role ? 'with role ' + role : ''}`);

    if (role) {
      const users = await this.repo.find({ where: { role } });
      if (!users.length) throw new NotFoundException('User Role Not Found');
      return users;
    }

    return this.repo.find();
  }

  // GET ONE USER
  async findOne(id: number) {
    this.logger.log(`Fetching user with id ${id}`);

    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  // CREATE USER
  async create(createUserDto: CreateUserDto) {
    this.logger.log(`Creating user`);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.repo.create({ ...createUserDto, password: hashedPassword });
    return this.repo.save(newUser);
  }

  // UPDATE USER
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repo.update(id, updateUserDto);
    return this.findOne(id);
  }

  // DELETE USER
  async delete(id: number) {
    const user = await this.findOne(id);
    await this.repo.delete(id);
    return user;
  }

  //Find By Email
  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOneBy({ email });
  }
}
