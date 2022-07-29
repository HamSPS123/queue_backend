import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller({
  version: '1',
  path: 'roles',
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }
}
