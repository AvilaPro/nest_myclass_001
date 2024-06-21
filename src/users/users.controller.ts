import {
  Controller,
  Res,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post('/create')
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'Usuario creado correctamente',
      user,
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
