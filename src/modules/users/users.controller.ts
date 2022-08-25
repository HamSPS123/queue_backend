/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResetPasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    
    const user = await this.usersService.create(data);    

    return user;
  }

  @Get()
  async findAll(): Promise<User[]>  {
    const result = await this.usersService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User>  {
    const result = await this.usersService.findOne(+id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User>  {
    const result = await this.usersService.update(+id, data);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult>  {
    const result = await this.usersService.remove(+id);
    return result;
  }

  @Patch('resetPassword/:id')
  async resetPassword(@Param('id') id: string, @Body() data: ResetPasswordDto): Promise<User> {
    const result = await this.usersService.resetPassword(+id, data);
    
    return result;
  }

  @Patch('defaultPassword/:id')
  async defaultPassword(@Param('id') id: string): Promise<User> {
    const result = await this.usersService.defaultPassword(+id);

    return result;
  }

  @Delete('removeSelected/:ids')
  async removeSelected(@Param('ids') ids: any): Promise<DeleteResult> {
    
    const result = await this.usersService.removeSelected(ids);

    return result;
  }
}
