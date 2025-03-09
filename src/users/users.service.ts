import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(
    createUserDto: CreateUserDto & { imageUrl: string },
  ): Promise<User> {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.toString()}`);
    }
    const newUser = this.usersRepository.create(createUserDto);
    if (createUserDto.roleIds) {
      newUser.roles = await this.rolesRepository.findBy({
        id: In(createUserDto.roleIds),
      });
    }
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id },
      relations: ['roles'],
    });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto & { imageUrl?: string },
  ): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: id },
      relations: ['roles'],
    });
    user.roles = [];
    await this.usersRepository.save(user);

    if (updateUserDto.roleIds) {
      user.roles = await this.rolesRepository.findBy({
        id: In(updateUserDto.roleIds),
      });
    }
    const updateUser = { ...user, ...updateUserDto };
    return await this.usersRepository.save(updateUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.softRemove(user);
  }
}
