import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserGuard } from './user.guard';
import { Public } from 'src/decorators';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //12.4.1
  @Public()
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //12.4.1
  @Public()
  //10.1.1 ruta post en el controlador para hacer login
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.userService.loginUser(email, password);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //protegemos la ruta con el guardian que verificara que el usuario tenga un JWT
  @UseGuards(UserGuard)
  @Get('/profile/:cedula')
  findOne(@Param('cedula') cedula: string) {
    return this.userService.findOne(+cedula);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
