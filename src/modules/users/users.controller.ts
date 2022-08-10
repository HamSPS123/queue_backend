/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResetPasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    
    const user = await this.usersService.create(data);    

    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('resetPassword/:id')
  async resetPassword(@Param('id') id: string, @Body() data: ResetPasswordDto){
    const user = await this.usersService.resetPassword(+id, data);
    
    return user;
  }

  @Patch('defaultPassword/:id')
  async defaultPassword(@Param('id') id: string){
    const user = await this.usersService.defaultPassword(+id);

    return user;
  }

  @Delete('removeSelected/:ids')
  async removeSelected(@Param('ids') ids: any){
    
    const result = await this.usersService.removeSelected(ids);

    return result;
  }
}
